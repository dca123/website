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
