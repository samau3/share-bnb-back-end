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

router.post("/", upload.single('file'), async function (req, res, next) {
    // const validator = jsonschema.validate(req.body, listingNewSchema);
    // if (!validator.valid) {
    //     const errs = validator.errors.map(e => e.stack);
    //     throw new BadRequestError(errs);
    // }

    // console.log("listings post route upload fn", req.file);

    const result = await generateUploadUrl(req.file);
    console.log("listings post route", result);
    console.log('listings post route req data', req)
    req.body.photoUrl = result;
    const listing = await Listing.create(req.body);
    return res.status(201).json({ listing });
});

module.exports = router;
