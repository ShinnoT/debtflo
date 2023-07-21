import {
    GridItem,
    useColorModeValue,
    Box,
    Heading,
    Text,
    Flex,
    Divider,
    Stack,
    StackDivider,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

import MainStatsDivider from "./stat-divider";
import { OVERVIEW } from "@/lib/sample-data";

const KeyDates = () => {
    const [companyMeta, setCompanyMeta] = useState(null);

    // TODO: change below to fetch from alphavantage OVERVIEW as well
    const fetchCompanyMeta = async () => {
        const url = "https://api.marketaux.com/v1/entity/search";
        const api_token = process.env.MARKETAUX_API_KEY;
        const config = {
            params: {
                api_token,
                symbols: "AAPL",
            },
        };
        try {
            // TODO: replace mock data with actual API call
            // const res = await axios.get(url, config);
            // const { data, meta } = res?.data;
            const data = OVERVIEW;
            setCompanyMeta(data);
        } catch (error) {
            console.log(error?.response?.data?.error);
        }
    };

    useEffect(() => {
        fetchCompanyMeta();
    }, []);

    return (
        <GridItem
            borderRadius={2}
            colSpan={2}
            rowSpan={4}
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
                <Heading
                    as="h2"
                    size="md"
                    textAlign="center"
                    mb={4}
                    variant="section-title"
                >
                    Key Dates
                </Heading>
                {companyMeta && (
                    <MainStatsDivider>
                        <Stack direction="column" align="stretch" spacing={0}>
                            <Heading as="h3" size="sm">
                                Latest Quarter
                            </Heading>
                            <Text fontSize="xs">
                                {companyMeta["LatestQuarter"]}
                            </Text>
                        </Stack>

                        <Stack direction="column" align="stretch" spacing={0}>
                            <Heading as="h3" size="sm">
                                Dividend Date
                            </Heading>
                            <Text fontSize="xs">
                                {companyMeta["DividendDate"]}
                            </Text>
                        </Stack>

                        <Stack direction="column" align="stretch" spacing={0}>
                            <Heading as="h3" size="sm">
                                Ex Dividend Date
                            </Heading>
                            <Text fontSize="xs">
                                {companyMeta["ExDividendDate"]}
                            </Text>
                        </Stack>

                        <Stack direction="column" align="stretch" spacing={0}>
                            <Heading as="h3" size="sm">
                                Fiscal Year End
                            </Heading>
                            <Text fontSize="xs">
                                {companyMeta["FiscalYearEnd"]}
                            </Text>
                        </Stack>
                    </MainStatsDivider>
                )}
            </Box>
        </GridItem>
    );
};

export default KeyDates;
