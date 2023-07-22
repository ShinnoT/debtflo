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

const KeyDates = ({ data }) => {
    const { globalLoaded } = useLoaded();

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
                {/* {companyMeta && ( */}
                <MainStatsDivider>
                    <Stack direction="column" align="stretch" spacing={0}>
                        <Skeleton
                            isLoaded={globalLoaded}
                            fadeDuration={1}
                            startColor="green.400"
                            endColor="pink.400"
                        >
                            <Heading as="h3" size="sm">
                                Latest Quarter
                            </Heading>
                            <Text fontSize="xs">
                                {data && data?.OVERVIEW?.data["LatestQuarter"]}
                            </Text>
                        </Skeleton>
                    </Stack>

                    <Stack direction="column" align="stretch" spacing={0}>
                        <Skeleton
                            isLoaded={globalLoaded}
                            fadeDuration={1}
                            startColor="green.400"
                            endColor="pink.400"
                        >
                            <Heading as="h3" size="sm">
                                Dividend Date
                            </Heading>
                            <Text fontSize="xs">
                                {data && data?.OVERVIEW?.data["DividendDate"]}
                            </Text>
                        </Skeleton>
                    </Stack>

                    <Stack direction="column" align="stretch" spacing={0}>
                        <Skeleton
                            isLoaded={globalLoaded}
                            fadeDuration={1}
                            startColor="green.400"
                            endColor="pink.400"
                        >
                            <Heading as="h3" size="sm">
                                Ex Dividend Date
                            </Heading>
                            <Text fontSize="xs">
                                {data && data?.OVERVIEW?.data["ExDividendDate"]}
                            </Text>
                        </Skeleton>
                    </Stack>

                    <Stack direction="column" align="stretch" spacing={0}>
                        <Skeleton
                            isLoaded={globalLoaded}
                            fadeDuration={1}
                            startColor="green.400"
                            endColor="pink.400"
                        >
                            <Heading as="h3" size="sm">
                                Fiscal Year End
                            </Heading>
                            <Text fontSize="xs">
                                {data && data?.OVERVIEW?.data["FiscalYearEnd"]}
                            </Text>
                        </Skeleton>
                    </Stack>
                </MainStatsDivider>
            </Box>
        </GridItem>
    );
};

export default KeyDates;
