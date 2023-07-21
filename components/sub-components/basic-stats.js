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
import { OVERVIEW } from "@/lib/sample-data";

const BasicStats = () => {
    const [companyStats, setCompanyStats] = useState(null);

    const fetchStats = async () => {
        const url = "https://www.alphavantage.co/query";
        const apikey = process.env.ALPHAVANTAGE_API_KEY;
        const config = {
            params: {
                apikey,
                function: "OVERVIEW",
                symbol: "AAPL",
                datatype: "json",
            },
        };
        try {
            // TODO: replace mock data with actual API call
            // const res = await axios.get(url, config);
            // const { data } = res;
            const data = OVERVIEW;
            setCompanyStats(data);
        } catch (error) {
            // TODO: check API docs again to see error output for better handling
            console.log(error);
        }
    };

    useEffect(() => {
        fetchStats();
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
                    Company Stats
                </Heading>
                {companyStats && (
                    <MainStatsDivider>
                        <Stat>
                            <StatLabel>50 Day Moving Average</StatLabel>
                            <StatNumber>
                                {companyStats["50DayMovingAverage"]}
                            </StatNumber>
                            <StatHelpText>
                                <StatArrow type="increase" />
                                23.36%
                            </StatHelpText>
                        </Stat>

                        <Stat>
                            <StatLabel>Analyst Target Price</StatLabel>
                            <StatNumber>
                                {companyStats["AnalystTargetPrice"]}
                            </StatNumber>
                            <StatHelpText>
                                <StatArrow type="decrease" />
                                9.05%
                            </StatHelpText>
                        </Stat>

                        <Stat>
                            <StatLabel>PE Ratio</StatLabel>
                            <StatNumber>{companyStats["PERatio"]}</StatNumber>
                        </Stat>
                    </MainStatsDivider>
                )}
            </Box>
        </GridItem>
    );
};

// const BasicStats = () => {
//     const [companyStats, setCompanyStats] = useState(null);

//     const fetchStats = async () => {
//         const url = "https://www.alphavantage.co/query";
//         const apikey = process.env.ALPHAVANTAGE_API_KEY;
//         const config = {
//             params: {
//                 apikey,
//                 function: "OVERVIEW",
//                 symbol: "AAPL",
//                 datatype: "json",
//             },
//         };
//         try {
//             const res = await axios.get(url, config);
//             const { data } = res;
//             setCompanyStats(data);
//             console.log(res);
//         } catch (error) {
//             // TODO: check API docs again to see error output for better handling
//             console.log(error);
//         }
//     };

//     useEffect(() => {
//         fetchStats();
//     }, []);

//     return (
//         <GridItem
//             borderRadius={2}
//             colSpan={2}
//             rowSpan={4}
//             // boxShadow="base"
//             border="1px"
//             borderColor={useColorModeValue("gray.200", "gray.600")}
//             bg={useColorModeValue("#E3F4F4", "#393646")}
//             p={2}
//         >
//             <Box
//                 py={2}
//                 px={2}
//                 bg={useColorModeValue("#E3F4F4", "#393646")}
//                 h={0}
//                 minH="100%"
//                 overflowY="auto"
//             >
//                 {companyStats && (
//                     <Stack
//                         divider={
//                             <StackDivider
//                                 borderColor={useColorModeValue(
//                                     "gray.200",
//                                     "gray.600"
//                                 )}
//                             />
//                         }
//                         spacing={4}
//                         align="stretch"
//                         direction="column"
//                     >
//                         <Stat>
//                             <StatLabel>50 Day Moving Average</StatLabel>
//                             <StatNumber>
//                                 {companyStats["50DayMovingAverage"]}
//                             </StatNumber>
//                             <StatHelpText>
//                                 <StatArrow type="increase" />
//                                 23.36%
//                             </StatHelpText>
//                         </Stat>

//                         <Stat>
//                             <StatLabel>Analyst Target Price</StatLabel>
//                             <StatNumber>
//                                 {companyStats["AnalystTargetPrice"]}
//                             </StatNumber>
//                             <StatHelpText>
//                                 <StatArrow type="decrease" />
//                                 9.05%
//                             </StatHelpText>
//                         </Stat>

//                         <Stat>
//                             <StatLabel>PE Ratio</StatLabel>
//                             <StatNumber>{companyStats["PERatio"]}</StatNumber>
//                         </Stat>
//                     </Stack>
//                 )}
//             </Box>
//         </GridItem>
//     );
// };

export default BasicStats;
