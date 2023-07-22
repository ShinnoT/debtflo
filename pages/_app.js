import "@/styles/globals.css";

import { ChakraProvider } from "@chakra-ui/react";
import theme from "@/lib/theme";

import { Roboto } from "next/font/google";

import LoadingProvider from "@/context/loading";
import SearchProvider from "@/context/search";
import ErrorProvider from "@/context/error";

const roboto = Roboto({ subsets: ["latin"], weight: ["100", "300"] });

export default function App({ Component, pageProps }) {
    return (
        <>
            <style jsx global>
                {`
                    :root {
                        --font-roboto: ${roboto.style.fontFamily};
                    }
                `}
            </style>
            <ChakraProvider theme={theme}>
                <LoadingProvider>
                    <SearchProvider>
                        <ErrorProvider>
                            <Component {...pageProps} />
                        </ErrorProvider>
                    </SearchProvider>
                </LoadingProvider>
            </ChakraProvider>
        </>
    );
}
