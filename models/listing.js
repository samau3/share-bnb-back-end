"use strict";
const db = require("../db");

const { NotFoundError } = require("../expressError");
const sqlForPartialUpdate = require("../helpers/sql");

class Listing {
    /** Create a listing (from data), update db, return new listing data.
     *
     * Data:
     *  { name, street, city, state, country, description, photoUrl }
     *
     * Returns:
     *  { id, name, street, city, state, country, description, photoUrl }
     *
     * */

    static async create(newListingData) {
        const { name,
            street,
            city,
            state,
            country,
            description,
            photoUrls,
            price } = newListingData;

        const listingResult = await db.query(
            `INSERT INTO listings
               (name, street, city, state, country, description, price)
                 VALUES
                   ($1, $2, $3, $4, $5, $6, $7)
                 RETURNING id, name, street, city, state, country, description, price`,
            [
                name,
                street,
                city,
                state,
                country,
                description,
                price
            ],
        );
        const listing = listingResult.rows[0];
        listing.photoUrls = [];
        photoUrls.forEach(async (photo) => {
            console.log("in photoUrl for each loop", { photo });
            const photoUrlsResult = await db.query(
                `INSERT INTO listing_photos
                    (photourl, listingsid)
                    VALUES
                    ($1, $2)
                    RETURNING id, photourl AS "photoUrl", listingsid AS "listingsId"
                `, [photo, listing.id])
            listing.photoUrls.push(photoUrlsResult);
        });

        return listing;

    }

    /** Create WHERE clause for filters, to be used by functions that query
    * with filters.
    *
    * searchFilters (all optional and will find case-insensitive, partial matches):
    * - name
    * - city
    * - state
    * - country
    *
    * Returns {
    *  where: "WHERE name ILIKE $1 AND city ILIKE $2",
    *  vals: ['%Apple%', '%Oakland%']
    * }
    */

    static _filterWhereBuilder({ name, city, state, country }) {
        let whereParts = [];
        let vals = [];

        if (name) {
            vals.push(`%${name}%`);
            whereParts.push(`name ILIKE $${vals.length}`);
        }

        if (city) {
            vals.push(`%${city}%`);
            whereParts.push(`city ILIKE $${vals.length}`);
        }

        if (state) {
            vals.push(`%${state}%`);
            whereParts.push(`state ILIKE $${vals.length}`);
        }

        if (country) {
            vals.push(`%${country}%`);
            whereParts.push(`country ILIKE $${vals.length}`);
        }

        const where = (whereParts.length > 0) ?
            "WHERE " + whereParts.join(" AND ")
            : "";

        return { where, vals };
    }

    /** Find all listings (optional filter on searchFilters).
    *
    * searchFilters (all optional and will find case-insensitive, partial matches):
    * - name
    * - city
    * - state
    * - country
    *
    * Returns [{ id, name, street, city, state, country, description, photoUrls, price }, ...]
    *   where photoUrls is: [URL, URL, URL]
    * */
    // TODO: Can add price as a search filter
    static async findAll(searchFilters = {}) {
        const { name, city, state, country } = searchFilters;

        const { where, vals } = this._filterWhereBuilder({
            name, city, state, country
        });

        const listingsRes = await db.query(`
        SELECT l.id as "id",
             name,
             street,
             city,
             state,
             country,
             description,
             price,
             json_agg(lp.photourl) AS "photoUrls"
        FROM listings AS l
            JOIN listing_photos AS lp
                ON l.id = lp.listingsId
        ${where}
        GROUP BY l.id
        ORDER BY name
    `, vals);
        console.log({ listingsRes });
        return listingsRes.rows;
    }

    /** Given a listing id, return data about listing.
     *
     * Returns { id, name, street, city, state, country, description, photoUrls, price }
     *   where photoUrls is: [URL, URL, URL]
     *
     * Throws NotFoundError if not found.
     **/

    static async get(id) {
        const listingRes = await db.query(
            `SELECT l.id as "id",
                name,
                street,
                city,
                state,
                country,
                description,
                price,
                json_agg(lp.photourl) AS "photoUrls"
           FROM listings AS l
           JOIN listing_photos AS lp
            ON l.id = lp.listingsId
           WHERE l.id = $1
           GROUP BY l.id`,
            [id]);

        const listing = listingRes.rows[0];

        if (!listing) throw new NotFoundError(`No listing: ${id}`);
        console.log({ listing });
        return listing;
    }

    /** Update listing data with `data`.
     *
     * This is a "partial update" --- it's fine if data doesn't contain all the
     * fields; this only changes provided ones.
     *
     * Data can include: {name, street, city, state, country, description}
     *
     * Returns {id, name, street, city, state, country, description}
     *
     * Throws NotFoundError if not found.
     */

    static async update(id, data) {
        const { setCols, values } = sqlForPartialUpdate(data);
        const idVarIdx = "$" + (values.length + 1);

        const querySql = `UPDATE users
                        SET ${setCols}
                        WHERE id = ${idVarIdx}
                        RETURNING 
                            id,
                            name,
                            street,
                            city,
                            state,
                            country,
                            description,
                            price`;
        const result = await db.query(querySql, [...values, id]);
        const listing = result.rows[0];

        if (!listing) throw new NotFoundError(`No listing: ${id}`);

        return listing;
    }

    /** Delete given listing from database; returns undefined.
     *
     * Throws NotFoundError if listing not found.
     **/

    static async remove(id) {
        const result = await db.query(
            `DELETE
                FROM listings
                WHERE id = $1
                RETURNING id`,
            [id]);
        const listing = result.rows[0];

        if (!listing) throw new NotFoundError(`No listing: ${id}`);
    }
}


module.exports = Listing;
