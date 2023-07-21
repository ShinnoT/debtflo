import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const styles = {
    global: (props) => ({
        body: {
            bg: mode("#E3F4F4", "#393646")(props),
            color: mode("#393646", "#F8F6F4")(props),
        },
    }),
};

// const components = {
//     Button: {
//         // baseStyle: (props) => ({
//         //     bg: mode("#D2E9E9", "gray")(props),
//         // }),
//         colorScheme: (props) => ({
//             bg: mode("teal", "gray")(props),
//         }),
//     },
// };

const components = {
    // Heading: {
    //     variants: {
    //         "section-title": {
    //             textDecoration: "underline",
    //             fontSize: 20,
    //             textUnderlineOffset: 6,
    //             textDecorationColor: "#525252",
    //             textDecorationThickness: 4,
    //             marginTop: 3,
    //             marginBottom: 4,
    //         },
    //     },
    // },
    Heading: {
        variants: {
            "section-title": (props) => ({
                color: mode("gray.500", "gray.400")(props),
            }),
        },
    },
    Link: {
        baseStyle: (props) => ({
            color: mode("#3d7aed", "#ff63c3")(props),
            textUnderlineOffset: 3,
        }),
    },
};

const fonts = {
    heading: "var(--font-roboto)",
    body: "var(--font-roboto)",
};

// const colors = {
//     glassTeal: "#88ccca",
// };

const config = {
    initialColorMode: "dark",
    useSystemColorMode: false,
};

const theme = extendTheme({ config, fonts, styles, components });

export default theme;
