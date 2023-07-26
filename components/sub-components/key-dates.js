import { Heading, Skeleton, Stack, Text } from "@chakra-ui/react";

import { useLoaded } from "@/context/loading";
import Card from "./card";
import MainStatsDivider from "./stat-divider";

const KeyDates = ({ data }) => {
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
                Key Dates
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
                            Latest Quarter
                        </Heading>
                        <Text fontSize="xs">
                            {data && data?.OVERVIEW?.data["LatestQuarter"]}
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
                            Dividend Date
                        </Heading>
                        <Text fontSize="xs">
                            {data && data?.OVERVIEW?.data["DividendDate"]}
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
                            Ex Dividend Date
                        </Heading>
                        <Text fontSize="xs">
                            {data && data?.OVERVIEW?.data["ExDividendDate"]}
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
                            Fiscal Year End
                        </Heading>
                        <Text fontSize="xs">
                            {data && data?.OVERVIEW?.data["FiscalYearEnd"]}
                        </Text>
                    </Skeleton>
                </Stack>
            </MainStatsDivider>
        </Card>
    );
};

export default KeyDates;
