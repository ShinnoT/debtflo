import {
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    FormControl,
    Button,
    useColorModeValue,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

import { useEffect, useState } from "react";

import { useLoaded } from "@/context/loading";
import { useSearch } from "@/context/search";
import { useGlobalError } from "@/context/error";

// TODO: fix autofocus not working issue

const SearchBar = () => {
    const { globalLoaded } = useLoaded();
    const { search, setSearch } = useSearch();
    const { globalError } = useGlobalError();
    const [localLoaded, setLocalLoaded] = useState(true);

    const handleSearch = (e) => {
        e.preventDefault();
        setLocalLoaded(false);
        const searchString = e?.target?.search?.value;
        if (searchString) setSearch(searchString);
        e.target.reset();
    };

    useEffect(() => {
        const globalErrorEmpty = !globalError.title || !globalError.message;
        if (globalLoaded && !localLoaded) setLocalLoaded(true);
        if (!localLoaded && !globalErrorEmpty) setLocalLoaded(true);
    }, [globalLoaded, globalError]);

    return (
        <form
            style={{
                width: "100%",
                // height: "50px",
                position: "fixed",
                bottom: 0,
                left: 0,
                padding: 10,
                backgroundColor: useColorModeValue("#E3F4F4", "#393646"),
            }}
            onSubmit={handleSearch}
        >
            <FormControl>
                <InputGroup>
                    <InputLeftElement pointerEvents="none">
                        <SearchIcon color="gray.300" />
                    </InputLeftElement>
                    <Input
                        type="text"
                        id="search"
                        placeholder="E.g. AAPL"
                        autoFocus={true}
                    />
                    <InputRightElement width="4.5rem">
                        {/* {!localLoaded && !globalError ? (
                            <Button isLoading size="xs">
                                search
                            </Button>
                        ) : (
                            <Button type="submit" size="xs">
                                search
                            </Button>
                        )} */}
                        <Button
                            type="submit"
                            size="xs"
                            isLoading={!localLoaded}
                        >
                            search
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
        </form>
    );
};

export default SearchBar;
