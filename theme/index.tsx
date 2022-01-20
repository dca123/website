import { extendTheme } from "@chakra-ui/react";

interface GlobalStylesProps {
  colorMode: string;
}

interface VariantProps {
  colorMode: string;
}

export const theme = extendTheme({
  config: {
    initialColorMode: "system",
  },
  fonts: {
    heading: "Montserrat",
    body: "Nunito",
  },
  shadows: {
    card_dark: "5px 5px 0 #EB5753",
    card_light: "5px 5px 0 #EB5753",
  },
  components: {
    Flex: {
      variants: {
        card: ({ colorMode }: VariantProps) => ({
          _hover: {
            boxShadow: colorMode === "dark" ? "card_dark" : "card_light",
            cursor: "pointer",
          },
        }),
      },
    },
    Text: {
      variants: {
        card: ({ colorMode }: VariantProps) => ({
          fontWeight: "400",
          color: colorMode == "dark" ? "gray.300" : "gray.600",
          fontSize: "sm",
        }),
        caption: ({ colorMode }: VariantProps) => ({
          fontWeight: "300",
          color: colorMode == "dark" ? "gray.500" : "gray.700",
          fontSize: "md",
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
