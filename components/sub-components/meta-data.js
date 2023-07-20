import {
    GridItem,
    useColorModeValue,
    Box,
    Heading,
    Text,
    Flex,
    Divider,
    Stack,
    StackDivider,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import MainStatsDivider from "./stat-divider";

const MetaData = () => {
    const [companyMeta, setCompanyMeta] = useState(null);

    const fetchCompanyMeta = async () => {
        const url = "https://api.marketaux.com/v1/entity/search";
        const api_token = process.env.MARKETAUX_API_KEY;
        const config = {
            params: {
                api_token,
                symbols: "AAPL",
            },
        };
        try {
            const res = await axios.get(url, config);
            const { data, meta } = res?.data;
            setCompanyMeta(data);
            console.log(data);
        } catch (error) {
            console.log(error?.response?.data?.error);
        }
    };

    useEffect(() => {
        fetchCompanyMeta();
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
                // wrap="wrap"
                // gap={7}
                // justify="space-evenly"
                // align="stretch"
                // alignContent="stretch"
            >
                <MainStatsDivider>
                    {companyMeta &&
                        companyMeta.map((company, i) => (
                            <Stack
                                direction="column"
                                key={uuidv4()}
                                align="stretch"
                                spacing={0}
                            >
                                <Heading key={uuidv4()} as="h3" size="sm">
                                    {company?.name}
                                </Heading>
                                <Text fontSize="xs" key={uuidv4()}>
                                    Symbol: {company?.symbol}
                                </Text>
                                <Text key={uuidv4()} fontSize="xs">
                                    Type: {company?.type}
                                </Text>
                                <Text key={uuidv4()} fontSize="xs">
                                    Industry: {company?.industry}
                                </Text>
                                <Text key={uuidv4()} fontSize="xs">
                                    Exchange: {company?.exchange}
                                </Text>
                                <Text key={uuidv4()} fontSize="xs">
                                    Country: {company?.country}
                                </Text>
                            </Stack>
                        ))}
                </MainStatsDivider>
            </Box>
        </GridItem>
    );
};

export default MetaData;
