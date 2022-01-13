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
import { readFileSync } from "fs";
import { AcceptedTypes } from "../../types/pageResponse";
import { renderBlocks } from "../../components/blocks";
import { renderSkillTags } from "../../components/SkillsTagList";
export interface ProjectPageProps {
  title: string;
  date: string;
  github: string;
  headerImageUrl: string;
  skills: string[];
  blocks: BlockInterface[];
}

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

const DotaPage: NextPage<ProjectPageProps> = ({
  title,
  date,
  github,
  headerImageUrl,
  skills,
  blocks,
}: ProjectPageProps) => {
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
              {github}
            </Heading>
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

        <VStack align="flex-start">{blocksContent}</VStack>
      </VStack>
    </Layout>
  );
};

export default DotaPage;

import { Client } from "@notionhq/client";
import { responseToBlocks } from "../../lib/notion";
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

interface Props extends ParsedUrlQuery {
  slug: string;
}

export const getStaticProps: GetStaticProps<ProjectPageProps, Props> = async (
  context
) => {
  if (!context.params) {
    throw new Error("No params available");
  }
  const { slug } = context.params;

  let response;
  if (process.env.NODE_ENV === "production") {
    const projectId = await getProjectIdFromSlug(slug);
    response = await notion.blocks.children.list({
      block_id: projectId,
    });
    // writeFileSync(`./test_data/pages/${slug}.json`, JSON.stringify(response));
  } else {
    const jsonString = readFileSync(`./test_data/pages/${slug}.json`, {
      encoding: "utf8",
    });
    response = JSON.parse(jsonString);
  }

  return {
    props: {
      title: "Dota 2",
      date: "January 10th, 2019",
      github: "github.com/dca123/hitchspots",
      headerImageUrl: "/images/image.jpg",
      skills: ["Node.js", "React", "Next.js", "TypeScript", "Chakra UI"],
      blocks: responseToBlocks(response),
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};
