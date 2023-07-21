import { Grid, GridItem, useColorModeValue } from "@chakra-ui/react";

import NewsItem from "./sub-components/news";
import MetaData from "./sub-components/meta-data";
import VisualStats from "./sub-components/visual-stats";
import BasicStats from "./sub-components/basic-stats";
import OverallNewsSentiment from "./sub-components/overall-news-sentiment";

const InfoArea = () => {
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
            <NewsItem />
            <MetaData />
            <BasicStats />
            <OverallNewsSentiment />
            <VisualStats />
        </Grid>
    );
};

export default InfoArea;
