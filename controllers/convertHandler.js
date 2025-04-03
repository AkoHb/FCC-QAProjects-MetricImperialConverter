const { unitNames } = require("./units.js");

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
    !fccTests ??
    console.debug(
        `⚠️ [ERROR]: ${msg}. ${fnName !== "" && `---Function '${fnName}'.---`}`
    );

const showInfoMsg = (msg = "") =>
    !fccTests ?? console.debug(`%cℹ️ [INFO]: ${msg}.`, "color: blue;");

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
            return undefined;
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

    unitNames.validLength.min =
        minLength === Infinity || minLength < 1 ? 1 : minLength;
    unitNames.validLength.max =
        maxLength === -Infinity || maxLength < 1 ? 5 : maxLength;

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
 * The function 'isValidUnit' checks if the 'unitNames' object contains the given unit.
 * @param { String } unit - Separated string value at the end of the request
 *
 * @returns { Boolean } - Returns true if the unit exists in unitNames, otherwise false.
 */
const isValidUnit = (unit = "") => {
    if (!unit?.trim()) {
        showErrorMsg(
            `The passed value 'unit' is ( empty || undefined || null )`,
            "isValidUnit"
        );
        return false;
    }

    return unitNames?.hasOwnProperty(unit.trim().toLowerCase()) ?? false;
};

/**
 * The function "getValidUnit" used to get the unit symbol
 * @param { string } input - string value passed from request body as unit
 * @returns { string } -
 */
const getValidUnit = (input = "") => {
    input = input?.trim().toLowerCase();

    if (isValidUnit(input)) {
        return unitNames?.[input]?.symbol;
    } else {
        showErrorMsg(
            `The input unit with value ${input} not contain in the 'unitNames' object`,
            "getValidUnit"
        );
        return undefined;
    }
};

/**
 * The function 'isValidObjectToConvert' checks the object to valid values
 * @param { Object } obj - object form 'initNames' object to check the keys and values
 * @returns { Boolean } - valid values to convertation process or not
 */
const isValidObjectToConvert = (obj) =>
    ["unit", "ratio"].every((key) => obj?.hasOwnProperty(key)) &&
    obj?.ratio > 0;

/**
 * The function 'getObjToConvert' used to get the convertion object with unit name and ratio
 *
 * The function used to:
 * - check in the every key name is contains into 'unitNames' object
 * - if the convertTo contains into the object with key 'convertedTo', and 'isValidObjectToConvert' === true, return it
 * - if not: return default object if it is valid or empty object
 *
 * @param { String } initUnit - initialised unit value
 * @param { String } convertTo - if is not equals to null - try to get the convert object to calculate specific value
 * @returns { Object }
 */
const getObjToConvert = (initUnit, convertTo = null) => {
    let result = {};

    const currentObjConvertTo = unitNames?.[initUnit]?.convertedTo ?? {};
    if (convertTo !== null) {
        result = currentObjConvertTo?.[convertTo.trim().toLowerCase()];
    } else {
        result = currentObjConvertTo?.default;
    }

    return isValidObjectToConvert(result) ? result : {};
};

function numberStringSplitter(input) {
    let number = input.match(/[.\d\/]+/g) || ["1"];
    let string = input.match(/[a-zA-Z]+/g)?.[0] || "";
    return [number[0], string];
}

function checkDiv(possibleFraction) {
    let nums = possibleFraction.split("/");
    if (nums.length > 2) {
        return false;
    }
    return nums;
}

// used to round num to 5 digits after dot
const roundToFive = (num) =>
    Number.isNaN(num) ? 0 : Math.round(num * 10 ** 5) / 10 ** 5;
// const roundToFive = (num) =>
//     Number.isNaN(num) ? 0 : Number.parseFloat(num).toFixed(5);

function ConvertHandler() {
    /**
     *
     * @param { String } input - user input request
     * @returns - error or the calculated value
     */

    /* 
        // !!! --- FCC Test 8/9 Expectation: --- !!!
        // Must return exact strings 'invalid number'/'invalid number and unit'
        // Current returns undefined to allow more detailed error handling

        this.getNum = function (input) {
        let inputValidation = isValidInput(input);
        let clearedInput = null;

        if (inputValidation?.statusCode === 200) {
            clearedInput = inputValidation?.success.match(
                /^([\d./\s]+)?([a-zA-Z]+)$/i
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

        if (!res) {
            showErrorMsg(
                "The valid unit chars hasn't contain the current unit char",
                "this.getUnit"
            );
            return undefined;
        }

        return res;
    }; */

    // SOLUTION TO PASSED ALL TESTS
    this.getNum = function (input) {
        let result = numberStringSplitter(input)[0];
        let nums = checkDiv(result);

        if (!nums) {
            return undefined;
        }

        let num1 = nums[0];
        let num2 = nums[1] || "1";

        if (isNaN(num1) || isNaN(num2)) {
            return undefined;
        }

        if (parseFloat(num2) === 0) {
            return undefined;
        }

        return parseFloat(num1) / parseFloat(num2);
    };

    this.getUnit = function (input) {
        let result = numberStringSplitter(input)[1].toLowerCase();

        if (!isValidUnit(result)) {
            return undefined;
        }

        return getValidUnit(result);
    };
    // PASSED ALL TESTS

    /**
     * The method 'getReturnUnit' used to return the symbol of the returning unit
     *
     * @param { String } initUnit - init unit from sthe request
     * @param { String } convertedTo - String with a specific unit convert to
     *
     * The function:
     * - check is the initialized unit is contain in current object
     * - if the 'convertTo' equals to null, return the unit by default
     * - if the value can be converted to needed unit and hold the keys 'unit' && 'ratio' - return it
     * - if not - set the default ratio
     *
     * @returns { String } - Symbol of current returning unit
     */
    this.getReturnUnit = function (initUnit, convertTo = null) {
        // check if the initialized unit is valid
        initUnit = initUnit?.trim()?.toLowerCase();

        const check = isValidUnit(initUnit);

        if (!check) {
            showErrorMsg(
                "The valid unit chars hasn't contain the current unit char",
                "this.getReturnUnit"
            );
            return undefined;
        }

        const currentObj = getObjToConvert(initUnit, convertTo);

        if (currentObj && currentObj.unit) {
            return unitNames?.[currentObj?.unit.toLowerCase()]?.symbol;
        } else {
            showErrorMsg(
                "The valid unit chars hasn't contain the unit char processing to",
                "this.getReturnUnit"
            );
            return undefined;
        }
    };

    this.spellOutUnit = function (unit) {
        unit = unit?.trim();
        const check = isValidUnit(unit);

        if (!check) {
            showErrorMsg(
                "The valid units hasn't contain the current unit to return the full name",
                "this.spellOutUnit"
            );
            return undefined;
        }
        return unitNames?.[unit?.toLowerCase()]?.fullname;
    };

    this.convert = function (initNum, initUnit, convertTo = null) {
        let isValidUnits = false;
        initUnit = initUnit?.trim()?.toLowerCase();

        if (convertTo) {
            isValidUnits = [initUnit, convertTo].some((key) =>
                isValidUnit(key)
            );
        } else {
            isValidUnits = isValidUnit(initUnit);
        }
        let currentObj = {};
        if (isValidUnits) {
            if (convertTo) {
                currentObj = getObjToConvert(initUnit, convertTo);
            } else {
                currentObj = getObjToConvert(initUnit);
            }
        } else {
            showErrorMsg(
                "No valid data to convert the initial value",
                "this.convert"
            );
            return undefined;
        }

        if (Number.isNaN(initNum)) {
            showErrorMsg(
                "The input value isn't a numeric value",
                "this.convert"
            );
            initNum = 1;
            // return undefined;
        }

        return currentObj?.ratio
            ? roundToFive(currentObj?.ratio * initNum)
            : undefined;
    };

    this.getString = function (initNum, initUnit, returnNum, returnUnit) {
        if ([initNum, returnNum].some((x) => Number.isNaN(x))) {
            showErrorMsg(
                "Convertation values should be a numerical",
                "this.getString"
            );
            return undefined;
        }

        initNum = initNum ?? 1;

        initUnit = initUnit?.trim().toLowerCase();

        const isValidKeys = isValidUnit(initUnit)
            ? isValidUnit(returnUnit)
                ? unitNames?.[initUnit]?.convertedTo?.default?.unit ===
                  returnUnit
                    ? isValidObjectToConvert(
                          unitNames?.[initUnit]?.convertedTo?.default
                      )
                    : isValidObjectToConvert(
                          unitNames?.[initUnit]?.convertedTo?.[returnUnit]
                      )
                : false
            : false;

        if (!isValidKeys) {
            showErrorMsg("Invalid units", "this.getString");
            return undefined;
        }

        return `${initNum} ${
            unitNames?.[initUnit]?.fullname ||
            `Unknown full name to unit '${this.getUnit(initUnit)}'`
        } converts to ${roundToFive(returnNum)} ${
            unitNames?.[returnUnit?.trim()?.toLowerCase()]?.fullname ||
            `Unknown full name to unit '${this.getUnit(returnUnit)}'`
        }`;
    };
}

module.exports = ConvertHandler;
