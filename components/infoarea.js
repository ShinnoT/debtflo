import { Grid, GridItem, useColorModeValue } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import NewsItem from "./sub-components/news";
import MetaData from "./sub-components/meta-data";
import VisualStats from "./sub-components/visual-stats";
import BasicStats from "./sub-components/basic-stats";
import OverallNewsSentiment from "./sub-components/overall-news-sentiment";
import KeyDates from "./sub-components/key-dates";

import { useSearch } from "@/context/search";
import { useLoaded } from "@/context/loading";
import { useGlobalError } from "@/context/error";
import callAPI from "@/lib/handle-api";

const InfoArea = () => {
    const { search } = useSearch();
    const { globalLoaded, setGlobalLoaded } = useLoaded();
    const { setGlobalError } = useGlobalError();
    const [allData, setAllData] = useState(null);

    const fetchData = async () => {
        if (globalLoaded) setGlobalLoaded(false);
        // if (allData) setAllData(null);
        try {
            const data = await callAPI(search);
            setAllData(data) || setGlobalLoaded(true);
        } catch (error) {
            setGlobalError({ title: error.name, message: error.message });
        }
    };

    useEffect(() => {
        if (search) fetchData();
    }, [search]);

    return (
        <Grid
            w="full"
            templateRows="repeat(10, 1fr)"
            templateColumns="repeat(11, 1fr)"
            alignItems="stretch"
            gap={4}
            flexGrow={1}
            pb={4}
        >
            <NewsItem data={allData} />
            <MetaData data={allData} />
            <BasicStats data={allData} />
            <KeyDates data={allData} />
            <OverallNewsSentiment data={allData} />
            <VisualStats data={allData} />
        </Grid>
    );
};

export default InfoArea;
