import { createContext, useContext, useState } from "react";

const SearchContext = createContext(null);

const SearchProvider = ({ children }) => {
    const [search, setSearch] = useState(null);

    return (
        <SearchContext.Provider value={{ search, setSearch }}>
            {children}
        </SearchContext.Provider>
    );
};

const useSearch = () => useContext(SearchContext);

export { SearchProvider as default, useSearch };
