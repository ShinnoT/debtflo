import { background, useColorModeValue, Heading } from "@chakra-ui/react";
import {
    LineChart,
    Line,
    Tooltip,
    XAxis,
    YAxis,
    ResponsiveContainer,
    Legend,
    CartesianGrid,
    Text,
    Label,
} from "recharts";

const PriceChart = ({ data }) => {
    const intData =
        data &&
        data
            .map((priceData) => ({
                // ...priceData,
                close: +priceData["4. close"],
                open: +priceData["1. open"],
                high: +priceData["2. high"],
                low: +priceData["3. low"],
                adjusted_close: +priceData["5. adjusted close"],
                volume: +priceData["6. volume"],
                date: priceData["date"].slice(0, 7),
                // date: new Date(priceData["date"]),
            }))
            .reverse();

    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart
                data={intData}
                margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                title="Monthly Adjusted Close Price"
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                    dataKey="date"
                    // angle={30}
                    interval="preserveStartEnd"
                    // padding="gap"
                    style={{
                        fontSize: "8px",
                        // fontFamily: 'Times New Roman',
                    }}
                >
                    <Label
                        value="Date"
                        offset={0}
                        position="insideBottomRight"
                        style={{
                            fontSize: "12px",
                            // fontFamily: 'Times New Roman',
                        }}
                    />
                </XAxis>
                <YAxis
                    style={{ fontSize: "8px" }}
                    unit="$"
                    interval="preserveStartEnd"
                    // tickCount={3}
                    // scale="linear"
                >
                    <Label
                        value="Price"
                        offset={0}
                        position="insideTopLeft"
                        style={{
                            fontSize: "12px",
                            // fontFamily: 'Times New Roman',
                        }}
                    />
                </YAxis>
                <Tooltip
                    contentStyle={{
                        backgroundColor: useColorModeValue(
                            "#E3F4F4",
                            "#393646"
                        ),
                        borderRadius: "2px",
                    }}
                    // wrapperStyle={{
                    //     color: "#393646",
                    // }}
                    itemStyle={{
                        fontStyle: "italic",
                    }}
                />
                <Legend />
                {/* <Line
                    type="monotone"
                    dot={false}
                    dataKey="high"
                    stroke="#8884d8"
                    animationDuration={3000}
                />
                <Line
                    type="monotone"
                    dot={false}
                    dataKey="low"
                    stroke="#82ca9d"
                    animationDuration={3000}
                /> */}
                <Line
                    type="monotone"
                    dot={false}
                    dataKey="adjusted_close"
                    stroke={useColorModeValue("#413ea0", "#39FF14")}
                    animationDuration={3000}
                />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default PriceChart;
