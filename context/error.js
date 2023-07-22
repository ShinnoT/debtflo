import { createContext, useState, useContext } from "react";

const ErrorContext = createContext(null);

const ErrorProvider = ({ children }) => {
    const [globalError, setGlobalError] = useState({
        title: null,
        message: null,
    });

    return (
        <ErrorContext.Provider value={{ globalError, setGlobalError }}>
            {children}
        </ErrorContext.Provider>
    );
};

const useGlobalError = () => useContext(ErrorContext);

export { ErrorProvider as default, useGlobalError };
