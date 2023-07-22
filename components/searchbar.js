import {
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    FormControl,
    Button,
    useColorMode,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

import { useLoaded } from "@/context/loading";
import { useSearch } from "@/context/search";

// TODO: fix autofocus not working issue

const SearchBar = () => {
    const { globalLoaded } = useLoaded();
    const { search, setSearch } = useSearch();

    const handleSearch = (e) => {
        e.preventDefault();
        const searchString = e?.target?.search?.value;
        if (searchString) setSearch(searchString);
        e.target.reset();
    };

    return (
        <form style={{ width: "100%" }} onSubmit={handleSearch}>
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
                        {!globalLoaded.basicStats ||
                        !globalLoaded.keyDates ||
                        !globalLoaded.metaData ||
                        !globalLoaded.sentimentScore ||
                        !globalLoaded.news ||
                        !globalLoaded.visualStats ? (
                            <Button isLoading size="xs">
                                search
                            </Button>
                        ) : (
                            <Button type="submit" size="xs">
                                search
                            </Button>
                        )}
                    </InputRightElement>
                </InputGroup>
            </FormControl>
        </form>
    );
};

export default SearchBar;
