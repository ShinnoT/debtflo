import { Flex, Box, Heading } from "@chakra-ui/react";
import ToggleButton from "./sub-components/theme-toggle";

const NavBar = () => {
    return (
        <Flex h="50px" w="full" justify="space-between" align="center" px={4}>
            <Heading as="h3" size="sm">
                DEBTFLO
            </Heading>
            <ToggleButton />
        </Flex>
    );
};

export default NavBar;
