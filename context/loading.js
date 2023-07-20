import { createContext, useState, useContext } from "react";

const LoadingContext = createContext(null);

const LoadingProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);

    return (
        <LoadingContext.Provider value={{ loading, setLoading }}>
            {children}
        </LoadingContext.Provider>
    );
};

const useLoading = () => useContext(LoadingContext);

export { LoadingProvider as default, useLoading };
