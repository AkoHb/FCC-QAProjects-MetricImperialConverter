const unitNames = {
    mi: {
        name: "mile",
        fullname: "miles",
        symbol: "mi",
        area: {
            countries: ["USA"],
            description: "Used primarily in the United States.",
        },
    },
    km: {
        name: "kilometer",
        fullname: "kilometers",
        symbol: "km",
        area: {
            countries: ["all except USA"],
            description: "Used worldwide except in the USA.",
        },
    },
    in: {
        name: "inch",
        fullname: "inches",
        symbol: "in",
        area: {
            countries: ["USA", "UK"],
            description: "Commonly used in the USA and UK.",
        },
    },
    mm: {
        name: "millimeter",
        fullname: "millimeters",
        symbol: "mm",
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
        area: {
            countries: ["USA", "UK"],
            description: "Commonly used in the USA and UK.",
        },
    },
    yd: {
        name: "yard",
        fullname: "yards",
        symbol: "yd",
        area: {
            countries: ["USA", "UK"],
            description: "Commonly used in the USA and UK.",
        },
    },
    oz: {
        name: "ounce",
        fullname: "ounces",
        symbol: "oz",
        area: {
            countries: ["USA", "UK"],
            description: "Commonly used in the USA and UK.",
        },
    },
    lbs: {
        name: "pound",
        fullname: "pounds",
        symbol: "lbs",
        area: {
            countries: ["USA", "UK"],
            description: "Commonly used in the USA and UK.",
        },
    },
    pt: {
        name: "pint",
        fullname: "pints",
        symbol: "pt",
        area: {
            countries: ["USA", "UK"],
            description: "Commonly used in the USA and UK.",
        },
    },
    qt: {
        name: "quart",
        fullname: "quarts",
        symbol: "qt",
        area: {
            countries: ["USA", "UK"],
            description: "Commonly used in the USA and UK.",
        },
    },
    gal: {
        name: "gallon",
        fullname: "gallons",
        symbol: "gal",
        area: {
            countries: ["USA", "UK"],
            description: "Commonly used in the USA and UK.",
        },
    },
    g: {
        name: "gram",
        fullname: "grams",
        symbol: "g",
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
        area: {
            countries: ["worldwide"],
            description: "Used worldwide in scientific and medical contexts.",
        },
    },
    mL: {
        name: "milliliter",
        fullname: "milliliters",
        symbol: "mL",
        area: {
            countries: ["worldwide"],
            description:
                "Used worldwide in scientific and engineering contexts.",
        },
    },
    L: {
        name: "liter",
        fullname: "liters",
        symbol: "L",
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
        area: {
            countries: ["worldwide"],
            description: "Used worldwide in land measurement and agriculture.",
        },
    },
    acre: {
        name: "acre",
        fullname: "acres",
        symbol: "acre",
        area: {
            countries: ["USA", "UK"],
            description:
                "Commonly used in the USA and UK for land measurement.",
        },
    },
    validLength: {
        min: 1,
        max: 5
    }
};

const worldWideRatio = [
    [unitNames.mi.symbol, unitNames.km.symbol],
    [unitNames.gal.symbol, unitNames.L.symbol],
    [unitNames.in.symbol, unitNames.mm.symbol],
    [unitNames.ft.symbol, unitNames.m.symbol],
    [unitNames.lbs.symbol, unitNames.kg.symbol],
    [unitNames.oz.symbol, unitNames.g.symbol],
    [unitNames.yd.symbol, unitNames.m.symbol],
    [unitNames.pt.symbol, unitNames.mL.symbol],
    [unitNames.qt.symbol, unitNames.L.symbol],
];

/**
 *  contains the ratio of quantities
 *
 * from = short measure name from what size calculating
 * fromFullName = full name into meny state
 * to = short measure name to what size calculating
 * toFullName = full name into meny state
 * ratio = ratio from / ratio to
 */
const units = [
    {
        from: unitNames.in.symbol,
        fromFullName: unitNames.in.fullname,
        to: unitNames.mm.symbol,
        toFullName: unitNames.mm.fullname,
        ratio: 25.4,
    },
    {
        from: unitNames.li.symbol,
        fromFullName: unitNames.li.fullname,
        to: unitNames.mm.symbol,
        toFullName: unitNames.mm.fullname,
        ratio: 201.1,
    },
    {
        from: unitNames.ft.symbol,
        fromFullName: unitNames.ft.fullname,
        to: unitNames.mm.symbol,
        toFullName: unitNames.mm.fullname,
        ratio: 304.8,
    },
    {
        from: unitNames.yd.symbol,
        fromFullName: unitNames.yd.fullname,
        to: unitNames.m.symbol,
        toFullName: unitNames.m.fullname,
        ratio: 0.9144,
    },
    {
        from: unitNames.mi.symbol,
        fromFullName: unitNames.mi.fullname,
        to: unitNames.km.symbol,
        toFullName: unitNames.km.fullname,
        ratio: 1.60934,
    },
    {
        from: unitNames.oz.symbol,
        fromFullName: unitNames.oz.fullname,
        to: unitNames.g.symbol,
        toFullName: unitNames.g.fullname,
        ratio: 28.35,
    },
    {
        from: unitNames.lbs.symbol,
        fromFullName: unitNames.lbs.fullname,
        to: unitNames.kg.symbol,
        toFullName: unitNames.kg.fullname,
        ratio: 0.453592,
    },
    {
        from: unitNames.pt.symbol,
        fromFullName: unitNames.pt.fullname,
        to: unitNames.mL.symbol,
        toFullName: unitNames.mL.fullname,
        ratio: 473.2,
    },
    {
        from: unitNames.qt.symbol,
        fromFullName: unitNames.qt.fullname,
        to: unitNames.mL.symbol,
        toFullName: unitNames.mL.fullname,
        ratio: 946.4,
    },
    {
        from: unitNames.gal.symbol,
        fromFullName: unitNames.gal.fullname,
        to: unitNames.L.symbol,
        toFullName: unitNames.L.fullname,
        ratio: 3.78541,
    },
];


module.exports = { unitNames, worldWideRatio, units };