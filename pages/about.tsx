import { Box, Center, Heading, VStack } from "@chakra-ui/react";
import Layout from "../components/Layout";
import Image from "next/image";
import { renderBlocks } from "../components/blocks";
import { AboutPageProps } from "../types";
import { GetStaticProps, NextPage } from "next";

const AboutMe: NextPage<AboutPageProps> = ({ blocks }) => {
  const blocksContent = renderBlocks(blocks);
  return (
    <Layout>
      <Title title="About Me" />
      <Heading
        fontSize="2xl"
        fontWeight="500"
        alignSelf="center"
        letterSpacing="widest"
      >
        {"About Me"}
      </Heading>
      <VStack w="full" pt="8">
        <Center>
          <Box borderRadius="lg" w={["xs", "md"]} mb="10%" overflow="clip">
            <Image
              priority
              alt="Picture of me"
              width={112}
              height={120}
              objectFit="cover"
              layout="responsive"
              sizes="50vw"
              src={img}
              placeholder="blur"
            />
          </Box>
        </Center>
        <VStack align="flex-start">{blocksContent}</VStack>
      </VStack>
    </Layout>
  );
};

export default AboutMe;

import { Client } from "@notionhq/client";
import { responseToBlocks } from "../lib/notion";
import img from "../public/images/me.jpg";
import { Title } from "../components/Title";
import { ProjectContentResponse } from "../types/pageResponse";
const notion = new Client({ auth: process.env.NOTION_API_KEY });

export const getStaticProps: GetStaticProps = async () => {
  const aboutMePageId = "0edd4fa3cada44b3a8157195562489d7";
  const pageContentResponse = await notion.blocks.children.list({
    block_id: aboutMePageId,
  });

  return {
    props: {
      blocks: await responseToBlocks(
        pageContentResponse as ProjectContentResponse
      ),
    },
    revalidate: 60,
  };
};
