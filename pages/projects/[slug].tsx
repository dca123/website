import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import {
  Box,
  Divider,
  Flex,
  Heading,
  HStack,
  Image,
  VStack,
} from "@chakra-ui/react";
import Layout from "../../components/layout";
import { ParsedUrlQuery } from "querystring";
import { readFileSync, writeFileSync } from "fs";
import { AcceptedTypes } from "../../types/pageResponse";
import { renderBlocks } from "../../components/blocks";
import { renderSkillTags } from "../../components/SkillsTagList";
export interface ExternalImageInterface {
  url: string;
  caption: string;
}

type Lists = string[];

export type BlockData = string | Lists | ExternalImageInterface;
export interface BlockInterface<T = BlockData> {
  id: string;
  type: AcceptedTypes;
  data: T;
}

const DotaPage: NextPage<ProjectPagePropsInterface> = ({
  title,
  date,
  githubUrl,
  projectImage,
  skills,
  blocks,
}: ProjectPagePropsInterface) => {
  const blocksContent = renderBlocks(blocks);
  const skillStack = renderSkillTags(skills);

  return (
    <Layout>
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
              {githubUrl}
            </Heading>
          </VStack>
        </HStack>
        <Box overflow="clip" borderRadius="lg" maxH="xs">
          <Image src={projectImage} alt="image" objectFit="cover" />
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

export default DotaPage;

import { Client } from "@notionhq/client";
import {
  extractProjectProperties,
  getProjectSlugs,
  responseToBlocks,
} from "../../lib/notion";
import { ProjectPagePropsInterface } from "..";
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

export const getStaticProps: GetStaticProps<
  ProjectPagePropsInterface,
  ProjectPageUrlProps
> = async (context) => {
  if (!context.params) {
    throw new Error("No params available");
  }
  const { slug } = context.params;

  let pageContentResponse;
  let pagePropertiesResponse;

  if (process.env.NODE_ENV === "production") {
    const projectId = await getProjectIdFromSlug(slug);
    pagePropertiesResponse = await notion.pages.retrieve({
      page_id: projectId,
    });

    pageContentResponse = await notion.blocks.children.list({
      block_id: projectId,
    });
    // writeFileSync(
    //   `./test_data/pagesProperty/${slug}.json`,
    //   JSON.stringify(pagePropertiesResponse)
    // );
    // writeFileSync(
    //   `./test_data/pages/${slug}.json`,
    //   JSON.stringify(pageContentResponse)
    // );
  } else {
    const pageContentJsonString = readFileSync(
      `./test_data/pages/${slug}.json`,
      {
        encoding: "utf8",
      }
    );
    const pagePropertiesJsonString = readFileSync(
      `./test_data/pagesProperty/${slug}.json`,
      {
        encoding: "utf8",
      }
    );

    pageContentResponse = JSON.parse(pageContentJsonString);
    pagePropertiesResponse = JSON.parse(pagePropertiesJsonString);
  }

  const pageProperties = extractProjectProperties(
    pagePropertiesResponse.properties
  );

  return {
    props: {
      ...pageProperties,
      blocks: responseToBlocks(pageContentResponse),
    },
  };
};

export const getStaticPaths: GetStaticPaths<ProjectPageUrlProps> = async () => {
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

  const paths = await getProjectSlugs(response);

  return {
    paths,
    fallback: "blocking",
  };
};
