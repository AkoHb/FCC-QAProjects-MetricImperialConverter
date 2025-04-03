const chai = require("chai");
let assert = chai.assert;
const ConvertHandler = require("../controllers/convertHandler.js");

let convertHandler = new ConvertHandler();

const testsData = {
    "Function convertHandler.getNum(input)": {
        function: (input) => convertHandler.getNum(input),
        testData: [
            {
                testName: "Whole number input",
                input: "32L",
                expectedOutput: 32,
            },
            {
                testName: "Decimal Input",
                input: "32.2L",
                expectedOutput: 32.2,
            },
            {
                testName: "Fractional Input",
                input: "32/3L",
                expectedOutput: 32 / 3,
            },
            {
                testName: "Fractional Input w/ Decimal",
                input: "9/3.3L",
                expectedOutput: 9 / 3.3,
            },
            {
                testName: "Invalid Input (double fraction)",
                input: "32/3/3L",
                expectedOutput: undefined,
            },
            {
                testName: "No Numerical Input",
                input: "L",
                expectedOutput: 1,
            },
        ],
    },
    "Function convertHandler.getUnit(input)": {
        function: (input) => convertHandler.getUnit(input),
        testData: [
            {
                testName: "For Each Valid Unit Inputs",
                input: [
                    "gal",
                    "l",
                    "mi",
                    "km",
                    "lbs",
                    "kg",
                    "GAL",
                    "L",
                    "MI",
                    "KM",
                    "LBS",
                    "KG",
                ],
                expectedOutput: [
                    "gal",
                    "L",
                    "mi",
                    "km",
                    "lbs",
                    "kg",
                    "gal",
                    "L",
                    "mi",
                    "km",
                    "lbs",
                    "kg",
                ],
            },
            {
                testName: "Unknown Unit Input",
                input: "34kilograms",
                expectedOutput: undefined,
            },
        ],
    },
    "Function convertHandler.getReturnUnit(initUnit)": {
        function: (initUnit) => convertHandler.getReturnUnit(initUnit),
        testData: [
            {
                testName: "For Each Valid Unit Inputs",
                input: ["gal", "l", "mi", "km", "lbs", "kg"],
                expectedOutput: ["L", "gal", "km", "mi", "kg", "lbs"],
            },
        ],
    },
    "Function convertHandler.spellOutUnit(unit)": {
        function: (unit) => convertHandler.spellOutUnit(unit),
        testData: [
            {
                testName: "For Each Valid Unit Inputs",
                input: ["gal", "l", "mi", "km", "lbs", "kg"],
                expectedOutput: [
                    "gallons",
                    "liters",
                    "miles",
                    "kilometers",
                    "pounds",
                    "kilograms",
                ],
            },
        ],
    },
    "Function convertHandler.convert(num, unit)": {
        function: (num, unit) => convertHandler.convert(num, unit),
        testData: [
            {
                testName: "Gal to L",
                input: [5, "gal"],
                expectedOutput: 18.9271,
                tolerance: 0.1,
            },
            {
                testName: "L to Gal",
                input: [5, "l"],
                expectedOutput: 1.32086,
                tolerance: 0.1,
            },
            {
                testName: "Mi to Km",
                input: [5, "mi"],
                expectedOutput: 8.0467,
                tolerance: 0.1,
            },
            {
                testName: "Km to Mi",
                input: [5, "km"],
                expectedOutput: 3.10686,
                tolerance: 0.1,
            },
            {
                testName: "Lbs to Kg",
                input: [5, "lbs"],
                expectedOutput: 2.26796,
                tolerance: 0.1,
            },
            {
                testName: "Kg to Lbs",
                input: [5, "kg"],
                expectedOutput: 11.02312,
                tolerance: 0.1,
            },
        ],
    },
};

suite("Unit Tests", function () {
    for (const [testTitle, testConfig] of Object.entries(testsData)) {
      suite(testTitle, function () {
            testConfig.testData.forEach((obj, idx) => {
                const { testName, input, expectedOutput, tolerance } = obj;
                test(testName, function (done) {
                    if (Array.isArray(input)) {
                        // Handle multiple inputs (e.g., for convert function)
                        if (tolerance !== undefined) {
                            // Use assert.approximately for tolerance-based comparisons
                            assert.approximately(
                                testConfig.function(...input),
                                expectedOutput,
                                tolerance
                            );
                        } else {
                            // Use assert.equal for exact comparisons
                            assert.equal(
                                testConfig.function(...input),
                                expectedOutput[idx]
                            );
                        }
                    } else if (Array.isArray(expectedOutput)) {
                        // Handle array inputs (e.g., for getUnit, getReturnUnit, spellOutUnit)
                        input.forEach((inp, ind) => {
                            assert.equal(
                                testConfig.function(inp),
                                expectedOutput[ind]
                            );
                        });
                    } else {
                        // Handle single input/output
                        assert.equal(
                            testConfig.function(input),
                            expectedOutput
                        );
                    }
                    done();
                });
            });
        });
    }
});

/*
 *
 *
 *       FILL IN EACH UNIT TEST BELOW COMPLETELY
 *       -----[Keep the tests in the same order!]----
 *       (if additional are added, keep them at the very end!)
 */

// const chai = require("chai");
// let assert = chai.assert;
// const ConvertHandler = require("../controllers/convertHandler.js");

// let convertHandler = new ConvertHandler();

// suite("Unit Tests", function () {
//   suite("Function convertHandler.getNum(input)", function () {
//     test("Whole number input", function (done) {
//       let input = "32L";
//       assert.equal(convertHandler.getNum(input), 32);
//       done();
//     });

//     test("Decimal Input", function (done) {
//       let input = "32.2L";
//       assert.equal(convertHandler.getNum(input), 32.2);
//       done();
//     });

//     test("Fractional Input", function (done) {
//       let input = "32/3L";
//       assert.equal(convertHandler.getNum(input), 32 / 3);
//       done();
//     });

//     test("Fractional Input w/ Decimal", function (done) {
//       let input = "9/3.3L";
//       assert.equal(convertHandler.getNum(input), 9 / 3.3);
//       done();
//       //done();
//     });

//     test("Invalid Input (double fraction)", function (done) {
//       let input = "32/3/3L";
//       assert.equal(convertHandler.getNum(input), undefined);
//       done();
//     });

//     test("No Numerical Input", function (done) {
//       let input = "L";
//       assert.equal(convertHandler.getNum(input), 1);
//       done();
//     });
//   });

//   suite("Function convertHandler.getUnit(input)", function () {
//     test("For Each Valid Unit Inputs", function (done) {
//       let input = [
//         "gal",
//         "l",
//         "mi",
//         "km",
//         "lbs",
//         "kg",
//         "GAL",
//         "L",
//         "MI",
//         "KM",
//         "LBS",
//         "KG",
//       ];
//       let output = [
//         "gal",
//         "L",
//         "mi",
//         "km",
//         "lbs",
//         "kg",
//         "gal",
//         "L",
//         "mi",
//         "km",
//         "lbs",
//         "kg",
//       ];
//       input.forEach(function (ele, index) {
//         assert.equal(convertHandler.getUnit(ele), output[index]);
//       });
//       done();
//     });

//     test("Unknown Unit Input", function (done) {
//       assert.equal(convertHandler.getUnit("34kilograms"), undefined);
//       done();
//     });
//   });

//   suite("Function convertHandler.getReturnUnit(initUnit)", function () {
//     test("For Each Valid Unit Inputs", function (done) {
//       let input = ["gal", "l", "mi", "km", "lbs", "kg"];
//       let expect = ["L", "gal", "km", "mi", "kg", "lbs"];
//       input.forEach(function (ele, i) {
//         assert.equal(convertHandler.getReturnUnit(ele), expect[i]);
//       });
//       done();
//     });
//   });

//   suite("Function convertHandler.spellOutUnit(unit)", function () {
//     test("For Each Valid Unit Inputs", function (done) {
//       //see above example for hint
//       let input = ["gal", "l", "mi", "km", "lbs", "kg"];
//       let expect = [
//         "gallons",
//         "liters",
//         "miles",
//         "kilometers",
//         "pounds",
//         "kilograms",
//       ];
//       input.forEach(function (ele, i) {
//         assert.equal(convertHandler.spellOutUnit(ele), expect[i]);
//       });
//       done();
//     });
//   });

//   suite("Function convertHandler.convert(num, unit)", function () {
//     test("Gal to L", function (done) {
//       let input = [5, "gal"];
//       let expected = 18.9271;
//       assert.approximately(
//         convertHandler.convert(input[0], input[1]),
//         expected,
//         0.1
//       ); //0.1 tolerance
//       done();
//     });

//     test("L to Gal", function (done) {
//       let input = [5, "l"];
//       let expected = 1.32086;
//       assert.approximately(
//         convertHandler.convert(input[0], input[1]),
//         expected,
//         0.1
//       ); //0.1 tolerance
//       done();
//     });

//     test("Mi to Km", function (done) {
//       let input = [5, "mi"];
//       let expected = 8.0467;
//       assert.approximately(
//         convertHandler.convert(input[0], input[1]),
//         expected,
//         0.1
//       ); //0.1 tolerance
//       done();
//     });

//     test("Km to Mi", function (done) {
//       let input = [5, "km"];
//       let expected = 3.10686;
//       assert.approximately(
//         convertHandler.convert(input[0], input[1]),
//         expected,
//         0.1
//       ); //0.1 tolerance
//       done();
//     });

//     test("Lbs to Kg", function (done) {
//       let input = [5, "lbs"];
//       let expected = 2.26796;
//       assert.approximately(
//         convertHandler.convert(input[0], input[1]),
//         expected,
//         0.1
//       ); //0.1 tolerance
//       done();
//     });

//     test("Kg to Lbs", function (done) {
//       let input = [5, "kg"];
//       let expected = 11.02312;
//       assert.approximately(
//         convertHandler.convert(input[0], input[1]),
//         expected,
//         0.1
//       ); //0.1 tolerance
//       done();
//     });
//   });
// });