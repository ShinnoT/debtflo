import { Flex, Text } from "@chakra-ui/react";

import NavBar from "@/components/navbar";
import SearchBar from "@/components/searchbar";
import InfoArea from "@/components/infoarea";

const Home = () => {
    return (
        <>
            <NavBar />
            <Flex
                align="center"
                justify="space-between"
                height="calc(100vh - 50px)"
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
