import { Button, useColorMode } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";

const ToggleButton = ({}) => {
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <Button size="sm" onClick={() => toggleColorMode()}>
            {colorMode === "light" ? <SunIcon /> : <MoonIcon />}
        </Button>
    );
};

export default ToggleButton;
