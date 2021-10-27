"use strict";
const db = require("../db");

const { NotFoundError } = require("../expressError");
const sqlForPartialUpdate = require("../helpers/sql");

class Listing {
    /** Create a company (from data), update db, return new company data.
     *
     * data should be { handle, name, description, numEmployees, logoUrl }
     *
     * Returns { handle, name, description, numEmployees, logoUrl }
     *
     * Throws BadRequestError if company already in database.
     * */

    static async create(newListingData) {
        //   const duplicateCheck = await db.query(
        //       `SELECT handle
        //          FROM companies
        //          WHERE handle = $1`,
        //       [handle]);

        //   if (duplicateCheck.rows[0])
        //     throw new BadRequestError(`Duplicate company: ${handle}`);
        const { name,
            street,
            city,
            state,
            country,
            description,
            photoUrl } = newListingData;
        console.log("listing model create", { newListingData }, JSON.stringify(newListingData.formDataState))
        const result = await db.query(
            `INSERT INTO listings
               (name, street, city, state, country, description, photoUrl)
                 VALUES
                   ($1, $2, $3, $4, $5, $6, $7)
                 RETURNING id, name, street, city, state, country, description, photoUrl`,
            [
                name,
                street,
                city,
                state,
                country,
                description,
                photoUrl
            ],
        );
        const listing = result.rows[0];
        return listing;
    }

    /** Create WHERE clause for filters, to be used by functions that query
   * with filters.
   *
   * searchFilters (all optional):
   * - minEmployees
   * - maxEmployees
   * - name (will find case-insensitive, partial matches)
   *
   * Returns {
   *  where: "WHERE num_employees >= $1 AND name ILIKE $2",
   *  vals: [100, '%Apple%']
   * }
   */

    static _filterWhereBuilder({ name, street, city, state }) {
        let whereParts = [];
        let vals = [];

        if (name) {
            vals.push(name);
            whereParts.push(`name ILIKE $${vals.length}`);
        }

        if (street) {
            vals.push(street);
            whereParts.push(`street ILIKE $${vals.length}`);
        }

        if (city) {
            vals.push(city);
            whereParts.push(`city ILIKE $${vals.length}`);
        }

        if (state) {
            vals.push(state);
            whereParts.push(`state ILIKE $${vals.length}`);
        }

        const where = (whereParts.length > 0) ?
            "WHERE " + whereParts.join(" AND ")
            : "";

        return { where, vals };
    }
    /** Find all companies (optional filter on searchFilters).
       *
       * searchFilters (all optional):
       * - minEmployees
       * - maxEmployees
       * - name (will find case-insensitive, partial matches)
       *
       * Returns [{ handle, name, description, numEmployees, logoUrl }, ...]
       * */

    static async findAll(searchFilters = {}) {
        const { name, street, city, state } = searchFilters;

        const { where, vals } = this._filterWhereBuilder({
            name, street, city, state,
        });

        const listingsRes = await db.query(`
      SELECT id,
             name,
             street,
             city,
             state,
             country,
             description,
             photoUrl
        FROM listings ${where}
        ORDER BY name
    `, vals);
        return listingRes.rows;
    }

    /** Given a company handle, return data about company.
     *
     * Returns { handle, name, description, numEmployees, logoUrl, jobs }
     *   where jobs is [{ id, title, salary, equity }, ...]
     *
     * Throws NotFoundError if not found.
     **/

    static async get(id) {
        const listingRes = await db.query(
            `SELECT id,
                name,
                street,
                city,
                state,
                country,
                description,
                photoUrl
           FROM listings
           WHERE id = $1`,
            [id]);

        const listing = listingRes.rows[0];

        if (!listing) throw new NotFoundError(`No listing: ${id}`);

        return listing;
    }

    /** Update company data with `data`.
     *
     * This is a "partial update" --- it's fine if data doesn't contain all the
     * fields; this only changes provided ones.
     *
     * Data can include: {name, description, numEmployees, logoUrl}
     *
     * Returns {handle, name, description, numEmployees, logoUrl}
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
                            photoUrl`;
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
