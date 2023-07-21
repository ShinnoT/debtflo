import {
    Tab,
    TabList,
    Tabs,
    TabPanel,
    TabPanels,
    Box,
    useStyles,
} from "@chakra-ui/react";

import PriceChart from "../charts/price-chart";
import SentimentChart from "../charts/sentiment-chart";

const ChartTabs = ({ priceData, newsData }) => {
    return (
        <Tabs align="end" colorScheme="gray" size="sm" w="100%" h="100%" isLazy>
            <TabList>
                <Tab>Monthly Adjusted Price</Tab>
                <Tab>News Sentiment &#47; Article</Tab>
            </TabList>

            <Box w="100%" h="calc(100% - 31px)">
                <TabPanels h="100%">
                    <TabPanel pt={3} h="100%">
                        {priceData && <PriceChart data={priceData} />}
                    </TabPanel>
                    <TabPanel pt={3} h="100%">
                        {newsData && <SentimentChart data={newsData} />}
                    </TabPanel>
                </TabPanels>
            </Box>
        </Tabs>
    );
};

export default ChartTabs;
