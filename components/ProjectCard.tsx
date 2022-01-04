import { Box, HStack, Tag, VStack, Text, Heading } from "@chakra-ui/react";
import Image from "next/image";

interface ProjectCardProps {
  title: string
}

export default function ProjectCard({ title }: ProjectCardProps) {
  return (
    <Box bg="gray.100"
      borderRadius="xl" _hover={{
        shadow: "2xl",
      }}>
      <VStack align="start" px="6" py="8">
        <Heading size="lg" color="black">{title}</Heading>
        <Text fontSize="sm">A custom matchmaker for new players in dota 2A custom matchmaker for new players in dota 2</Text>
        <HStack pt="4">
          <Tag size="md" colorScheme="linkedin">Node.js</Tag>
          <Tag size="md" colorScheme="linkedin">Node.js</Tag>
          <Tag size="md" colorScheme="linkedin">Node.js</Tag>
        </HStack>
      </VStack>
    </Box >
  )
}