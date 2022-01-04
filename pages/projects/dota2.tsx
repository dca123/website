import { NextPage } from "next";
import { Box, Container, Heading, HStack, Text, VStack } from "@chakra-ui/react";

const DotaPage: NextPage = () => {
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
      <VStack align="flex-start">
        <Heading size="xl" fontWeight="400" alignSelf="center">
          Dota 2 Matchmaking
        </Heading>
        <Box height="16"></Box>
        <Heading>
          Problem
        </Heading>
        <Text>
          {"DOTA 2 is a popular MOBA where two teams of five battle against another to take down their opponent's stronghold. Created in 2013 by Valve, is one of the most popular games available on Steam."}
        </Text>
        <Text>
          {"Despite it's popularity, the learning curve for new players has been notoriously steep and aside from the recent [new player update](https://www.dota2.com/newsentry/2995430596679058277), Valve hasn't historically done much to help new players. Furthermore, the new player environment can be quite toxic as new players are often matched against veterans and the unbalanced skill on the team can often lead to a terrible learning environment."}
        </Text>
        <Box height="8"></Box>
        <Heading>
          Solution
        </Heading>
        <Text>
          {"Inspired by projects such as [DOTA University](https://dota-university.com/), the DOTA 2 Rookie Matchmaker is a private matchmaking service that enables new players to play against each other in a friendly environment. The front end is powered by Next js where players can log in via their existing steam accounts. Once logged in, the player can join a queue as a coach or player."}
        </Text>
        <Text>
          {"Inspired by projects such as [DOTA University](https://dota-university.com/), the DOTA 2 Rookie Matchmaker is a private matchmaking service that enables new players to play against each other in a friendly environment. The front end is powered by Next js where players can log in via their existing steam accounts. Once logged in, the player can join a queue as a coach or player."}
        </Text>
      </VStack>
      <Box h={16}></Box>
    </Container >
  )
}

export default DotaPage;