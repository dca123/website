import { Container, VStack, Heading, Text, Button, HStack, SimpleGrid, Box, Tag, MenuButton, Menu, Divider, Flex } from '@chakra-ui/react'
import type { NextPage } from 'next'
import ProjectCard from '../components/ProjectCard'

const Home: NextPage = () => {
  return (
    <Container maxW={["container.md", "container.lg"]}>
      <HStack justify="flex-end" mt='8'>
        <Box mx='4'>
          <Text fontWeight="700"> Home</Text >
        </Box><Box mx='4'>
          <Text> About Me</Text >
        </Box>
      </HStack >
      <Box height="24"></Box>
      <VStack align="start">
        <Heading size="xl" fontWeight="400">
          Hey,
        </Heading>
        <HStack pt="2">
          <Heading size="2xl" fontWeight="400">
            {"I'm"}
          </Heading><Heading size="2xl" color="orange.400" >
            Devinda Senanayake
          </Heading>
        </HStack>
        <Box height="4"></Box>
        <Box bgColor="gray.200" py="6" px="4" borderRadius="lg">
          <Text>Full-stack developer with a passion for eliminating repetitive problems. A firm believer in test-driven development and dedicated to building clean interfaces and reliable back ends. Skilled in Javascript, Ruby & Python.</Text>
        </Box>
        <Box height="2"></Box>
        <HStack>
          <Button size="md" colorScheme="orange" fontWeight="400">Resume</Button>
          <Button size="md" colorScheme="gray" variant="outline" fontWeight="400">Email</Button>
          <Button size="md" colorScheme="gray" variant="outline" fontWeight="400">LinkedIn</Button>
          <Button size="md" colorScheme="gray" variant="outline" fontWeight="400">Github</Button>
        </HStack>
        <Box py="8" w="full">
          <Divider />
        </Box>
        <Heading pb="4" size="lg" fontWeight="400">{"Stuff I've Coded"}</Heading>
        <SimpleGrid columns={3} spacing={8}>
          <ProjectCard title="Dota 2" />
          <ProjectCard title="Hitchspots" />
          <ProjectCard title="Project A" />
          <ProjectCard title="Project B" />
          <ProjectCard title="Project C" />
          <ProjectCard title="Project D" />
        </SimpleGrid>
        <Box alignSelf="center" pt="6">
          <Button fontSize="lg" variant="outline" >
            More Projects
          </Button>

        </Box>
      </VStack>
    </Container >
  )
}

export default Home
