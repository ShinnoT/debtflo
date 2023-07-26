import {
    Heading,
    Skeleton,
    Stat,
    StatArrow,
    StatHelpText,
    StatLabel,
    StatNumber,
} from "@chakra-ui/react";

import { useLoaded } from "@/context/loading";
import Card from "./card";
import MainStatsDivider from "./stat-divider";

const BasicStats = ({ data }) => {
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
                            {data && data?.OVERVIEW?.data["50DayMovingAverage"]}
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
                            {data && data?.OVERVIEW?.data["AnalystTargetPrice"]}
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
        </Card>
    );
};

export default BasicStats;
