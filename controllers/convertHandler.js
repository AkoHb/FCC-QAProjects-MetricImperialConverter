const { worldWideRatio, unitNames, units } = require("./units.js");

// That flag used to pass FCC tests correctly and not rewrite module structure
// the value = true said the FCC tests are going right now
// the value = false said that all writed functional worked fully without stop flags
const fccTests = true;

/**
 * The function used to correct displaying error by sungle style
 * @param { string } msg - string issu value to show that into console
 * @param { string } fnName - string function name to locate the issue
 * @returns { console } - console debug message with current issue info
 */
const showErrorMsg = (msg, fnName = "") =>
    console.debug(
        `⚠️ [ERROR]: ${msg}. ${fnName !== "" && `---Function '${fnName}'.---`}`
    );

const showInfoMsg = (msg = "") =>
    console.debug(`%cℹ️ [INFO]: ${msg}.`, "color: blue;");

// Before processing informed the user about test state.
showInfoMsg(`The User selected the test state for FCC: '${fccTests}'`);

/**
 * The function getNumberValue used to processing value with mathematical operations and valid count of elements
 * @param { string } str - the request value from input field
 *
 * The function used to:
 * - validate the string value
 * - split string by "/"
 * - for the FCC test max length of array is 2
 * - for other values it's Infinity
 * @return { Error | Number } - return error or numeric value. The error dislpayed in debug consoles
 */
const getNumberValue = (str = "") => {
    // Trim the input and handle empty/null/undefined cases
    str = str?.trim() || "";

    if (!str) {
        showErrorMsg(
            "The string value is invalid. (empty | null | undefined)",
            "getNumberValue"
        );
        return undefined;
    }

    // Split the string by "/" and parse each part into a number
    const numbers = str.split("/").map((el) => {
        const num = parseFloat(el.trim());
        return isNaN(num) ? null : num; // Replace invalid numbers with null
    });

    // Filter out null values (invalid numbers)
    const validNumbers = numbers.filter((x) => x !== null);

    if (fccTests && validNumbers.length > 2) {
        showInfoMsg(
            "The converter stop processing because numbers array longer that 2 nums"
        );
        return undefined;
    }

    // If no valid numbers, return null
    if (validNumbers.length === 0) {
        showErrorMsg(
            "The string not contain valid numeric values",
            "getNumberValue"
        );
        return undefined;
    }

    // Perform sequential division
    return validNumbers.reduce((total, current, index) => {
        if (index === 0) return current; // First number is the starting point
        if (current === 0) {
            showErrorMsg(
                `The ${
                    fccTests ? "second" : index
                } element is equal to zero and devide by zero isn't valid mathemathical operation`
            );
            return NaN;
        } // Handle division by zero
        return total / current;
    }, 0);
};

/**
 * Updates the minimum and maximum lengths of unit symbols in `unitNames`
 * and creates a Set with unique unit symbols in lowercase.
 *
 * @throws { Error } If there is no valid data in `unitNames`.
 * @returns { Set } Set with unique unit symbols.
 */
const updateValidUnitLength = () => {
    let minLength = Infinity;
    let maxLength = -Infinity;
    const validSymbols = [];

    Object.values(unitNames).forEach((obj) => {
        if (obj?.symbol) {
            const symbol = obj.symbol;
            const symbolLength = symbol.length;

            minLength = Math.min(minLength, symbolLength);
            maxLength = Math.max(maxLength, symbolLength);

            validSymbols.push(symbol.toLowerCase());
        }
    });

    if (validSymbols.length === 0) {
        showErrorMsg(
            "The units data hasn't valid data",
            "updateValidUnitLength"
        );
        return undefined;
    }

    unitNames.validLength.min = minLength === Infinity ? 1 : minLength;
    unitNames.validLength.max = maxLength === -Infinity ? 5 : maxLength;

    return new Set(validSymbols);
};

/**
 * Clears the input string by removing all invalid characters.
 * Allowed characters: letters (A-Z, a-z), digits (0-9), dot (.), and slash (/).
 */
const clearInput = (input = "") =>
    input == null ? "" : input.replaceAll(/[^A-Za-z0-9./]/g, "");

/**
 * Set containing all valid unit symbols in lowercase.
 * Used for quick validation of user-input units.
 */
const validUnits = updateValidUnitLength();

/**
 * The function used to check the initial string to validate
 * @param { String } input - User input into request
 * @returns { Object } - contain current information about validation results
 */
const isValidInput = (input = "") => {
    if (input == null)
        return {
            statusCode: 400, // Bad Request
            error: showErrorMsg(
                "Invalid number and invalid unit",
                "isValidInput"
            ),
            success: null,
        };

    let clearedInput = clearInput(input);
    if (clearedInput.length >= 1) {
        return {
            statusCode: 200, // Success initial validation
            error: null,
            success: clearedInput,
        };
    } else {
        return {
            statusCode: 400, // Bad Request
            error: showErrorMsg(
                "User input value hasn't valid chars. (Valid chars are: A-Z, a-z, 0-9, dot(.) and slash(/)",
                "isValidInput"
            ),
            success: null,
        };
    }
};

/**
 *
 * @param { string } input
 * @returns
 */
const getValidUnit = (input = "") => {
    console.log(`Input before trim: ${input}`);
    input = input?.trim();
    console.log(`Input after trim: ${input}`);

    if (!input) {
        showErrorMsg("The initial string is invalid", "getValidUnit");
        return undefined;
    }

    let clearedInput = input.toLowerCase();

    if (
        unitNames.validLength.min <= clearedInput.length &&
        clearedInput.length <= unitNames.validLength.max
    ) {
        const unitObj = Object.values(unitNames).find(
            (obj) => obj?.symbol?.toLowerCase() === clearedInput
        );

        if (!unitObj) {
            showErrorMsg(
                `The valid unit chars hasn't contain the current unit char: ${clearedInput}`,
                "getValidUnit"
            );
            return undefined;
        }

        return unitObj.symbol;
    } else {
        showErrorMsg(
            `The input length is invalid: ${clearedInput}`,
            "getValidUnit"
        );
        return undefined;
    }
};

// used to round num to 5 digits after dot
const roundToFive = (num) =>
    Number.isNaN(num) ? 0 : Math.round(num * 10 ** 5) / 10 ** 5;

function ConvertHandler() {
    /**
     *
     * @param { String } input - user input request
     * @returns - error or the calculated value
     */
    this.getNum = function (input) {
        let inputValidation = isValidInput(input);
        let clearedInput = null;

        if (!inputValidation.error) {
            clearedInput = inputValidation.success.match(
                /^([\d./]+)?([a-zA-Z]+)$/
            );
        }

        if (!clearedInput) {
            showErrorMsg(
                "Variable 'clearedInput' is ( null | indefines )",
                "this.getNum"
            );
            return undefined;
        }

        // Extract the numeric
        let [_, num, unit] = clearedInput;
        if (!num) {
            showInfoMsg("The initial numeric value set by default one. ( 1 )");
            num = "1";
        }
        try {
            return getNumberValue(num);
        } catch {
            showErrorMsg("Invalid number", "this.getNum");
            return undefined;
        }
    };

    this.getUnit = function (input) {
        let inputValidation = isValidInput(input);
        let clearedInput = null;

        if (inputValidation.success !== null) {
            // console.log(
            //     `User input cleared text is: ${inputValidation.success}`
            // );
            clearedInput = inputValidation.success.match(
                /^([\d./]+)?([a-zA-Z]+)$/
            );
        } else {
            showErrorMsg(
                "Variable 'clearedInput' is ( null | indefines )",
                "this.getUnit"
            );
            return undefined;
        }

        // Extract the unit char
        let [_, num, unit, ...other] = clearedInput;
        // console.log(`Cleared input unit is: `, unit);

        let res = getValidUnit(unit);

        if (res === "") {
            showErrorMsg(
                "The valid unit chars hasn't contain the current unit char",
                "this.getUnit"
            );
            return undefined;
        }

        return res;
    };

    // this.getReturnUnit = function (initUnit) {
    //     // check if the valid units contain the initial unit
    //     const check = getValidUnit(initUnit);

    //     if (check === "") {
    //         showErrorMsg(
    //             "The valid unit chars hasn't contain the current unit char",
    //             "this.getReturnUnit"
    //         );
    //         return undefined;
    //     }

    //     let filterredUnits = worldWideRatio.find((arr) => arr.includes(check));

    //     if (filterredUnits && filterredUnits.length > 0) {
    //         return filterredUnits.filter((el) => el !== check)[0];
    //     } else {
    //         showErrorMsg(
    //             "The valid unit chars hasn't contain the unit char processing to",
    //             "this.getReturnUnit"
    //         );
    //         return undefined;
    //     }
    // };

    this.spellOutUnit = function (unit) {
        const currentUnitChar = getValidUnit(unit);

        if (currentUnitChar === "") {
            showErrorMsg(
                "The valid units hasn't contain the current unit to return the full name",
                "this.spellOutUnit"
            );
            return undefined;
        }

        const unitObj = Object.values(unitNames).find(
            (unitData) => unitData.symbol === currentUnitChar
        );
        return unitObj
            ? unitObj.fullname
            : () => {
                  showErrorMsg(
                      "There are no valid full name to display it into result string",
                      "this.spellOutUnit"
                  );
                  return undefined;
              };
    };

    this.convert = function (initNum, initUnit, returnUnit) {
        let inUnit = getValidUnit(initUnit);
        let resUnit = getValidUnit(returnUnit);

        if ([inUnit, resUnit].some((e) => e === "")) {
            showErrorMsg(
                "The initials values hasn't contsin into valid inits",
                "this.convert"
            );
            return undefined;
        } else if (Number.isNaN(initNum)) {
            showErrorMsg(
                "The input value isn't a numeric value",
                "this.convert"
            );
            return undefined;
        }

        let result = null;

        units.forEach((obj) => {
            if (obj.from === inUnit && obj.to === resUnit) {
                result = Number(initNum) * (obj?.ratio || 1);
            } else if (obj.from === resUnit && obj.to === inUnit) {
                result = Number(initNum) / (obj?.ratio ** -1 || 1);
            }
        });

        return result === null
            ? () => {
                  showErrorMsg(
                      "No valid ratio to process data",
                      "this.convert"
                  );
                  return undefined;
              }
            : result;
    };

    this.getString = function (initNum, initUnit, returnNum, returnUnit) {
        if ([initNum, returnNum].some((x) => Number.isNaN(x))) {
            showErrorMsg(
                "Initial values to convert one to another aren't a numeric value",
                "this.getString"
            );
            return undefined;
        }

        let isValidData = false;

        let inUnitFullName = initUnit.trim().toLowerCase();
        let resUnitFullName = returnUnit.trim().toLowerCase();
        units.forEach((obj) => {
            if (
                obj.fromFullName === inUnitFullName &&
                obj.toFullName === resUnitFullName
            ) {
                isValidData = true;
            } else if (
                obj.fromFullName === resUnitFullName &&
                obj.toFullName === inUnitFullName
            ) {
                isValidData = true;
            }
        });

        return isValidData
            ? `${roundToFive(initNum)} ${initUnit} converts to ${roundToFive(
                  returnNum
              )} ${returnUnit}`
            : () => {
                  showErrorMsg("Invalid unit", "this.getString");
                  return undefined;
              };
    };
}

module.exports = ConvertHandler;
