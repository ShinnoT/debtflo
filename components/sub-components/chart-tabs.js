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

const ChartTabs = ({ data }) => {
    return (
        <Tabs align="end" colorScheme="gray" size="sm" w="100%" h="100%" isLazy>
            <TabList>
                <Tab>Monthly Adjusted Price</Tab>
                <Tab>News Sentiment</Tab>
                <Tab>Three</Tab>
            </TabList>

            <Box w="100%" h="calc(100% - 31px)">
                <TabPanels h="100%">
                    <TabPanel pt={3} h="100%">
                        {data && <PriceChart data={data} />}
                    </TabPanel>
                    <TabPanel pt={3} h="100%">
                        {data && <PriceChart data={data} />}
                    </TabPanel>
                    <TabPanel pt={3} h="100%">
                        <p>three!</p>
                    </TabPanel>
                </TabPanels>
            </Box>
        </Tabs>
    );
};

export default ChartTabs;
