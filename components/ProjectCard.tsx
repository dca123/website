import { Box, HStack, Tag, VStack, Text, Heading, Flex, Image } from "@chakra-ui/react";

interface ProjectCardProps {
  title: string
  imageUrl: string
}

export default function ProjectCard({ title, imageUrl }: ProjectCardProps) {
  return (
    <Box borderRadius="xl" overflow="hidden" >
      <Image src={imageUrl} alt="image" objectFit="cover" />
      <Flex alignItems="flex-start" justify="space-between" direction="column" px={7} bgGradient='linear(to-t, hsla(214, 32%, 90%, 1), hsla(214, 32%, 90%, 0.2))'>
        <Box py={5}>
          <Heading size="lg" color="gray.800" fontWeight="700">{title}</Heading>
          <Text fontSize="sm" color="gray.600" fontWeight="400" pt={1}>A custom matchmaker for new players in dota 2A custom matchmaker for new players in dota 2</Text>
        </Box>
        <Box pb={8}>
          <HStack>
            <Tag size="md">Node.js</Tag>
            <Tag size="md">Node.js</Tag>
            <Tag size="md">Node.js</Tag>
          </HStack>
        </Box >
      </Flex >

    </Box >
  )
}