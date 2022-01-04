import { Container, VStack, Heading, Text, Button, HStack, SimpleGrid, Box, Tag, MenuButton, Menu, Divider, Flex, Spacer } from '@chakra-ui/react'
import type { NextPage } from 'next'
import ProjectCard from '../components/ProjectCard'
import { SunIcon } from '@chakra-ui/icons';

const Home: NextPage = () => {
  return (
    <Container maxW={["container.lg"]}>
      <HStack justify="flex-end" mt='8'>
        <Heading fontWeight="700" fontSize="md" px="4"> Home</Heading>
        <Heading fontWeight="500" fontSize="md" px="4"> About Me</Heading>
        <Heading fontWeight="500" fontSize="md" px="4"> Projects</Heading>
        <SunIcon fontSize="xl" />

      </HStack >
      <Box height="24"></Box>
      <VStack align="start">
        <Heading size="xl" fontWeight="400">
          Hey,
        </Heading>
        <HStack py="2">
          <Heading size="3xl" fontWeight="400">
            {"I'm"}
          </Heading>
          <Heading size="3xl" py="1" bgGradient='linear(to-r, #ED8936, rgba(237, 75, 53, 0.6))' bgClip='text'>
            Devinda Senanayake
          </Heading>
        </HStack>
        <Box bgColor="gray.100" py="6" px="4" borderRadius="lg">
          <Text fontSize={18}>Full-stack developer with a passion for eliminating repetitive problems. A firm believer in test-driven development and dedicated to building clean interfaces and reliable back ends. Skilled in Javascript, Ruby & Python.</Text>
        </Box>
        <Box height="2"></Box>
        <HStack justify="space-between" >
          <Button size="md" fontWeight="700" color="white"
            bgGradient='linear(to-r, hsla(27, 84%, 55%, 1), hsla(17, 84%, 55%, 0.8))'
            _hover={{ bgGradient: 'linear(to-r, hsla(27, 84%, 45%, 1), hsla(17, 84%, 45%, 0.8))' }}
          >Resume</Button>
          <Button size="md" colorScheme="gray" variant="ghost" fontWeight="400">Email</Button>
          <Button size="md" colorScheme="gray" variant="ghost" fontWeight="400">LinkedIn</Button>
          <Button size="md" colorScheme="gray" variant="ghost" fontWeight="400" >Github</Button>
        </HStack>
        <Box py="8" w="full">
          <Divider />
        </Box>
        <Heading pb="4" size="lg" fontWeight="400">{"Stuff I've Coded"}</Heading>
        <SimpleGrid columns={3} spacing={6}>
          <ProjectCard title="Dota 2" imageUrl="https://picsum.photos/id/200/600/300" />
          <ProjectCard title="Hitchspots" imageUrl="https://picsum.photos/id/201/600/300" />
          <ProjectCard title="Project A" imageUrl="https://picsum.photos/id/202/600/300" />
          <ProjectCard title="Project B" imageUrl="https://picsum.photos/id/203/600/300" />
          <ProjectCard title="Project C" imageUrl="https://picsum.photos/id/204/600/300" />
          <ProjectCard title="Project D" imageUrl="https://picsum.photos/id/206/600/300" />
        </SimpleGrid>
        <Box alignSelf="center" pt="4">
          <Button fontSize="lg" size="md" variant="outline" fontWeight="400">
            More Projects
          </Button>
        </Box>
      </VStack>
      <Box h={16}></Box>
    </Container >
  )
}

export default Home
