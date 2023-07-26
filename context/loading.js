import { createContext, useContext, useState } from "react";

const LoadingContext = createContext(null);

const LoadingProvider = ({ children }) => {
    // const defaultLoaded = {
    //     basicStats: true,
    //     keyDates: true,
    //     metaData: true,
    //     sentimentScore: true,
    //     news: true,
    //     visualStats: true,
    // };
    const [globalLoaded, setGlobalLoaded] = useState(false);

    return (
        <LoadingContext.Provider value={{ globalLoaded, setGlobalLoaded }}>
            {children}
        </LoadingContext.Provider>
    );
};

const useLoaded = () => useContext(LoadingContext);

export { LoadingProvider as default, useLoaded };
