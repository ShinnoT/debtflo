import axios from "axios";

import {
    APILimitError,
    APISearchQueryError,
    UnexpectedError,
} from "./custom-errors";

// import {
//     TIME_SERIES_MONTHLY_ADJUSTED,
//     NEWS_SENTIMENT,
//     OVERVIEW,
// } from "./sample-data";

const fetchAPI = async (url, config) => {
    try {
        const res = await axios.get(url, config);
        if (res.status === 200 && res?.data) {
            if (Object.keys(res?.data).length === 0)
                throw new APISearchQueryError(
                    "The company with this ticker does not exist"
                );
            if (res?.data?.Information)
                throw new APILimitError(
                    "You have reached the maximum requests for this website. The data is fetched from a free API account and thus has a low limit on how many times we can fetch data. Please come back after a day to continue using the app!"
                );
            if (res?.data?.Note)
                throw new APILimitError(
                    "Please wait another minute before searching another ticker. This app utilizes a free API and thus limits you to 5 API calls per minute."
                );
        }
        return res;
    } catch (error) {
        if (
            error.name === "API Limit Error" ||
            error.name === "API Search Query Error"
        )
            throw error;
        throw new UnexpectedError(error.message);
    }
};

const callOverview = async (search) => {
    const url = "https://www.alphavantage.co/query";
    const apikey = process.env.ALPHAVANTAGE_API_KEY;
    const config = {
        params: {
            apikey,
            function: "OVERVIEW",
            symbol: search,
            datatype: "json",
        },
    };

    const res = await fetchAPI(url, config);
    return res;
};

const callNews = async (search) => {
    const url = "https://www.alphavantage.co/query";
    const apikey = process.env.ALPHAVANTAGE_API_KEY;
    const config = {
        params: {
            apikey,
            function: "NEWS_SENTIMENT",
            tickers: search,
            limit: 100,
        },
    };

    const res = await fetchAPI(url, config);
    return res;
};

const callPrice = async (search) => {
    const url = "https://www.alphavantage.co/query";
    const apikey = process.env.ALPHAVANTAGE_API_KEY;
    const config = {
        params: {
            apikey,
            function: "TIME_SERIES_MONTHLY_ADJUSTED",
            symbol: search,
            datatype: "json",
        },
    };

    const res = await fetchAPI(url, config);
    return res;
};

const callAPI = async (search) => {
    // NOTE: UNCOMMENT BELOW TO FETCH REAL DATA FROM API
    // call api endpoints
    const OVERVIEW = await callOverview(search);
    const NEWS = await callNews(search);
    const PRICE = await callPrice(search);

    return {
        SUCCESS: true,
        OVERVIEW,
        NEWS,
        PRICE,
    };

    // NOTE: COMMENT OUT BELOW TO STOP FETCHING SAMPLE DATA
    // return {
    //     SUCCESS: true,
    //     OVERVIEW: { data: { ...OVERVIEW } },
    //     NEWS: { data: { ...NEWS_SENTIMENT } },
    //     PRICE: { data: { ...TIME_SERIES_MONTHLY_ADJUSTED } },
    // };
};

export default callAPI;
