/*
This JavaScript object, `unitNames`, serves as a comprehensive unit conversion dictionary.  
It contains various measurement units across different categories, such as length, weight, volume, and area.  

Each unit entry includes:  
- **Name & Symbol**: The common name and symbol of the unit.  
- **Conversion Data**: A list of equivalent units and their conversion ratios. The `default` conversion is the most commonly used transformation.  
- **Geographical Relevance**: Information on where the unit is primarily used (e.g., USA, UK, worldwide).  
- **Description**: A brief explanation of the unit’s typical use case.  

Additionally, the `validLength` property defines the minimum and maximum length constraints for valid unit symbols.  

This module exports the `unitNames` object for use in applications requiring unit conversions,  
such as scientific tools, engineering applications, or user-friendly measurement converters.  
*/

const unitNames = {
    mi: {
        name: "mile",
        fullname: "miles",
        symbol: "mi",
        convertedTo: {
            default: { unit: "km", ratio: 1.60934 },
            m: { unit: "m", ratio: 1609.344 },
            ft: { unit: "ft", ratio: 5280 },
        },
        area: {
            countries: ["USA"],
            description: "Used primarily in the United States.",
        },
    },
    km: {
        name: "kilometer",
        fullname: "kilometers",
        symbol: "km",
        convertedTo: {
            default: { unit: "mi", ratio: 0.621373 },
            m: { unit: "m", ratio: 1000 },
            ft: { unit: "ft", ratio: 3280.84 },
        },
        area: {
            countries: ["all except USA"],
            description: "Used worldwide except in the USA.",
        },
    },
    in: {
        name: "inch",
        fullname: "inches",
        symbol: "in",
        convertedTo: {
            default: { unit: "cm", ratio: 2.54 },
            mm: { unit: "mm", ratio: 25.4 },
            ft: { unit: "ft", ratio: 0.0833333 },
        },
        area: {
            countries: ["USA", "UK"],
            description: "Commonly used in the USA and UK.",
        },
    },
    mm: {
        name: "millimeter",
        fullname: "millimeters",
        symbol: "mm",
        convertedTo: {
            default: { unit: "cm", ratio: 0.1 },
            m: { unit: "m", ratio: 0.001 },
            in: { unit: "in", ratio: 0.0393701 },
        },
        area: {
            countries: ["worldwide"],
            description:
                "Used worldwide in scientific and engineering contexts.",
        },
    },
    cm: {
        name: "centimeter",
        fullname: "centimeters",
        symbol: "cm",
        convertedTo: {
            default: { unit: "in", ratio: 0.393701 },
            m: { unit: "m", ratio: 0.01 },
            mm: { unit: "mm", ratio: 10 },
        },
        area: {
            countries: ["worldwide"],
            description:
                "Used worldwide in everyday measurements and scientific contexts.",
        },
    },
    m: {
        name: "meter",
        fullname: "meters",
        symbol: "m",
        convertedTo: {
            default: { unit: "ft", ratio: 3.28084 },
            cm: { unit: "cm", ratio: 100 },
            yd: { unit: "yd", ratio: 1.09361 },
        },
        area: {
            countries: ["worldwide"],
            description:
                "Used worldwide in scientific and engineering contexts.",
        },
    },
    li: {
        name: "link",
        fullname: "links",
        symbol: "li",
        area: {
            countries: ["USA"],
            description: "Used in surveying in the USA.",
        },
    },
    ft: {
        name: "foot",
        fullname: "feet",
        symbol: "ft",
        convertedTo: {
            default: { unit: "m", ratio: 0.3048 },
            cm: { unit: "cm", ratio: 30.48 },
            in: { unit: "in", ratio: 12 },
        },
        area: {
            countries: ["USA", "UK"],
            description: "Commonly used in the USA and UK.",
        },
    },
    yd: {
        name: "yard",
        fullname: "yards",
        symbol: "yd",
        convertedTo: {
            default: { unit: "m", ratio: 0.9144 },
            ft: { unit: "ft", ratio: 3 },
            in: { unit: "in", ratio: 36 },
        },
        area: {
            countries: ["USA", "UK"],
            description: "Commonly used in the USA and UK.",
        },
    },
    oz: {
        name: "ounce",
        fullname: "ounces",
        symbol: "oz",
        convertedTo: {
            default: { unit: "g", ratio: 28.3495 },
            kg: { unit: "kg", ratio: 0.0283495 },
            lbs: { unit: "lbs", ratio: 0.0625 },
        },
        area: {
            countries: ["USA", "UK"],
            description: "Commonly used in the USA and UK.",
        },
    },
    lbs: {
        name: "pound",
        fullname: "pounds",
        symbol: "lbs",
        convertedTo: {
            default: { unit: "kg", ratio: 0.453592 },
            g: { unit: "g", ratio: 453.592 },
            oz: { unit: "oz", ratio: 16 },
        },
        area: {
            countries: ["USA", "UK"],
            description: "Commonly used in the USA and UK.",
        },
    },
    pt: {
        name: "pint",
        fullname: "pints",
        symbol: "pt",
        convertedTo: {
            default: { unit: "L", ratio: 0.473176 },
            mL: { unit: "mL", ratio: 473.176 },
            qt: { unit: "qt", ratio: 0.5 },
        },
        area: {
            countries: ["USA", "UK"],
            description: "Commonly used in the USA and UK.",
        },
    },
    qt: {
        name: "quart",
        fullname: "quarts",
        symbol: "qt",
        convertedTo: {
            default: { unit: "L", ratio: 0.946353 },
            pt: { unit: "pt", ratio: 2 },
            gal: { unit: "gal", ratio: 0.25 },
        },
        area: {
            countries: ["USA", "UK"],
            description: "Commonly used in the USA and UK.",
        },
    },
    gal: {
        name: "gallon",
        fullname: "gallons",
        symbol: "gal",
        convertedTo: {
            default: { unit: "L", ratio: 3.78541 },
            ml: { unit: "mL", ratio: 3785.41 },
            qt: { unit: "qt", ratio: 4 },
        },
        area: {
            countries: ["USA", "UK"],
            description: "Commonly used in the USA and UK.",
        },
    },
    g: {
        name: "gram",
        fullname: "grams",
        symbol: "g",
        convertedTo: {
            default: { unit: "oz", ratio: 0.035274 },
            kg: { unit: "kg", ratio: 0.001 },
            lbs: { unit: "lbs", ratio: 0.00220462 },
        },
        area: {
            countries: ["worldwide"],
            description:
                "Used worldwide in scientific and engineering contexts.",
        },
    },
    kg: {
        name: "kilogram",
        fullname: "kilograms",
        symbol: "kg",
        convertedTo: {
            default: { unit: "lbs", ratio: 2.204624 },
            g: { unit: "g", ratio: 1000 },
            oz: { unit: "oz", ratio: 35.274 },
        },
        area: {
            countries: ["worldwide"],
            description:
                "Used worldwide in scientific and engineering contexts.",
        },
    },
    mg: {
        name: "milligram",
        fullname: "milligrams",
        symbol: "mg",
        convertedTo: {
            default: { unit: "g", ratio: 0.001 },
            kg: { unit: "kg", ratio: 0.000001 },
            oz: { unit: "oz", ratio: 0.000035274 },
        },
        area: {
            countries: ["worldwide"],
            description: "Used worldwide in scientific and medical contexts.",
        },
    },
    ml: {
        name: "milliliter",
        fullname: "milliliters",
        symbol: "mL",
        convertedTo: {
            default: { unit: "fl oz", ratio: 0.033814 },
            L: { unit: "L", ratio: 0.001 },
            gal: { unit: "gal", ratio: 0.000264172 },
        },
        area: {
            countries: ["worldwide"],
            description:
                "Used worldwide in scientific and engineering contexts.",
        },
    },
    l: {
        name: "liter",
        fullname: "liters",
        symbol: "L",
        convertedTo: {
            default: { unit: "gal", ratio: 0.264172 },
            mL: { unit: "mL", ratio: 1000 },
            pt: { unit: "pt", ratio: 2.11338 },
        },
        area: {
            countries: ["worldwide"],
            description:
                "Used worldwide in scientific and engineering contexts.",
        },
    },
    ton: {
        name: "ton",
        fullname: "tons",
        symbol: "ton",
        convertedTo: {
            default: { unit: "kg", ratio: 907.185 },
            lbs: { unit: "lbs", ratio: 2000 },
            tonne: { unit: "tonne", ratio: 1.01605 },
        },
        area: {
            countries: ["worldwide"],
            description:
                "Used worldwide in industrial and commercial contexts.",
        },
    },
    tonne: {
        name: "tonne",
        fullname: "tonnes",
        symbol: "tonne",
        convertedTo: {
            default: { unit: "kg", ratio: 1000 },
            lbs: { unit: "lbs", ratio: 2204.62 },
            ton: { unit: "ton", ratio: 0.984207 },
        },
        area: {
            countries: ["worldwide"],
            description:
                "Used worldwide in scientific and industrial contexts.",
        },
    },
    ha: {
        name: "hectare",
        fullname: "hectares",
        symbol: "ha",
        convertedTo: {
            default: { unit: "acre", ratio: 2.47105 },
            m2: { unit: "m²", ratio: 10000 },
            km2: { unit: "km²", ratio: 0.01 },
        },
        area: {
            countries: ["worldwide"],
            description: "Used worldwide in land measurement and agriculture.",
        },
    },
    acre: {
        name: "acre",
        fullname: "acres",
        symbol: "acre",
        convertedTo: {
            default: { unit: "ha", ratio: 0.404686 },
            m2: { unit: "m²", ratio: 4046.86 },
            km2: { unit: "km²", ratio: 0.00404686 },
        },
        area: {
            countries: ["USA", "UK"],
            description:
                "Commonly used in the USA and UK for land measurement.",
        },
    },
    validLength: {
        min: 1,
        max: 5,
    },
};

const fccTests = true;

if (fccTests) {
    const filteredUnits = ["gal", "l", "mi", "km", "lbs", "kg"].reduce(
        (tot, key) => {
            if (unitNames[key]) {
                tot[key] = unitNames[key];
            }
            return tot;
        },
        {}
    );
    filteredUnits.validLength = unitNames.validLength;
    module.exports = { unitNames: filteredUnits };
} else {
    module.exports = { unitNames };
}
