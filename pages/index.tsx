import { Container, VStack, Heading, Text, Button, HStack, SimpleGrid, Box, Tag, MenuButton, Menu } from '@chakra-ui/react'
import type { NextPage } from 'next'
import ProjectCard from '../components/ProjectCard'

const Home: NextPage = () => {
  return (
    <Container maxW="container.lg" >
      <HStack justify="flex-end">
        <Text>Home</Text>
        <Text>About Me</Text>
      </HStack>
      <VStack align="start" mt="12">
        <Heading size="2xl">
          Hi
        </Heading>
        <HStack>
          <Heading size="2xl">
            {"I'm"}
          </Heading><Heading size="2xl" color="orange.400">
            Devinda
          </Heading>
        </HStack>

        <Text>Full-stack developer with a passion for eliminating repetitive problems. A firm believer in test-driven development and dedicated to building clean interfaces and reliable back ends. Skilled in Javascript, Ruby & Python.</Text>
        <HStack>
          <Button colorScheme="orange">Resume</Button>
          <Button colorScheme="orange" variant="outline">Email</Button>
          <Button colorScheme="orange" variant="outline">LinkedIn</Button>
          <Button colorScheme="orange" variant="outline">Github</Button>
        </HStack>
        <Box h="12"></Box>
        <Heading pb="4" size="lg">{"Stuff I've Coded"}</Heading>
        <SimpleGrid columns={3} spacing={8}>
          <ProjectCard title="Dota 2 MatchMaker" />
          <ProjectCard title="Hitchspots" />
          <ProjectCard title="Project A" />
          <ProjectCard title="Project B" />
          <ProjectCard title="Project C" />
          <ProjectCard title="Project D" />
        </SimpleGrid>
        <Text>View More</Text>
      </VStack>
    </Container>
  )
}

export default Home
