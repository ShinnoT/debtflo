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
import Card from "./card";
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
        <Card rowSpan={{ base: 2, md: 3, lg: 6 }} colSpan={{ base: 2, lg: 8 }}>
            <ChartTabs
                priceData={price}
                newsData={data?.NEWS?.data?.feed}
                isPriceLoaded={globalLoaded}
                isNewsLoaded={globalLoaded}
            />
        </Card>
    );
};

export default VisualStats;
