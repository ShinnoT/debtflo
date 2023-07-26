import { Flex, Heading, useColorModeValue } from "@chakra-ui/react";
import ToggleButton from "./sub-components/theme-toggle";

const NavBar = () => {
    return (
        <Flex
            h="50px"
            w="full"
            justify="space-between"
            align="center"
            px={4}
            position="fixed"
            top={0}
            left={0}
            backgroundColor={useColorModeValue("#E3F4F4", "#393646")}
            // opacity={1}
            zIndex={1}
            // backgroundColor="rgba(255,
            // 255, 255, 0.8)"
            // opacity={0.9}
            // backdropFilter="saturate(200%) blur(10px)"
        >
            <Heading as="h3" size="sm">
                DEBTFLO
            </Heading>
            <ToggleButton />
        </Flex>
    );
};

export default NavBar;
