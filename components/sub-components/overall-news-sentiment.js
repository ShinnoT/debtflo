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
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";

import MainStatsDivider from "./stat-divider";
import { NEWS_SENTIMENT } from "@/lib/sample-data";
import { TriangleUpIcon } from "@chakra-ui/icons";

const OverallNewsSentiment = () => {
    const [sentimentScore, setSentimentScore] = useState(null);
    const [sentimentLabel, setSentimentLabel] = useState(null);

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
            const avgSentimentScore = calculateSentimentScore(feed);
            const sentimentLabelString =
                generateSentimentLabel(avgSentimentScore);
            console.log(sentimentLabelString);
            setSentimentScore(avgSentimentScore) ||
                setSentimentLabel(sentimentLabelString);
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
                <Stat>
                    <StatNumber>
                        {sentimentScore}
                        {/* <TriangleUpIcon
                            color={sentimentScore > 0 ? "green.400" : "red.400"}
                        /> */}
                    </StatNumber>
                    <StatHelpText>
                        {sentimentLabel}{" "}
                        {sentimentLabel !== "Neutral" && (
                            <StatArrow
                                type={
                                    sentimentScore > 0 ? "increase" : "decrease"
                                }
                            />
                        )}
                    </StatHelpText>
                </Stat>
            </Box>
        </GridItem>
    );
};

export default OverallNewsSentiment;
