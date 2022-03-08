import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import {
  Box,
  Divider,
  Flex,
  Heading,
  HStack,
  Link,
  VStack,
} from "@chakra-ui/react";
import Layout from "../../components/Layout";
import { renderBlocks } from "../../components/blocks";
import { renderSkillTags } from "../../components/SkillsTagList";
import Image from "next/image";

const ProjectPage: NextPage<ProjectPageProps> = ({
  title,
  date,
  githubUrl,
  projectImage,
  skills,
  blocks,
  imageBlur,
}) => {
  const blocksContent = renderBlocks(blocks);
  const skillStack = renderSkillTags(skills);
  const githubUrlLink = "http://" + githubUrl;
  return (
    <Layout>
      <Title title={title} />
      <VStack align="flex-start">
        <HStack justify="space-between" w="full" mb={4}>
          <Heading
            fontSize="2xl"
            fontWeight="500"
            alignSelf="center"
            letterSpacing="widest"
          >
            {title}
          </Heading>
          <VStack align="flex-end">
            <Heading fontWeight="400" fontSize="sm">
              {date}
            </Heading>
            <Heading fontWeight="400" fontSize="sm">
              <Link href={githubUrlLink} isExternal={true}>
                github
              </Link>
            </Heading>
          </VStack>
        </HStack>
        <Box overflow="clip" borderRadius="lg" w="full" h="full">
          <Image
            src={projectImage}
            alt="image"
            layout="responsive"
            objectFit="cover"
            sizes="50vw"
            width={100}
            height={80}
            priority={true}
            placeholder="blur"
            blurDataURL={imageBlur}
          />
        </Box>
        <Flex pt={2} flexWrap="wrap">
          {skillStack}
        </Flex>
        <Box py="6" w="full">
          <Divider />
        </Box>
        <VStack align="flex-start">{blocksContent}</VStack>
      </VStack>
    </Layout>
  );
};

export default ProjectPage;

import { Client } from "@notionhq/client";
import {
  extractProjectCoverImage,
  extractProjectProperties,
  getProjectSlugs,
  responseToBlocks,
} from "../../lib/notion";
import { ProjectPageProps } from "../../types";
import { ParsedUrlQuery } from "querystring";
import { getBase64PlaceHolder } from "../../lib/placeholder";
import { Title } from "../../components/Title";
import {
  ProjectPropertiesResponse,
  ProjectPropertiesResultsEntity,
} from "../../types/projectReponse";
import { ProjectContentResponse } from "../../types/pageResponse";
import { cache } from "../../lib/cache";
const notion = new Client({ auth: process.env.NOTION_API_KEY });

const getProjectIdFromSlug = async (slug: string) => {
  const database_id = "4f1fd603748b44d58615d782979d7a1e";
  const response = await notion.databases.query({
    database_id,
    filter: {
      property: "slug",
      text: {
        contains: slug,
      },
    },
  });

  if (response.results.length === 0) {
    throw new Error("No project found");
  }

  return response.results[0].id;
};

interface ProjectPageUrlProps extends ParsedUrlQuery {
  slug: string;
}

type ProjectResponses = {
  pagePropertiesResponse: ProjectPropertiesResultsEntity;
  pageContentResponse: ProjectContentResponse;
};

const projectResponses = async (slug: string): Promise<ProjectResponses> => {
  if (process.env.APP_ENV === "development") {
    const responseCache = cache.get<ProjectResponses>(slug);
    console.log(cache.keys());
    if (responseCache !== undefined) {
      console.log("Using cached response");
      return responseCache;
    }
    console.log("No Cached response");
  }

  const projectId = await getProjectIdFromSlug(slug);
  const pagePropertiesResponse = await notion.pages.retrieve({
    page_id: projectId,
  });

  const pageContentResponse = await notion.blocks.children.list({
    block_id: projectId,
  });

  if (process.env.APP_ENV === "development") {
    console.log("Caching response");
    cache.set(slug, { pagePropertiesResponse, pageContentResponse });
  }

  return {
    pagePropertiesResponse:
      pagePropertiesResponse as ProjectPropertiesResultsEntity,
    pageContentResponse: pageContentResponse as ProjectContentResponse,
  };
};

export const getStaticProps: GetStaticProps<
  ProjectPageProps,
  ProjectPageUrlProps
> = async (context) => {
  if (!context.params) {
    throw new Error("No params available");
  }
  const { slug } = context.params;
  const { pagePropertiesResponse, pageContentResponse } =
    await projectResponses(slug);
  const pageProperties = extractProjectProperties(
    (pagePropertiesResponse as ProjectPropertiesResultsEntity).properties
  );
  const projectImage = extractProjectCoverImage(
    (pagePropertiesResponse as ProjectPropertiesResultsEntity).cover
  );
  const projectImageBlur = await getBase64PlaceHolder(projectImage, 32);
  return {
    props: {
      ...pageProperties,
      projectImage,
      projectImageBlur,
      blocks: await responseToBlocks(
        pageContentResponse as ProjectContentResponse
      ),
    },
    revalidate: 60,
  };
};

export const getStaticPaths: GetStaticPaths<ProjectPageUrlProps> = async () => {
  const database_id = "4f1fd603748b44d58615d782979d7a1e";
  const response = await notion.databases.query({
    database_id,
  });
  // writeFileSync("test_data/database.json", JSON.stringify(response), "utf8");

  const paths = await getProjectSlugs(response as ProjectPropertiesResponse);

  return {
    paths,
    fallback: "blocking",
  };
};
