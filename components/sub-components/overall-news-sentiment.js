import {
    Heading,
    Skeleton,
    Stat,
    StatArrow,
    StatHelpText,
    StatNumber,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { useLoaded } from "@/context/loading";
import Card from "./card";

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
                Overall Sentiment
            </Heading>
            <Skeleton
                isLoaded={globalLoaded}
                fadeDuration={1}
                startColor="green.400"
                endColor="pink.400"
            >
                <Stat>
                    <StatNumber>{sentimentScore || "Placeholder"}</StatNumber>
                    <StatHelpText>
                        {sentimentLabel || "Placeholder"}{" "}
                        {sentimentLabel && sentimentLabel !== "Neutral" && (
                            <StatArrow
                                type={
                                    sentimentScore > 0 ? "increase" : "decrease"
                                }
                            />
                        )}
                    </StatHelpText>
                    <Text
                        fontSize="10px"
                        color={useColorModeValue("gray.500", "gray.400")}
                        fontStyle="italic"
                    >
                        ** calculated simply by averaging sentiment scores of
                        all news articles fetched from API
                    </Text>
                </Stat>
            </Skeleton>
        </Card>
    );
};

export default OverallNewsSentiment;
