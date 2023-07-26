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
import Card from "./card";
import { OVERVIEW } from "@/lib/sample-data";
import { useSearch } from "@/context/search";
import { useLoaded } from "@/context/loading";

const MetaData = ({ data }) => {
    const { globalLoaded } = useLoaded();

    return (
        <Card
            rowSpan={{ base: 1, md: 2, lg: 4 }}
            colSpan={{ base: 2, md: 1, lg: 2 }}
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
                        isLoaded={globalLoaded}
                        fadeDuration={1}
                        startColor="green.400"
                        endColor="pink.400"
                    >
                        <Heading as="h3" size="sm">
                            Company Name
                        </Heading>
                        <Text fontSize="xs">
                            {data && data?.OVERVIEW?.data["Name"]}
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
                            Description
                        </Heading>
                        <Text fontSize="xs">
                            {data && data?.OVERVIEW?.data["Description"]}
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
                            Symbol
                        </Heading>
                        <Text fontSize="xs">
                            {data && data?.OVERVIEW?.data["Symbol"]}
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
                            Exchange
                        </Heading>
                        <Text fontSize="xs">
                            {data && data?.OVERVIEW?.data["Exchange"]}
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
                            Currency
                        </Heading>
                        <Text fontSize="xs">
                            {data && data?.OVERVIEW?.data["Currency"]}
                        </Text>
                    </Skeleton>
                </Stack>
            </MainStatsDivider>
        </Card>
    );
};

export default MetaData;
