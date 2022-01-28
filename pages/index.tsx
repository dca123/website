import {
  VStack,
  Heading,
  Text,
  HStack,
  SimpleGrid,
  Box,
  Divider,
  useColorModeValue,
} from "@chakra-ui/react";
import type { GetStaticProps, NextPage } from "next";
import ProjectCard from "../components/ProjectCard";
import Layout from "../components/Layout";
import { ExternalLink } from "../components/ExternalLink";
import { FaLinkedinIn, FaGithub, FaEnvelope } from "react-icons/fa";

const Home: NextPage<Props> = ({
  tagline,
  github: githubUrl,
  linkedin: linkedinUrl,
  email,
  resume: resumeUrl,
  recentProjects,
}: Props) => {
  const emailUrl = `mailto:${email}`;
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
        projectImageBlur={project.projectImageBlur}
      />
    );
  });

  return (
    <Layout>
      <Head>
        <title>Devinda Senanayake</title>
      </Head>
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
          <Text fontSize={18}>{tagline}</Text>
        </Box>
        <Box height="2"></Box>
        <SimpleGrid spacing={3} columns={[3, 4]}>
          <ExternalLink href={resumeUrl} title="Resume" solid />
          <ExternalLink href={emailUrl} title="Email" icon={FaEnvelope} />
          <ExternalLink
            href={linkedinUrl}
            title="LinkedIn"
            icon={FaLinkedinIn}
          />
          <ExternalLink href={githubUrl} title="Github" icon={FaGithub} />
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
      </VStack>
    </Layout>
  );
};

export default Home;

import { getPageConfig, getProjects } from "../lib/notion";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { readFileSync, writeFileSync } from "fs";
import { Client } from "@notionhq/client/build/src";
import { PageConfig, ProjectCardProps } from "../types";
import Head from "next/head";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export const getStaticProps: GetStaticProps = async () => {
  let projectsListResponse;
  let pageConfigResponse;
  if (process.env.NODE_ENV === "production") {
    const database_id = "4f1fd603748b44d58615d782979d7a1e";
    projectsListResponse = await notion.databases.query({
      database_id,
    });
    pageConfigResponse = await notion.databases.query({
      database_id: "c1e06496449b4ebf99adeeb2d0d3ff5f",
    });
    // writeFileSync(
    //   "test_data/database.json",
    //   JSON.stringify(projectsListResponse),
    //   "utf8"
    // );
    // writeFileSync(
    //   "test_data/pageConfig.json",
    //   JSON.stringify(pageConfigResponse),
    //   "utf8"
    // );
  } else {
    const jsonString = readFileSync("./test_data/database.json", {
      encoding: "utf8",
    });
    const pageConfigString = readFileSync("./test_data/pageConfig.json", {
      encoding: "utf8",
    });
    projectsListResponse = JSON.parse(jsonString);
    pageConfigResponse = JSON.parse(pageConfigString);
  }

  const projects: ProjectCardProps[] = await getProjects(projectsListResponse);
  const pageConfig = getPageConfig(pageConfigResponse);
  const props: Props = {
    ...pageConfig,
    recentProjects: projects,
  };

  return {
    props,
    revalidate: 60,
  };
};

interface Props extends PageConfig {
  recentProjects: ProjectCardProps[];
}
