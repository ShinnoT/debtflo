import {
    Tab,
    TabList,
    Tabs,
    TabPanel,
    TabPanels,
    Box,
    useStyles,
    Skeleton,
} from "@chakra-ui/react";

import PriceChart from "../charts/price-chart";
import SentimentChart from "../charts/sentiment-chart";

const ChartTabs = ({ priceData, newsData, isPriceLoaded, isNewsLoaded }) => {
    return (
        <Tabs align="end" colorScheme="gray" size="sm" w="100%" h="100%" isLazy>
            <TabList>
                <Tab>Monthly Adjusted Price</Tab>
                <Tab>News Sentiment &#47; Article</Tab>
            </TabList>

            <Box w="100%" h="calc(100% - 31px)">
                <TabPanels h="100%">
                    <TabPanel pt={3} h="100%">
                        <Skeleton
                            isLoaded={isPriceLoaded}
                            fadeDuration={1}
                            startColor="green.400"
                            endColor="pink.400"
                            height="100%"
                        >
                            {priceData && <PriceChart data={priceData} />}
                        </Skeleton>
                    </TabPanel>
                    <TabPanel pt={3} h="100%">
                        <Skeleton
                            isLoaded={isNewsLoaded}
                            fadeDuration={1}
                            startColor="green.400"
                            endColor="pink.400"
                            height="100%"
                        >
                            {newsData && <SentimentChart data={newsData} />}
                        </Skeleton>
                    </TabPanel>
                </TabPanels>
            </Box>
        </Tabs>
    );
};

export default ChartTabs;
