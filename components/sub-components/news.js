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
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

import MainStatsDivider from "./stat-divider";
import { NEWS_SENTIMENT } from "@/lib/sample-data";

const NewsItem = () => {
    const [newsArticles, setNewsArticles] = useState(null);

    const formattedDate = (date) => {
        const year = date.slice(0, 4);
        const month = date.slice(4, 6);
        const day = date.slice(6, 8);
        return `${year}-${month}-${day}`;
    };

    const fetchNewsArticles = async () => {
        const url = "https://www.alphavantage.co/query";
        const apikey = process.env.ALPHAVANTAGE_API_KEY;
        const config = {
            params: {
                apikey,
                function: "NEWS_SENTIMENT",
                tickers: "AAPL",
                limit: 20,
            },
        };
        try {
            // TODO: replace mock data with actual API call
            // const res = await axios.get(url, config);
            // const { feed } = res?.data;
            const { feed } = NEWS_SENTIMENT;
            setNewsArticles(feed);
        } catch (error) {
            console.log(error?.response?.data?.error);
        }
    };

    useEffect(() => {
        fetchNewsArticles();
    }, []);

    return (
        <GridItem
            borderRadius={2}
            rowSpan={10}
            colSpan={3}
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
                    News
                </Heading>
                <MainStatsDivider>
                    {newsArticles &&
                        newsArticles.map((article, i) => (
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
            </Box>
        </GridItem>
    );
};

export default NewsItem;
