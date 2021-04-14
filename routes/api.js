"use strict";

const expect = require("chai").expect;
const ConvertHandler = require("../controllers/convertHandler.js");

module.exports = function (app) {
  let convertHandler = new ConvertHandler();

  app.route("/api/convert").get(function (req, res) {
    let input = req.query.input;
    let initNum = convertHandler.getNum(input);
    let initUnit = convertHandler.getUnit(input);
    let returnNum = convertHandler.convert(initNum, initUnit);
    let returnUnit = convertHandler.getReturnUnit(initUnit);

    if (
      (initNum === "invalid" && initUnit === "invalid") ||
      (initNum === "invalid" && initUnit === "error")
    ) {
      return res.json("invalid number and unit");
    } else if (
      (initNum === "invalid" && initUnit != "invalid") ||
      (initNum === "invalid" && initUnit != "error")
    ) {
      return res.json("invalid number");
    } else if (
      (initNum != "invalid" && initUnit === "invalid") ||
      (initNum != "invalid" && initUnit === "error")
    ) {
      return res.json("invalid unit");
    } else {
      let toString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
      let responseObject = {};
      responseObject["initNum"] = initNum;
      responseObject["initUnit"] = initUnit;
      responseObject["returnNum"] = returnNum;
      responseObject["returnUnit"] = returnUnit;
      responseObject["string"] = toString;
      return res.json(responseObject);
    }
  });
};
