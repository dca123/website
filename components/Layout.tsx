import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  Container,
  HStack,
  Heading,
  Box,
  Button,
  useColorMode,
  Link as ChakraLink,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { colorMode, toggleColorMode } = useColorMode();
  const router = useRouter();
  const activeWeight = (path: string) =>
    router.pathname === path ? "700" : "500";
  return (
    <Container maxW={["container.sm", "container.lg"]}>
      <HStack justify="flex-end" mt="8">
        <Link href="/">
          <a>
            <Heading fontWeight={activeWeight("/")} fontSize="md" px="4">
              <ChakraLink>Home</ChakraLink>
            </Heading>
          </a>
        </Link>
        <Link href="/about">
          <a>
            <Heading fontWeight={activeWeight("/about")} fontSize="md" px="4">
              <ChakraLink>About</ChakraLink>
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
