import type { AppProps } from "next/app";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import "@fontsource/montserrat/800.css";
import "@fontsource/montserrat/700.css";
import "@fontsource/montserrat/600.css";
import "@fontsource/montserrat/500.css";
import "@fontsource/montserrat/400.css";

import "@fontsource/cabin/400.css";
import "@fontsource/cabin/500.css";
import "@fontsource/cabin/500.css";

function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default App;

export const theme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
  fonts: {
    heading: "Montserrat",
    body: "Cabin",
  },
  components: {
    Card: {
      baseStye: () => ({
        borderRadius: "xl",
        overflow: "hidden",
        bgGradient:
          "linear(to-t, hsla(214, 32%, 90%, 1), hsla(214, 32%, 90%, 0.2))",
      }),
    },
    Text: {
      variants: {
        card: ({ colorMode }: { colorMode: string }) => ({
          fontWeight: "400",
          color: colorMode == "dark" ? "gray.300" : "gray.600",
          fontSize: "sm",
        }),
      },
    },
    Heading: {
      variants: {
        card: ({ colorMode }: { colorMode: string }) => ({
          fontWeight: "700",
          color: colorMode == "dark" ? "gray.200" : "gray.800",
        }),
      },
    },
  },
  styles: {
    global: (props: GlobalStylesProps) => ({
      body: {
        backgroundColor: props.colorMode == "dark" ? "gray.900" : "gray.50",
      },
    }),
  },
});

interface GlobalStylesProps {
  colorMode: string;
}
