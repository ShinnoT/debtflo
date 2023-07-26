import {
    Box,
    GridItem,
    useColorModeValue,
    Heading,
    Link,
    Text,
    Divider,
    Stack,
    StackDivider,
    Skeleton,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

import MainStatsDivider from "./stat-divider";
import Card from "./card";
import { NEWS_SENTIMENT } from "@/lib/sample-data";
import { useSearch } from "@/context/search";
import { useLoaded } from "@/context/loading";

const NewsItem = ({ data }) => {
    const { globalLoaded } = useLoaded();

    const formattedDate = (date) => {
        const year = date.slice(0, 4);
        const month = date.slice(4, 6);
        const day = date.slice(6, 8);
        return `${year}-${month}-${day}`;
    };

    return (
        <Card rowSpan={{ base: 4, lg: 10 }} colSpan={{ base: 2, lg: 3 }}>
            <Heading
                as="h2"
                size="md"
                textAlign="center"
                mb={4}
                variant="section-title"
            >
                News
            </Heading>
            <Skeleton
                isLoaded={globalLoaded}
                fadeDuration={1}
                startColor="green.400"
                endColor="pink.400"
                // height="100%"
                minHeight="90%"
            >
                <MainStatsDivider>
                    {data &&
                        data?.NEWS?.data?.feed.map((article, i) => (
                            <Stack
                                direction="column"
                                key={uuidv4()}
                                align="stretch"
                                spacing={0}
                            >
                                <Heading key={uuidv4()} as="h3" size="sm">
                                    {article?.title}
                                </Heading>
                                <Text
                                    key={uuidv4()}
                                    fontSize="xs"
                                    fontStyle="italic"
                                >
                                    {formattedDate(article["time_published"])}
                                </Text>
                                <Link
                                    fontSize="xs"
                                    href={article?.url}
                                    display="flex"
                                    alignItems="center"
                                    key={uuidv4()}
                                >
                                    Article Link{" "}
                                    <ExternalLinkIcon
                                        key={uuidv4()}
                                        boxSize={2}
                                        ml={1}
                                    />
                                </Link>
                                <Text key={uuidv4()} fontSize="xs">
                                    {article?.summary}
                                </Text>
                            </Stack>
                        ))}
                </MainStatsDivider>
            </Skeleton>
        </Card>
    );
};

export default NewsItem;
