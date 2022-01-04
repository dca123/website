import { Box, HStack, Tag, VStack, Text, Heading, Flex } from "@chakra-ui/react";
import Image from "next/image";

interface ProjectCardProps {
  title: string
}

export default function ProjectCard({ title }: ProjectCardProps) {
  return (
    <Box bg="gray.200" borderRadius="xl" >
      <Flex alignItems="flex-start" justify="space-between" direction="column" px={7} >
        <Box py={8}>
          <Heading size="lg" color="black" fontWeight="600">{title}</Heading>
          <Text fontSize="sm" pt={1}>A custom matchmaker for new players in dota 2A custom matchmaker for new players in dota 2</Text>
        </Box>
        <Box pb={8}>
          <HStack>
            <Tag size="md" colorScheme="gray">Node.js</Tag>
            <Tag size="md" colorScheme="gray">Node.js</Tag>
            <Tag size="md" colorScheme="gray">Node.js</Tag>
          </HStack>
        </Box >
      </Flex >
    </Box >
  )
}