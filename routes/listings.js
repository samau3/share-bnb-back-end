"use strict";
const express = require("express");
const jsonschema = require("jsonschema");
const multer = require('multer');
const { generateUploadUrl } = require("../s3");

const router = new express.Router();

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'public')
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + '-' + file.originalname)
//     }
// })

// const upload = multer({ storage: storage }).single('file')
const upload = multer();

router.post("/", upload.single('file'), async function (req, res, next) {
    // const validator = jsonschema.validate(req.body, companyNewSchema);
    // if (!validator.valid) {
    //   const errs = validator.errors.map(e => e.stack);
    //   throw new BadRequestError(errs);
    // }
    // upload(req, res, (err) => {
    //     if (err) {
    //         res.sendStatus(500);
    //     }
    //     res.send(req.file);
    // });

    console.log("listings post route upload fn", req.file);

    const result = await generateUploadUrl(req.file);
    console.log("listings post route", result);
    // const listing = await Listing.create(req.body);
    // return res.status(201).json({ upload });
});

module.exports = router;
