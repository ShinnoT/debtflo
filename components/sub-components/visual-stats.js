import {
    GridItem,
    useColorModeValue,
    Box,
    Heading,
    Text,
    Flex,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";

import PriceChart from "../charts/price-chart";
import {
    TIME_SERIES_MONTHLY_ADJUSTED,
    NEWS_SENTIMENT,
} from "@/lib/sample-data";
import ChartTabs from "./chart-tabs";

const VisualStats = () => {
    const [price, setPrice] = useState(null);
    const [news, setNews] = useState(null);
    const url = "https://www.alphavantage.co/query";
    const apikey = process.env.ALPHAVANTAGE_API_KEY;

    const fetchPrices = async () => {
        const config = {
            params: {
                apikey,
                function: "TIME_SERIES_MONTHLY_ADJUSTED",
                symbol: "AAPL",
                datatype: "json",
            },
        };
        try {
            // TODO: replace mock data with actual API call
            // const { data } = await axios.get(url, config);
            const data = TIME_SERIES_MONTHLY_ADJUSTED;
            const arrayOfObj = Object.entries(
                data["Monthly Adjusted Time Series"]
            ).map((e) => ({ date: e[0], ...e[1] }));
            setPrice(arrayOfObj);
        } catch (error) {
            // TODO: check API docs again to see error output for better handling
            console.log(error);
        }
    };

    const fetchNewsArticles = async () => {
        const config = {
            params: {
                apikey,
                function: "NEWS_SENTIMENT",
                tickers: "AAPL",
                limit: 20,
            },
        };
        try {
            // TODO: replace mock data with actual API call
            // const res = await axios.get(url, config);
            // const { feed } = res?.data;
            const { feed } = NEWS_SENTIMENT;
            setNews(feed);
        } catch (error) {
            console.log(error?.response?.data?.error);
        }
    };

    useEffect(() => {
        fetchPrices();
        fetchNewsArticles();
    }, []);

    return (
        <GridItem
            borderRadius={2}
            colSpan={8}
            rowSpan={6}
            // boxShadow="base"
            border="1px"
            borderColor={useColorModeValue("gray.200", "gray.600")}
            bg={useColorModeValue("#E3F4F4", "#393646")}
            p={2}
        >
            <Box
                py={2}
                px={2}
                bg={useColorModeValue("#E3F4F4", "#393646")}
                h={0}
                minH="100%"
                overflowY="auto"
            >
                <ChartTabs priceData={price} newsData={news} />
            </Box>
        </GridItem>
    );
};

export default VisualStats;
