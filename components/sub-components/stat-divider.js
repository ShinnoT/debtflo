import { StackDivider, useColorModeValue, Stack } from "@chakra-ui/react";

const MainStatsDivider = ({ children }) => {
    return (
        <Stack
            divider={
                <StackDivider
                    borderColor={useColorModeValue("gray.200", "gray.600")}
                />
            }
            spacing={4}
            align="stretch"
            direction="column"
        >
            {children}
        </Stack>
    );
};

export default MainStatsDivider;
