import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  Container,
  HStack,
  Heading,
  Box,
  Button,
  useColorMode,
} from "@chakra-ui/react";
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Container maxW={["container.sm", "container.lg"]}>
      <HStack justify="flex-end" mt="8">
        <Link href="/">
          <a>
            <Heading fontWeight="700" fontSize="md" px="4">
              Home
            </Heading>
          </a>
        </Link>
        <Link href="/about">
          <a>
            <Heading fontWeight="500" fontSize="md" px="4">
              About
            </Heading>
          </a>
        </Link>
        <Button onClick={toggleColorMode} variant="ghost">
          {colorMode === "light" ? (
            <SunIcon fontSize="xl" />
          ) : (
            <MoonIcon fontSize="xl" />
          )}
        </Button>
      </HStack>
      <Box height={["14", "24"]}></Box>
      <Box px={["2", "16", "0"]}>{children}</Box>
      <Box height={["14", "24"]}></Box>
    </Container>
  );
}