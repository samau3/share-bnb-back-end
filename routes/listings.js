"use strict";
const express = require("express");
const jsonschema = require("jsonschema");
const multer = require('multer');
const { generateUploadUrl } = require("../s3");
const { BadRequestError } = require("../expressError");
const Listing = require("../models/listing");

const listingNewSchema = require("../schemas/listingNew.json");
const listingUpdateSchema = require("../schemas/listingUpdate.json");
const listingSearchSchema = require("../schemas/listingSearch.json");

const router = new express.Router();

const upload = multer();

/** POST /  =>
 *   { listing: { id, name, street, city, state, country, description, photoUrl }
 *
 * Authorization required: none
 */
// should .any be .fields or .array
router.post("/", upload.any('file', 3), async function (req, res, next) {
  req.body.price = +req.body.price;

  console.log("req.files", req.files);
  console.log("req.body", req.body);

  const validator = jsonschema.validate(req.body, listingNewSchema);
  if (!validator.valid) {
    const errs = validator.errors.map(e => e.stack);
    throw new BadRequestError(errs);
  }

  // console.log("listings post route upload fn", req.file);
  // console.log('listings post req file file', req.file)
  const urls = await Promise.all(req.files.map(async (file) => {
    return await generateUploadUrl(file);
  }));
  console.log({ urls });
  // const result = await generateUploadUrl(req.file);
  // console.log("listings post route", result);
  // console.log('listings post route req data', req)
  req.body.photoUrls = urls;
  const listing = await Listing.create(req.body);
  return res.status(201).json({ listing });

});

/** GET /  =>
 *   { listings: [ { id, name, street, city, state, country, description, photoUrl, price }, ...] }
 *
 * Can filter on provided search filters (will find case-insensitive, partial matches):
 * - name
 * - street
 * - city
 * - state
 *
 * Authorization required: none
 */

router.get("/", async function (req, res, next) {
  const q = req.query;

  const validator = jsonschema.validate(q, listingSearchSchema);
  if (!validator.valid) {
    const errs = validator.errors.map(e => e.stack);
    throw new BadRequestError(errs);
  }

  const listings = await Listing.findAll(q);
  console.log({ listings });
  return res.json({ listings });
});

/** GET /[id]  =>  { listing }
 *
 *  Listing is { id, name, street, city, state, country, description, photoUrl }
  *
 * Authorization required: none
 */

router.get("/:id", async function (req, res, next) {
  const listing = await Listing.get(req.params.id);
  return res.json({ listing });
});

/** PATCH /[id] { fld1, fld2, ... } => { listing }
 *
 * Patches listing data.
 *
 * fields can be: { name, street, city, state, country, description, photoUrl }
 *
 * Returns { id, name, street, city, state, country, description, photoUrl }
 *
 * Authorization required: 
 */

router.patch("/:id", async function (req, res, next) {
  // const validator = jsonschema.validate(req.body, listingUpdateSchema);
  // if (!validator.valid) {
  //   const errs = validator.errors.map(e => e.stack);
  //   throw new BadRequestError(errs);
  // }

  const listing = await Listing.update(req.params.id, req.body);
  return res.json({ listing });
});

/** DELETE /[id]  =>  { deleted: id }
 *
 * Authorization: 
 */

router.delete("/:id", async function (req, res, next) {
  await Listing.remove(req.params.id);
  return res.json({ deleted: req.params.id });
});


module.exports = router;
