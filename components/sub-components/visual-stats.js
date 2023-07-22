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
import { useSearch } from "@/context/search";
import { useLoaded } from "@/context/loading";

const VisualStats = () => {
    const { search } = useSearch();
    const [price, setPrice] = useState(null);
    const [news, setNews] = useState(null);
    const [isPriceLoaded, setIsPriceLoaded] = useState(false);
    const [isNewsLoaded, setIsNewsLoaded] = useState(false);
    const { setGlobalLoaded } = useLoaded();

    const url = "https://www.alphavantage.co/query";
    const apikey = process.env.ALPHAVANTAGE_API_KEY;

    const fetchPrices = async () => {
        setIsPriceLoaded(false);
        console.log("PRICE CHART - searching for... ", search);
        const config = {
            params: {
                apikey,
                function: "TIME_SERIES_MONTHLY_ADJUSTED",
                symbol: search,
                datatype: "json",
            },
        };
        try {
            // TODO: replace mock data with actual API call
            const res = await axios.get(url, config);
            console.log("%%%%%% ", res);
            const { data } = res;
            // const data = TIME_SERIES_MONTHLY_ADJUSTED;
            const arrayOfObj = Object.entries(
                data["Monthly Adjusted Time Series"]
            ).map((e) => ({ date: e[0], ...e[1] }));
            setPrice(arrayOfObj);
            setTimeout(() => {
                setIsPriceLoaded(true);
            }, 5000);
        } catch (error) {
            // TODO: check API docs again to see error output for better handling
            console.log(error);
            setIsPriceLoaded(false);
        }
    };

    const fetchNewsArticles = async () => {
        setIsNewsLoaded(false);
        console.log("SENTIMENT CHART - searching for... ", search);
        const config = {
            params: {
                apikey,
                function: "NEWS_SENTIMENT",
                tickers: search,
                limit: 20,
            },
        };
        try {
            // TODO: replace mock data with actual API call
            const res = await axios.get(url, config);
            const { feed } = res?.data;
            // const { feed } = NEWS_SENTIMENT;
            setNews(feed);
            setTimeout(() => {
                setIsNewsLoaded(true);
                setGlobalLoaded((prev) => ({ ...prev, visualStats: true }));
            }, 5000);
        } catch (error) {
            // TODO: check API docs again to see error output for better handling
            console.log(error);
            setIsNewsLoaded(false);
            setGlobalLoaded((prev) => ({ ...prev, visualStats: false }));
        }
    };

    useEffect(() => {
        if (search) {
            setIsPriceLoaded(false);
            setIsNewsLoaded(false);
            setGlobalLoaded((prev) => ({ ...prev, visualStats: false }));
            setTimeout(() => {
                fetchPrices();
                fetchNewsArticles();
            }, 60000);
        }
    }, [search]);

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
                <ChartTabs
                    priceData={price}
                    newsData={news}
                    isPriceLoaded={isPriceLoaded}
                    isNewsLoaded={isNewsLoaded}
                />
            </Box>
        </GridItem>
    );
};

export default VisualStats;
