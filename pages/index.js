import { Flex } from "@chakra-ui/react";
import Head from "next/head";

import InfoArea from "@/components/infoarea";
import NavBar from "@/components/navbar";
import SearchBar from "@/components/searchbar";
import ErrorModal from "@/components/sub-components/error-modal";

import { useGlobalError } from "@/context/error";

const Home = () => {
    const { globalError } = useGlobalError();

    return (
        <>
            <Head>
                <title>Debtflo</title>
                <meta
                    name="description"
                    content="Empowering investors with a visually stunning, data-rich platform that delivers in-depth, real-time financial insights on any stock ticker at your fingertips, elevating your investing decisions to the next level."
                />
                <meta
                    property="og:url"
                    content="https://debtflo.netlify.app/"
                />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Debtflo" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta
                    property="og:description"
                    content="Empowering investors with a visually stunning, data-rich platform that delivers in-depth, real-time financial insights on any stock ticker at your fingertips, elevating your investing decisions to the next level."
                />
                <meta
                    property="og:image"
                    content={"/images/website-screenshot.png"}
                />
            </Head>
            <ErrorModal title={globalError.title}>
                {globalError.message}
            </ErrorModal>
            <NavBar />
            <Flex
                align="center"
                justify="space-between"
                mt="50px"
                height={{
                    base: "calc(300vh - 50px)",
                    md: "calc(200vh - 50px)",
                    lg: "calc(100vh - 50px)",
                }}
                direction="column"
                p={4}
                w="100%"
            >
                <InfoArea />
                <SearchBar />
            </Flex>
        </>
    );
};

export default Home;
