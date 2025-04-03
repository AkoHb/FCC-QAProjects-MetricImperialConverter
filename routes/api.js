"use strict";

const expect = require("chai").expect;
const ConvertHandler = require("../controllers/convertHandler.js");

const processingData = (req, res, convertHandler) => {
    let input = req.query?.input?.trim() || "1L";

    let initNum = convertHandler?.getNum(input);
    let initUnit = convertHandler?.getUnit(input);

    if ((!initNum || Number.isNaN(initNum)) && !initUnit) {
        res.send("invalid number and unit");
        return;
    }
    if (!initNum || Number.isNaN(initNum)) {
        res.send("invalid number");
        return;
    }
    if (!initUnit) {
        res.send("invalid unit");
        return;
    }

    const returnUnit = convertHandler.getReturnUnit(initUnit);
    const convert = convertHandler.convert(initNum, initUnit);

    const flag = [initNum, initUnit, convert, returnUnit].some((res) =>
        [undefined, null, ""].includes(res)
    );

    if (flag) {
        return res
            .status(400)
            .json({ error: "Invalid data in conversion process." });
    }

    const resultString = convertHandler.getString(
        initNum,
        initUnit,
        convert,
        returnUnit
    );

    if ([undefined, null, ""].includes(resultString)) {
        return res.status(400).json({ error: resultString });
    }

    const result = {
        initNum: +initNum,
        initUnit,
        returnNum: +convert,
        returnUnit,
        string: resultString,
    };

    res.status(200).send(result);
};

module.exports = function (app) {
    let convertHandler = new ConvertHandler();
    app.route("/api/convert").get((req, res) =>
        processingData(req, res, convertHandler)
    );
};
