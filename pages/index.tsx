import {
  VStack,
  Heading,
  Text,
  Button,
  HStack,
  SimpleGrid,
  Box,
  Divider,
  useColorModeValue,
} from "@chakra-ui/react";
import type { GetStaticProps, NextPage } from "next";
import ProjectCard from "../components/ProjectCard";
import Layout from "../components/layout";
import { ExternalLink } from "../components/ExternalLink";

const Home: NextPage<Props> = ({
  subText,
  githubUrl,
  linkedInUrl,
  emailUrl,
  resumeUrl,
  recentProjects,
}: Props) => {
  const nameGradient = useColorModeValue(
    "linear(to-r, hsla(27, 84%, 57%, 1), hsla(7, 84%, 57%, 0.7))",
    "linear(to-r, hsla(27, 84%, 57%, 1), hsla(7, 84%, 57%, 0.7))"
  );
  const subTextBackground = useColorModeValue("gray.100", "gray.700");
  const cards = recentProjects.map((project) => {
    return (
      <ProjectCard
        key={project.slug}
        title={project.title}
        projectImage={project.projectImage}
        skills={project.skills}
        description={project.description}
        slug={project.slug}
      />
    );
  });

  return (
    <Layout>
      <VStack align="start">
        <Heading fontSize={["2xl", "4xl"]} fontWeight="400" pl="2">
          Hey,
        </Heading>
        <HStack py="2" flexFlow="wrap">
          <Heading fontSize={["4xl", "4xl", "6xl"]} fontWeight="400" pl="2">
            {"I'm"}
          </Heading>
          <Heading
            fontSize={["5xl", "5xl", "5xl", "6xl"]}
            py="1"
            pl={["0", "0", "2"]}
            bgGradient={nameGradient}
            bgClip="text"
          >
            {"Devinda Senanayake"}
          </Heading>
        </HStack>

        <Box bgColor={subTextBackground} py="6" px="4" borderRadius="lg">
          <Text fontSize={18}>{subText}</Text>
        </Box>
        <Box height="2"></Box>
        <SimpleGrid spacing={3} columns={[3, 4]}>
          <ExternalLink href={resumeUrl} title="Resume" solid />
          <ExternalLink href={emailUrl} title="Email" />
          <ExternalLink href={linkedInUrl} title="LinkedIn" />
          <ExternalLink href={githubUrl} title="Github" />
        </SimpleGrid>
        <Box py="8" w="full">
          <Divider />
        </Box>
        <Heading pb="4" size="lg" fontWeight="400">
          {"Stuff I've Coded"}
        </Heading>
        <SimpleGrid spacing={6} columns={[1, 1, 2, 3]}>
          {cards}
        </SimpleGrid>
        <Box alignSelf="center" pt="4">
          <Button fontSize="lg" size="md" variant="outline" fontWeight="400">
            More Projects
          </Button>
        </Box>
      </VStack>
    </Layout>
  );
};

export default Home;

import { getProjects } from "../lib/notion";
import { readFileSync, writeFileSync } from "fs";
import { Client } from "@notionhq/client/build/src";
import { ProjectCardProps } from "../types";

const notion = new Client({ auth: process.env.NOTION_API_KEY });
export const getStaticProps: GetStaticProps = async () => {
  let response;
  if (process.env.NODE_ENV === "production") {
    const database_id = "4f1fd603748b44d58615d782979d7a1e";
    response = await notion.databases.query({
      database_id,
    });
    // writeFileSync("test_data/database.json", JSON.stringify(response), "utf8");
  } else {
    const jsonString = readFileSync("./test_data/database.json", {
      encoding: "utf8",
    });
    response = JSON.parse(jsonString);
  }

  const projects: ProjectCardProps[] = await getProjects(response);

  const props: Props = {
    subText:
      "Full-stack developer with a passion for eliminating repetitive problems. A firm believer in test-driven development and dedicated to building clean interfaces and reliable back ends. Skilled in Javascript, Ruby & Python.",
    resumeUrl: "/resume.pdf",
    emailUrl: "mailto:contact@devinda.me",
    linkedInUrl: "https://www.linkedin.com/in/devindame/",
    githubUrl: "https://github.com/dca123",
    recentProjects: projects,
  };

  return {
    props,
  };
};

interface Props {
  subText: string;
  resumeUrl: string;
  emailUrl: string;
  linkedInUrl: string;
  githubUrl: string;
  recentProjects: ProjectCardProps[];
}
