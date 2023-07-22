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

const OverallNewsSentiment = ({ data }) => {
    const { globalLoaded } = useLoaded();
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

    const calcSentiment = async () => {
        const avgSentimentScore = calculateSentimentScore(
            data?.NEWS?.data?.feed
        );
        const sentimentLabelString = generateSentimentLabel(avgSentimentScore);
        setSentimentScore(avgSentimentScore) ||
            setSentimentLabel(sentimentLabelString);
    };

    useEffect(() => {
        if (data) calcSentiment();
    }, [data]);

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
                    isLoaded={globalLoaded}
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
