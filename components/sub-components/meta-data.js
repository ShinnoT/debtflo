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
    Skeleton,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

import MainStatsDivider from "./stat-divider";
import { OVERVIEW } from "@/lib/sample-data";
import { useSearch } from "@/context/search";
import { useLoaded } from "@/context/loading";

const MetaData = () => {
    const { search } = useSearch();
    const [companyMeta, setCompanyMeta] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const { setGlobalLoaded } = useLoaded();

    // TODO: change below to fetch from alphavantage OVERVIEW as well
    const fetchCompanyMeta = async () => {
        setIsLoaded(false);
        setGlobalLoaded((prev) => ({ ...prev, metaData: false }));
        console.log("META DATA - searching for... ", search);
        const url = "https://www.alphavantage.co/query";
        const apikey = process.env.ALPHAVANTAGE_API_KEY;
        const config = {
            params: {
                apikey,
                function: "OVERVIEW",
                symbol: search,
                datatype: "json",
            },
        };
        try {
            // TODO: replace mock data with actual API call
            const res = await axios.get(url, config);
            const { data, meta } = res;
            // const data = OVERVIEW;
            setCompanyMeta(data);
            setTimeout(() => {
                setIsLoaded(true);
                setGlobalLoaded((prev) => ({ ...prev, metaData: true }));
            }, 10000);
        } catch (error) {
            // TODO: check API docs again to see error output for better handling
            console.log(error);
            setIsLoaded(false);
            setGlobalLoaded((prev) => ({ ...prev, metaData: false }));
        }
    };

    useEffect(() => {
        if (search) fetchCompanyMeta();
    }, [search]);

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
                // wrap="wrap"
                // gap={7}
                // justify="space-evenly"
                // align="stretch"
                // alignContent="stretch"
            >
                <Heading
                    as="h2"
                    size="md"
                    textAlign="center"
                    mb={4}
                    variant="section-title"
                >
                    Company MetaData
                </Heading>
                {/* {companyMeta && ( */}
                <MainStatsDivider>
                    <Stack direction="column" align="stretch" spacing={0}>
                        <Skeleton
                            isLoaded={isLoaded}
                            fadeDuration={1}
                            startColor="green.400"
                            endColor="pink.400"
                        >
                            <Heading as="h3" size="sm">
                                Company Name
                            </Heading>
                            <Text fontSize="xs">
                                {companyMeta && companyMeta["Name"]}
                            </Text>
                        </Skeleton>
                    </Stack>

                    <Stack direction="column" align="stretch" spacing={0}>
                        <Skeleton
                            isLoaded={isLoaded}
                            fadeDuration={1}
                            startColor="green.400"
                            endColor="pink.400"
                        >
                            <Heading as="h3" size="sm">
                                Description
                            </Heading>
                            <Text fontSize="xs">
                                {companyMeta && companyMeta["Description"]}
                            </Text>
                        </Skeleton>
                    </Stack>

                    <Stack direction="column" align="stretch" spacing={0}>
                        <Skeleton
                            isLoaded={isLoaded}
                            fadeDuration={1}
                            startColor="green.400"
                            endColor="pink.400"
                        >
                            <Heading as="h3" size="sm">
                                Symbol
                            </Heading>
                            <Text fontSize="xs">
                                {companyMeta && companyMeta["Symbol"]}
                            </Text>
                        </Skeleton>
                    </Stack>

                    <Stack direction="column" align="stretch" spacing={0}>
                        <Skeleton
                            isLoaded={isLoaded}
                            fadeDuration={1}
                            startColor="green.400"
                            endColor="pink.400"
                        >
                            <Heading as="h3" size="sm">
                                Exchange
                            </Heading>
                            <Text fontSize="xs">
                                {companyMeta && companyMeta["Exchange"]}
                            </Text>
                        </Skeleton>
                    </Stack>

                    <Stack direction="column" align="stretch" spacing={0}>
                        <Skeleton
                            isLoaded={isLoaded}
                            fadeDuration={1}
                            startColor="green.400"
                            endColor="pink.400"
                        >
                            <Heading as="h3" size="sm">
                                Currency
                            </Heading>
                            <Text fontSize="xs">
                                {companyMeta && companyMeta["Currency"]}
                            </Text>
                        </Skeleton>
                    </Stack>
                </MainStatsDivider>
            </Box>
        </GridItem>
    );
};

export default MetaData;
