import { Box, Heading, VStack } from "@chakra-ui/react";
import Layout from "../components/Layout";
import Image from "next/image";
import { renderBlocks } from "../components/blocks";
import { AboutPageProps } from "../types";
import { GetStaticProps, NextPage } from "next";

const AboutMe: NextPage<AboutPageProps> = ({ blocks }) => {
  const blocksContent = renderBlocks(blocks);
  return (
    <Layout>
      <Heading
        fontSize="2xl"
        fontWeight="500"
        alignSelf="center"
        letterSpacing="widest"
      >
        {"About Me"}
      </Heading>
      <VStack w="full" pt="8">
        <VStack alignSelf="center">
          <Box borderRadius="lg" w={["xs", "md"]} mb="10%" overflow="clip">
            <Image
              alt="Picture of me"
              width={112}
              height={120}
              objectFit="cover"
              layout="responsive"
              sizes="50vw"
              src="/images/me.jpg"
            />
          </Box>
        </VStack>
        {blocksContent}
      </VStack>
    </Layout>
  );
};

export default AboutMe;

import { Client } from "@notionhq/client";
import { readFileSync, writeFileSync } from "fs";
import { responseToBlocks } from "../lib/notion";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export const getStaticProps: GetStaticProps = async () => {
  let pageContentResponse;

  if (process.env.NODE_ENV === "production") {
    const aboutMePageId = "0edd4fa3cada44b3a8157195562489d7";
    pageContentResponse = await notion.blocks.children.list({
      block_id: aboutMePageId,
    });
    // writeFileSync(
    //   `./test_data/about_me.json`,
    //   JSON.stringify(pageContentResponse)
    // );
  } else {
    const pageContentJsonString = readFileSync(`./test_data/about_me.json`, {
      encoding: "utf8",
    });
    pageContentResponse = JSON.parse(pageContentJsonString);
  }

  return {
    props: {
      blocks: await responseToBlocks(pageContentResponse),
    },
  };
};
