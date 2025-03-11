"use strict";

const expect = require("chai").expect;
const ConvertHandler = require("../controllers/convertHandler.js");

const processingData = (req, res, convertHandler) => {
    let input = (req?.query?.input && req.query.input.trim()) || "1L";

    let initNum = convertHandler.getNum(input);
    let initUnit = convertHandler.getUnit(input);

    if (!initNum && !initUnit) {
        res.send("invalid number and unit");
        return;
        // return res.status(400).json({ error: "Invalid number and unit" });
    }
    if (!initNum) {
        res.send("invalid number");
        return;
        // return res.status(400).json({ error: "Invalid number" });
    }
    if (!initUnit) {
        res.send("invalid unit");
        return;
        // return res.status(400).json({ error: "Invalid unit" });
    }

    const initUnitString = convertHandler.spellOutUnit(initUnit);
    const returnUnit = convertHandler.getReturnUnit(initUnit);
    const returnUnitString = convertHandler.spellOutUnit(returnUnit);
    const convert = convertHandler.convert(initNum, initUnit, returnUnit);

    const hasError = [
        initUnitString,
        returnUnit,
        returnUnitString,
        convert,
    ].some(
        (res) =>
            typeof res === "string" &&
            (res.startsWith("[ERROR]") || res.startsWith("[INFO]"))
    );

    if (hasError) {
        return res
            .status(400)
            .json({ error: "Invalid data in conversion process." });
    }

    const resultString = convertHandler.getString(
        initNum,
        initUnitString,
        convert,
        returnUnitString
    );

    if (
        typeof resultString === "string" &&
        resultString.startsWith("[ERROR]")
    ) {
        return res.status(400).json({ error: resultString });
    }

    res.json({
        initNum,
        initUnit,
        returnNum: convert,
        returnUnit,
        string: resultString,
    });
};

module.exports = function (app) {
    let convertHandler = new ConvertHandler();
    app.route("/api/convert").get((req, res) =>
        processingData(req, res, convertHandler)
    );
};
