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

const VisualStats = ({ data }) => {
    const { globalLoaded } = useLoaded();
    const [price, setPrice] = useState(null);

    const formatPrices = async () => {
        const arrayOfObj = Object.entries(
            data?.PRICE?.data["Monthly Adjusted Time Series"]
        ).map((e) => ({ date: e[0], ...e[1] }));
        setPrice(arrayOfObj);
    };

    useEffect(() => {
        if (data) formatPrices();
    }, [data]);

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
                    newsData={data?.NEWS?.data?.feed}
                    isPriceLoaded={globalLoaded}
                    isNewsLoaded={globalLoaded}
                />
            </Box>
        </GridItem>
    );
};

export default VisualStats;
