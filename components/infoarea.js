import { Grid } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import BasicStats from "./sub-components/basic-stats";
import KeyDates from "./sub-components/key-dates";
import MetaData from "./sub-components/meta-data";
import NewsItem from "./sub-components/news";
import OverallNewsSentiment from "./sub-components/overall-news-sentiment";
import VisualStats from "./sub-components/visual-stats";

import { useGlobalError } from "@/context/error";
import { useLoaded } from "@/context/loading";
import { useSearch } from "@/context/search";
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
            templateRows={{
                base: "repeat(10, 1fr)",
                md: "repeat(11, 1fr)",
                lg: "repeat(10, 1fr)",
            }}
            templateColumns={{ base: "repeat(2, 1fr)", lg: "repeat(11, 1fr)" }}
            alignItems="stretch"
            gap={4}
            flexGrow={1}
            // pb={4}
            mb="50px"
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
