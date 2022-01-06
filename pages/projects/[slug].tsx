import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { Box, Container, Divider, Heading, HStack, Image, Tag, Text, VStack } from "@chakra-ui/react";
import { SunIcon } from "@chakra-ui/icons";
import Layout from "../../components/layout";
import { Project } from "..";

interface ProjectPage extends Project {
  date: string
  github: string
  headerImageUrl: string
}

const DotaPage: NextPage<ProjectPage> = ({ title, date, github, headerImageUrl, skills }: ProjectPage) => {
  const skillStack = skills.map((skill) => {
    return <Tag size="lg" colorScheme="orange" fontWeight="700" key="tag">{skill}</Tag>
  });

  return (
    <Layout>
      <VStack align="flex-start">
        <HStack justify="space-between" w="full" mb={4} >
          <Heading fontSize="2xl" fontWeight="500" alignSelf="center" letterSpacing="widest">
            {title}
          </Heading>
          <VStack align="flex-end">
            <Heading fontWeight="400" fontSize="sm">{date}</Heading>
            <Heading fontWeight="400" fontSize="sm">{github}</Heading>
          </VStack>
        </HStack>
        <Box overflow="clip" borderRadius="lg" maxH="xs">
          <Image src={headerImageUrl} alt="image" objectFit="cover" />
        </Box>
        <HStack pt={2}>
          {skillStack}
        </HStack>
        <Box py="6" w="full">
          <Divider />
        </Box>
        <Heading letterSpacing="wider" fontWeight="600">
          Title 1
        </Heading>
        <Text fontSize="lg">
          {"DOTA 2 is a popular MOBA where two teams of five battle against another to take down their opponent's stronghold. Created in 2013 by Valve, is one of the most popular games available on Steam."}
        </Text>
        <Text fontSize="lg">
          {"Valve hasn't historically done much to help new players. Furthermore, the new player environment can be quite toxic as new players are often matched against veterans and the unbalanced skill on the team can often lead to a terrible learning environment."}
        </Text>
        <Box height="2"></Box>
        <Heading letterSpacing="wider" fontWeight="600">
          Solution
        </Heading>
        <Text fontSize="lg">
          {"Inspired by projects such as [DOTA University](https://dota-university.com/), the DOTA 2 Rookie Matchmaker is a private matchmaking service that enables new players to play against each other in a friendly environment. The front end is powered by Next js where players can log in via their existing steam accounts. Once logged in, the player can join a queue as a coach or player."}
        </Text>
        <Text fontSize="lg">
          {"Inspired by projects such as [DOTA University](https://dota-university.com/), the DOTA 2 Rookie Matchmaker is a private matchmaking service that enables new players to play against each other in a friendly environment. The front end is powered by Next js where players can log in via their existing steam accounts. Once logged in, the player can join a queue as a coach or player."}
        </Text>
      </VStack>
    </Layout>
  )
}

export default DotaPage;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug
  return {
    props: {
      title: "Dota 2",
      date: "January 10th, 2019",
      github: "github.com/dca123/hitchspots",
      headerImageUrl: "/images/image.jpg",
      skills: ["Node.js", "React", "Next.js", "TypeScript", "Chakra UI"]
    }
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {
        params: {
          slug: 'dota-2'
        }
      },
      {
        params: {
          slug: 'pre-rendering'
        }
      }
    ],
    fallback: "blocking"
  }
}