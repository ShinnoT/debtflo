import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Button, useColorMode } from "@chakra-ui/react";

const ToggleButton = ({}) => {
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <Button size="sm" onClick={() => toggleColorMode()}>
            {colorMode === "light" ? <SunIcon /> : <MoonIcon />}
        </Button>
    );
};

export default ToggleButton;
