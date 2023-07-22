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
import { NEWS_SENTIMENT } from "@/lib/sample-data";
import { TriangleUpIcon } from "@chakra-ui/icons";
import { useSearch } from "@/context/search";
import { useLoaded } from "@/context/loading";

const OverallNewsSentiment = () => {
    const { search } = useSearch();
    const [sentimentScore, setSentimentScore] = useState(null);
    const [sentimentLabel, setSentimentLabel] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const { setGlobalLoaded } = useLoaded();

    const calculateSentimentScore = (feed) => {
        const sentimentArr = feed.map(
            (article) => article["overall_sentiment_score"]
        );
        const sum = sentimentArr.reduce((a, b) => a + b, 0);
        const avg = sum / sentimentArr.length || 0;
        return avg.toFixed(4);
    };

    const generateSentimentLabel = (avgScore) => {
        // "x <= -0.35: Bearish; -0.35 < x <= -0.15: Somewhat-Bearish; -0.15 < x < 0.15: Neutral; 0.15 <= x < 0.35: Somewhat_Bullish; x >= 0.35: Bullish"
        if (avgScore <= -0.35) return "Bearish";
        if (-0.35 < avgScore && avgScore <= -0.15) return "Somewhat-Bearish";
        if (-0.15 < avgScore && avgScore < 0.15) return "Neutral";
        if (0.15 <= avgScore && avgScore < 0.35) return "Somewhat Bullish";
        if (avgScore >= 0.35) return "Bullish";
    };

    const fetchNewsArticles = async () => {
        setIsLoaded(false);
        setGlobalLoaded((prev) => ({ ...prev, sentimentScore: false }));
        console.log("OVERALL NEWS SENTIMENT - searching for... ", search);
        const url = "https://www.alphavantage.co/query";
        const apikey = process.env.ALPHAVANTAGE_API_KEY;
        const config = {
            params: {
                apikey,
                function: "NEWS_SENTIMENT",
                tickers: search,
                limit: 20,
            },
        };
        try {
            // TODO: replace mock data with actual API call
            const res = await axios.get(url, config);
            const { feed } = res?.data;
            // const { feed } = NEWS_SENTIMENT;
            const avgSentimentScore = calculateSentimentScore(feed);
            const sentimentLabelString =
                generateSentimentLabel(avgSentimentScore);
            setSentimentScore(avgSentimentScore) ||
                setSentimentLabel(sentimentLabelString);

            setTimeout(() => {
                setIsLoaded(true);
                setGlobalLoaded((prev) => ({ ...prev, sentimentScore: true }));
            }, 10000);
        } catch (error) {
            // TODO: check API docs again to see error output for better handling
            console.log(error);
            setIsLoaded(false);
            setGlobalLoaded((prev) => ({ ...prev, sentimentScore: false }));
        }
    };

    useEffect(() => {
        if (search) fetchNewsArticles();
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
            >
                <Heading
                    as="h2"
                    size="md"
                    textAlign="center"
                    mb={4}
                    variant="section-title"
                >
                    Overall Sentiment
                </Heading>
                <Skeleton
                    isLoaded={isLoaded}
                    fadeDuration={1}
                    startColor="green.400"
                    endColor="pink.400"
                >
                    <Stat>
                        <StatNumber>
                            {sentimentScore || "Placeholder"}
                        </StatNumber>
                        <StatHelpText>
                            {sentimentLabel || "Placeholder"}{" "}
                            {sentimentLabel && sentimentLabel !== "Neutral" && (
                                <StatArrow
                                    type={
                                        sentimentScore > 0
                                            ? "increase"
                                            : "decrease"
                                    }
                                />
                            )}
                        </StatHelpText>
                    </Stat>
                </Skeleton>
            </Box>
        </GridItem>
    );
};

export default OverallNewsSentiment;
