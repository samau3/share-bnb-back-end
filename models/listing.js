"use strict";

class Listing {
    /** Create a company (from data), update db, return new company data.
     *
     * data should be { handle, name, description, numEmployees, logoUrl }
     *
     * Returns { handle, name, description, numEmployees, logoUrl }
     *
     * Throws BadRequestError if company already in database.
     * */

    static async create({ photo }) {
        //   const duplicateCheck = await db.query(
        //       `SELECT handle
        //          FROM companies
        //          WHERE handle = $1`,
        //       [handle]);

        //   if (duplicateCheck.rows[0])
        //     throw new BadRequestError(`Duplicate company: ${handle}`);

        //   const result = await db.query(
        //       `INSERT INTO companies
        //        (handle, name, description, num_employees, logo_url)
        //          VALUES
        //            ($1, $2, $3, $4, $5)
        //          RETURNING handle, name, description, num_employees AS "numEmployees", logo_url AS "logoUrl"`,
        //       [
        //         handle,
        //         name,
        //         description,
        //         numEmployees,
        //         logoUrl,
        //       ],
        //   );
        //   const company = result.rows[0];


        //   return company;
    }
}


module.exports = Listing;
