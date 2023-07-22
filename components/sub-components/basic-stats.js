import {
    GridItem,
    useColorModeValue,
    Box,
    Heading,
    Text,
    Flex,
    Stat,
    StatLabel,
    StatGroup,
    StatNumber,
    StatHelpText,
    StatArrow,
    Divider,
    Stack,
    StackDivider,
    Skeleton,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";

import MainStatsDivider from "./stat-divider";
import { OVERVIEW } from "@/lib/sample-data";
import { useSearch } from "@/context/search";
import { useLoaded } from "@/context/loading";
import { useGlobalError } from "@/context/error";
import callAPI from "@/lib/handle-api";

const BasicStats = ({ data }) => {
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
                    Company Stats
                </Heading>

                {/* {companyStats && ( */}
                <MainStatsDivider>
                    <Stat>
                        <Skeleton
                            isLoaded={globalLoaded}
                            fadeDuration={1}
                            startColor="green.400"
                            endColor="pink.400"
                        >
                            <StatLabel>50 Day Moving Average</StatLabel>
                            <StatNumber>
                                {data &&
                                    data?.OVERVIEW?.data["50DayMovingAverage"]}
                            </StatNumber>
                            <StatHelpText>
                                <StatArrow type="increase" />
                                23.36%
                            </StatHelpText>
                        </Skeleton>
                    </Stat>

                    <Stat>
                        <Skeleton
                            isLoaded={globalLoaded}
                            fadeDuration={1}
                            startColor="green.400"
                            endColor="pink.400"
                        >
                            <StatLabel>Analyst Target Price</StatLabel>
                            <StatNumber>
                                {data &&
                                    data?.OVERVIEW?.data["AnalystTargetPrice"]}
                            </StatNumber>
                            <StatHelpText>
                                <StatArrow type="decrease" />
                                9.05%
                            </StatHelpText>
                        </Skeleton>
                    </Stat>

                    <Stat>
                        <Skeleton
                            isLoaded={globalLoaded}
                            fadeDuration={1}
                            startColor="green.400"
                            endColor="pink.400"
                        >
                            <StatLabel>PE Ratio</StatLabel>
                            <StatNumber>
                                {data && data?.OVERVIEW?.data["PERatio"]}
                            </StatNumber>
                        </Skeleton>
                    </Stat>
                </MainStatsDivider>
            </Box>
        </GridItem>
    );
};

export default BasicStats;
