import {
  ColorMode,
  Link as ChakraLink,
  Box,
  Divider,
  HStack,
  Text,
} from "@chakra-ui/react";

export const Footer = ({ colorMode }: { colorMode: ColorMode }) => {
  const backToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <Box pb="8" w="full">
      <Box py="8" w="full">
        <Divider />
      </Box>
      <HStack justify="center" w="full" alignSelf="center">
        <Text
          color={colorMode === "dark" ? "gray.300" : "gray.600"}
          fontSize="sm"
        >
          <ChakraLink onClick={backToTop}>{"Back to Top"}</ChakraLink>
        </Text>
      </HStack>
    </Box>
  );
};
