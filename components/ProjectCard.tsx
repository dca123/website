import {
  Box,
  HStack,
  Tag,
  Text,
  Heading,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";
import Link from "next/link";
import Image from "next/image";
import { ProjectCardProps } from "../types";

export default function ProjectCard({
  title,
  projectImage: imageUrl,
  skills,
  slug,
  description,
}: ProjectCardProps) {
  const bg = useColorModeValue(
    "linear(to-t, hsla(214, 32%, 90%, 1), hsla(214, 32%, 90%, 0.2))",
    "linear(to-t, hsla(214, 32%, 20%, 0.8), hsla(214, 32%, 20%, 0.6))"
  );
  const skillStack = skills.map((skill) => {
    return (
      <Tag size="md" key="tag">
        {skill}
      </Tag>
    );
  });
  return (
    <Box borderRadius="xl" overflow="hidden">
      <Link href={"/projects/" + slug} passHref>
        <Flex direction="column" h="full">
          <Box>
            <Image
              src={imageUrl}
              alt="image"
              objectFit="cover"
              layout="responsive"
              width="120"
              height="75"
            />
          </Box>
          <Flex
            alignItems="flex-start"
            justify="space-between"
            direction="column"
            px={7}
            bgGradient={bg}
            h="full"
          >
            <Box py={5}>
              <Heading fontSize="3xl" variant="card">
                {title}
              </Heading>
              <Text variant="card" pt={1}>
                {description}
              </Text>
            </Box>
            <Box pb={8}>
              <HStack>{skillStack}</HStack>
            </Box>
          </Flex>
        </Flex>
      </Link>
    </Box>
  );
}
