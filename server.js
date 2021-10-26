"use strict";

const app = require("./app");
const { PORT } = require("./config");
// const express = require("express");

app.listen(PORT, function () {
  console.log(`Started on http://localhost:${PORT}`);
});