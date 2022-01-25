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
        <Heading fontWeight={activeWeight("/")} fontSize="md" px="4">
          <Link href="/" passHref>
            <ChakraLink>Home</ChakraLink>
          </Link>
        </Heading>
        <Link href="/about" passHref>
          <Heading fontWeight={activeWeight("/about")} fontSize="md" px="4">
            <ChakraLink>About</ChakraLink>
          </Heading>
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
