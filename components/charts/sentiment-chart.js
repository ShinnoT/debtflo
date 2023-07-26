import { background, useColorModeValue, Heading } from "@chakra-ui/react";
import {
    LineChart,
    BarChart,
    Bar,
    Line,
    Tooltip,
    XAxis,
    YAxis,
    ResponsiveContainer,
    Legend,
    CartesianGrid,
    Text,
    Label,
    ReferenceArea,
} from "recharts";

const SentimentChart = ({ data }) => {
    const formattedDate = (date) => {
        const year = date.slice(0, 4);
        const month = date.slice(4, 6);
        const day = date.slice(6, 8);
        return `${year}-${month}-${day}`;
    };

    const intData =
        data &&
        data
            .map((newsData) => ({
                sentiment_score: newsData["overall_sentiment_score"],
                date: formattedDate(newsData["time_published"]),
                source: newsData["source"],
            }))
            .sort((n1, n2) =>
                n1.date < n2.date ? 1 : n1.date > n2.date ? -1 : 0
            )
            .reverse();

    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart
                data={intData}
                margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                title="News Sentiment Score"
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis hide dataKey="source" />
                <YAxis
                    style={{ fontSize: "8px" }}
                    interval="preserveStartEnd"
                />
                <Tooltip
                    contentStyle={{
                        backgroundColor: useColorModeValue(
                            "#E3F4F4",
                            "#393646"
                        ),
                        borderRadius: "2px",
                    }}
                    itemStyle={{ fontStyle: "italic" }}
                />
                <Legend />
                <Bar
                    type="monotone"
                    dot={false}
                    dataKey="sentiment_score"
                    stroke={useColorModeValue("#413ea0", "#39FF14")}
                    fill={useColorModeValue("#413ea0", "#39FF14")}
                    animationDuration={3000}
                />
                <ReferenceArea
                    y1={0}
                    // y2={Math.max.apply(Math, sentimentScore)}
                    y2={1}
                    stroke="blue"
                    strokeOpacity={0.3}
                    fill="blue"
                    fillOpacity={0.1}
                    ifOverflow="hidden"
                />
                <ReferenceArea
                    y1={0}
                    // y2={Math.min.apply(Math, sentimentScore)}
                    y2={-1}
                    stroke="red"
                    strokeOpacity={0.3}
                    fill="red"
                    fillOpacity={0.1}
                    ifOverflow="hidden"
                />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default SentimentChart;
