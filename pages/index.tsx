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

const ExternalLink = ({
  href,
  title,
  solid: main,
}: {
  href: string;
  title: string;
  solid?: boolean;
}) => {
  let button;
  if (main) {
    button = (
      <Button
        size="md"
        fontWeight="700"
        color="white"
        bgGradient="linear(to-r, hsla(27, 84%, 55%, 1), hsla(17, 84%, 55%, 0.8))"
        _hover={{
          bgGradient:
            "linear(to-r, hsla(27, 84%, 45%, 1), hsla(17, 84%, 45%, 0.8))",
        }}
      >
        {title}
      </Button>
    );
  } else {
    button = (
      <Button size="md" colorScheme="gray" variant="ghost" fontWeight="400">
        {title}
      </Button>
    );
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {button}
    </a>
  );
};

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
        imageUrl={project.imageUrl}
        skills={project.skills}
        description={project.description}
        slug={project.slug}
      />
    );
  });

  return (
    <Layout>
      <VStack align="start">
        <Heading size="xl" fontWeight="400">
          Hey,
        </Heading>
        <HStack py="2">
          <Heading size="3xl" fontWeight="400">
            {"I'm"}
          </Heading>
          <Heading size="3xl" py="1" bgGradient={nameGradient} bgClip="text">
            Devinda
          </Heading>
        </HStack>
        <Heading size="3xl" py="1" bgGradient={nameGradient} bgClip="text">
          Senanayake
        </Heading>
        <Box bgColor={subTextBackground} py="6" px="4" borderRadius="lg">
          <Text fontSize={18}>{subText}</Text>
        </Box>
        <Box height="2"></Box>
        <HStack justify="space-between" title="Resume">
          <ExternalLink href={resumeUrl} title="Resume" solid />
          <ExternalLink href={emailUrl} title="Email" />
          <ExternalLink href={linkedInUrl} title="LinkedIn" />
          <ExternalLink href={githubUrl} title="Github" />
        </HStack>
        <Box py="8" w="full">
          <Divider />
        </Box>
        <Heading pb="4" size="lg" fontWeight="400">
          {"Stuff I've Coded"}
        </Heading>
        <SimpleGrid spacing={6} columns={[1, 2, 3]}>
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

export const getStaticProps: GetStaticProps = async () => {
  const projects: Project[] = await getProjects();

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

export interface Project {
  title: string;
  slug: string;
  imageUrl: string;
  description: string;
  skills: string[];
}

interface Props {
  subText: string;
  resumeUrl: string;
  emailUrl: string;
  linkedInUrl: string;
  githubUrl: string;
  recentProjects: Project[];
}

import {
  ProjectsResponse,
  Properties,
  ResultsEntity,
} from "../types/projectReponse";
import { readFileSync } from "fs";

// const notion = new Client({ auth: process.env.NOTION_API_KEY });

const getProjects = async () => {
  // const database_id = "4f1fd603748b44d58615d782979d7a1e";
  // const response: QueryDatabaseResponse = await notion.databases.query({
  //   database_id,
  // });

  // fs.writeFile("test_data/database.json", JSON.stringify(response), "utf8");

  const jsonString = readFileSync("./test_data/database.json", {
    encoding: "utf8",
  });
  const response: ProjectsResponse = JSON.parse(jsonString);

  const extractProjectProperties = (property: Properties): Project => {
    return {
      title: property.name.title?.[0].plain_text ?? "",
      slug: property.slug.rich_text?.[0].plain_text ?? "",
      imageUrl: `https://picsum.photos/id/${Math.floor(
        Math.random() * (500 - 300) + 500
      )}/600/300`,
      description: property.description.rich_text?.[0].plain_text ?? "",
      skills:
        property.skills.multi_select?.map((skill) => skill.name).slice(0, 3) ??
        [],
    };
  };

  const projects: Project[] =
    response.results
      ?.map((result: ResultsEntity) => {
        const project = extractProjectProperties(result.properties);
        return project;
      })
      .slice(0, 6) ?? [];

  return projects;
};
