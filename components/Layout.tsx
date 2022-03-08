import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  Container,
  HStack,
  Heading,
  Box,
  Button,
  useColorMode,
  Link as ChakraLink,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Footer } from "./Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { colorMode, toggleColorMode } = useColorMode();
  const router = useRouter();
  const activeWeight = (path: string) =>
    router.pathname === path ? "700" : "500";
  return (
    <Container maxW={["container.sm", "container.lg"]} h="95vh">
      <HStack justify="flex-end" pt="8">
        <Link href="/" passHref>
          <ChakraLink>
            <Heading fontWeight={activeWeight("/")} fontSize="md" px="4">
              Home
            </Heading>
          </ChakraLink>
        </Link>
        <Link href="/about" passHref>
          <ChakraLink>
            <Heading fontWeight={activeWeight("/about")} fontSize="md" px="4">
              About
            </Heading>
          </ChakraLink>
        </Link>
        <ChakraLink href="https://feed.devinda.me" isExternal={true}>
          <Heading fontWeight="500" fontSize="md" px="4">
            Feed
          </Heading>
        </ChakraLink>
        <Button onClick={toggleColorMode} variant="ghost">
          {colorMode === "light" ? (
            <SunIcon fontSize="xl" />
          ) : (
            <MoonIcon fontSize="xl" />
          )}
        </Button>
      </HStack>
      <VStack justifyContent="space-between" h="full">
        <Box>
          <Box height={["10", "20"]}></Box>
          <Box px={["2", "16", "0"]}>{children}</Box>
        </Box>
        <Footer colorMode={colorMode} />
      </VStack>
    </Container>
  );
}
