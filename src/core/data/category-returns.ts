
export interface CategoryReturnData {
    category: string;
    returns: {
        "1Y": number;
        "3Y": number;
        "5Y": number;
        "7Y": number;
        "10Y": number;
    };
}

export const CATEGORY_RETURNS: Record<string, CategoryReturnData> = {
    "Gold": {
        "category": "Commodities",
        "returns": {
            "1Y": 65.96,
            "3Y": 32.34,
            "5Y": 19.86,
            "7Y": 16.5,
            "10Y": 16.26
        }
    },
    "Mid Cap": {
        "category": "Equity",
        "returns": {
            "1Y": 4.0,
            "3Y": 21.98,
            "5Y": 24.53,
            "7Y": 18.0,
            "10Y": 16.0
        }
    },
    "Small Cap": {
        "category": "Equity",
        "returns": {
            "1Y": -5.76,
            "3Y": 20.29,
            "5Y": 26.49,
            "7Y": 19.5,
            "10Y": 16.0
        }
    },
    "Flexi Cap": {
        "category": "Equity",
        "returns": {
            "1Y": 4.7,
            "3Y": 17.58,
            "5Y": 19.05,
            "7Y": 16.5,
            "10Y": 15.5
        }
    },
    "Multi Cap": {
        "category": "Equity",
        "returns": {
            "1Y": 2.5,
            "3Y": 19.94,
            "5Y": 21.64,
            "7Y": 16.5,
            "10Y": 15.0
        }
    },
    "Thematic": {
        "category": "Equity",
        "returns": {
            "1Y": 2.07,
            "3Y": 17.13,
            "5Y": 19.74,
            "7Y": 16.0,
            "10Y": 15.0
        }
    },
    "Large Cap": {
        "category": "Equity",
        "returns": {
            "1Y": 6.96,
            "3Y": 14.62,
            "5Y": 16.71,
            "7Y": 14.0,
            "10Y": 13.0
        }
    },
    "Nifty Index": {
        "category": "Equity",
        "returns": {
            "1Y": 6.5,
            "3Y": 14.62,
            "5Y": 15.0,
            "7Y": 14.0,
            "10Y": 12.0
        }
    },
    "Value Oriented": {
        "category": "Equity",
        "returns": {
            "1Y": 3.08,
            "3Y": 20.08,
            "5Y": 23.71,
            "7Y": 15.0,
            "10Y": 14.0
        }
    },
    "Large & MidCap": {
        "category": "Equity",
        "returns": {
            "1Y": 4.62,
            "3Y": 19.74,
            "5Y": 21.44,
            "7Y": 17.0,
            "10Y": 16.0
        }
    },
    "Multi Asset Allocation": {
        "category": "Hybrid",
        "returns": {
            "1Y": 13.5,
            "3Y": 15.66,
            "5Y": 15.0,
            "7Y": 13.0,
            "10Y": 11.5
        }
    },
    "Aggressive Hybrid": {
        "category": "Hybrid",
        "returns": {
            "1Y": 5.0,
            "3Y": 12.0,
            "5Y": 15.0,
            "7Y": 14.0,
            "10Y": 12.0
        }
    },
    "Sectoral": {
        "category": "Equity",
        "returns": {
            "1Y": 0.98,
            "3Y": 22.07,
            "5Y": 22.22,
            "7Y": 17.0,
            "10Y": 16.0
        }
    },
    "Dynamic Asset Allocation": {
        "category": "Hybrid",
        "returns": {
            "1Y": 6.12,
            "3Y": 13.55,
            "5Y": 13.39,
            "7Y": 12.0,
            "10Y": 11.0
        }
    },
    "ELSS": {
        "category": "Equity",
        "returns": {
            "1Y": 3.3,
            "3Y": 17.19,
            "5Y": 16.0,
            "7Y": 15.5,
            "10Y": 14.5
        }
    },
    "Liquid": {
        "category": "Debt",
        "returns": {
            "1Y": 6.69,
            "3Y": 7.07,
            "5Y": 5.83,
            "7Y": 5.5,
            "10Y": 6.2
        }
    },
    "Short Duration": {
        "category": "Debt",
        "returns": {
            "1Y": 8.39,
            "3Y": 8.04,
            "5Y": 6.48,
            "7Y": 6.5,
            "10Y": 7.2
        }
    },
    "Corporate Bond": {
        "category": "Debt",
        "returns": {
            "1Y": 8.32,
            "3Y": 8.03,
            "5Y": 6.42,
            "7Y": 7.0,
            "10Y": 7.8
        }
    },
    "Conservative Hybrid": {
        "category": "Hybrid",
        "returns": {
            "1Y": 6.7,
            "3Y": 10.01,
            "5Y": 9.9,
            "7Y": 9.5,
            "10Y": 9.5
        }
    },
    "Money Market": {
        "category": "Debt",
        "returns": {
            "1Y": 7.65,
            "3Y": 7.64,
            "5Y": 6.25,
            "7Y": 6.0,
            "10Y": 6.5
        }
    },
    "Overnight": {
        "category": "Debt",
        "returns": {
            "1Y": 5.93,
            "3Y": 6.43,
            "5Y": 5.38,
            "7Y": 5.25,
            "10Y": 5.5
        }
    },
    "Arbitrage": {
        "category": "Hybrid",
        "returns": {
            "1Y": 6.98,
            "3Y": 7.76,
            "5Y": 6.44,
            "7Y": 6.5,
            "10Y": 6.8
        }
    },
    "Banking and PSU": {
        "category": "Debt",
        "returns": {
            "1Y": 8.11,
            "3Y": 7.75,
            "5Y": 6.25,
            "7Y": 6.5,
            "10Y": 7.5
        }
    },
    "Equity Savings": {
        "category": "Hybrid",
        "returns": {
            "1Y": 7.02,
            "3Y": 10.85,
            "5Y": 11.04,
            "7Y": 10.0,
            "10Y": 9.0
        }
    },
    "Balanced Hybrid": {
        "category": "Hybrid",
        "returns": {
            "1Y": 5.04,
            "3Y": 11.47,
            "5Y": 10.88,
            "7Y": 11.0,
            "10Y": 12.0
        }
    }
};
