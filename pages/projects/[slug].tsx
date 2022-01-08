import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { Box, Container, Divider, Flex, Heading, HStack, Image, Spacer, Tag, Text, VStack } from "@chakra-ui/react";
import { SunIcon } from "@chakra-ui/icons";
import Layout from "../../components/layout";
import { Project } from "..";

interface ProjectPage extends Project {
  date: string
  github: string
  headerImageUrl: string
  blocks: Block[]
}

interface Block {
  id: string
  type: "paragraph" | "heading_1" | "image"
  data: string
}

const DotaPage: NextPage<ProjectPage> = ({ title, date, github, headerImageUrl, skills, blocks }: ProjectPage) => {
  const skillStack = skills.map((skill) => {
    return <Tag size="lg" colorScheme="orange" fontWeight="700" key="tag" mx="1" my="1">{skill}</Tag>
  });

  const blocksContent = blocks.map((block: Block, index) => {
    switch (block.type) {
      case "paragraph":
        return <Text key={block.id} fontSize="lg">{block.data}</Text>
        break;
      case "heading_1":
        return <Heading key={block.id} letterSpacing="wider" fontWeight="600" pt={index !== 0 ? '4' : '0'}>{block.data}</Heading>
      case "image":
        return <Box py="4" alignSelf="center">
          <Box overflow="clip" borderRadius="lg" maxH="md" maxW="2xl">
            <Image src={block.data} alt="image" objectFit="cover" />
          </Box>
        </Box>
      default:
        return <Box>
          Block not recognized
          {block}
        </Box>
        break;
    }
  })

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
        <Flex pt={2} flexWrap="wrap">
          {skillStack}
        </Flex>
        <Box py="6" w="full">
          <Divider />
        </Box>


        <VStack align="flex-start">
          {blocksContent}
        </VStack>
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
      skills: ["Node.js", "React", "Next.js", "TypeScript", "Chakra UI"],
      blocks: [
        {
          id: "1",
          type: "heading_1",
          data: "Title 1"
        },
        {
          id: "2",
          type: "paragraph",
          data: "DOTA 2 is a popular MOBA where two teams of five battle against another to take down their opponent's stronghold. Created in 2013 by Valve, is one of the most popular games available on Steam."
        },
        {
          id: "3",
          type: "paragraph",
          data: "Valve hasn't historically done much to help new players. Furthermore, the new player environment can be quite toxic as new players are often matched against veterans and the unbalanced skill on the team can often lead to a terrible learning environment."
        },
        {
          id: "6",
          type: "image",
          data: "https://images.unsplash.com/photo-1641575150772-caac11596690?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80"
        },
        {
          id: "4",
          type: "heading_1",
          data: "Solution"
        },
        {
          id: "5",
          type: "paragraph",
          data: "Inspired by projects such as [DOTA University](https://dota-university.com/), the DOTA 2 Rookie Matchmaker is a private matchmaking service that enables new players to play against each other in a friendly environment. The front end is powered by Next js where players can log in via their existing steam accounts. Once logged in, the player can join a queue as a coach or player."
        }
      ]
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