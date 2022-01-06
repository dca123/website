import { Box, HStack, Tag, VStack, Text, Heading, Flex, Image, useColorModeValue } from "@chakra-ui/react";

interface ProjectCardProps {
  title: string
  imageUrl: string
}

export default function ProjectCard({ title, imageUrl }: ProjectCardProps) {
  const bg = useColorModeValue("linear(to-t, hsla(214, 32%, 90%, 1), hsla(214, 32%, 90%, 0.2))",
    "linear(to-t, hsla(214, 32%, 20%, 1), hsla(214, 32%, 20%, 0.6))");
  return (
    <Box borderRadius="xl" overflow="hidden" >
      <Image src={imageUrl} alt="image" objectFit="cover" />
      <Flex alignItems="flex-start" justify="space-between" direction="column" px={7} bgGradient={bg}>
        <Box py={5}>
          <Heading size="lg" variant="card">{title}</Heading>
          <Text variant="card" pt={1}>A custom matchmaker for new players in dota 2A custom matchmaker for new players in dota 2</Text>
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