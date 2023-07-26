import { Box, GridItem, useColorModeValue } from "@chakra-ui/react";

const Card = ({ children, rowSpan, colSpan }) => {
    return (
        <GridItem
            borderRadius={2}
            rowSpan={rowSpan}
            colSpan={colSpan}
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
                {children}
            </Box>
        </GridItem>
    );
};

export default Card;
