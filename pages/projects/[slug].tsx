import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import {
  Box,
  Divider,
  Flex,
  Heading,
  HStack,
  Image,
  ListItem,
  OrderedList,
  Tag,
  Text,
  VStack,
} from "@chakra-ui/react";
import Layout from "../../components/layout";
import { ParsedUrlQuery } from "querystring";

interface ProjectPage {
  title: string;
  date: string;
  github: string;
  headerImageUrl: string;
  skills: string[];
  blocks: Block[];
}

interface Block {
  id: string;
  type: string;
  data: string | string[];
}

const DotaPage: NextPage<ProjectPage> = ({
  title,
  date,
  github,
  headerImageUrl,
  skills,
  blocks,
}: ProjectPage) => {
  const skillStack = skills.map((skill) => {
    return (
      <Tag
        size="lg"
        colorScheme="orange"
        fontWeight="700"
        key="tag"
        mx="1"
        my="1"
      >
        {skill}
      </Tag>
    );
  });

  const blocksContent = blocks.map((block: Block, index) => {
    switch (block.type) {
      case "paragraph":
        return (
          <Text key={index} fontSize="md">
            {block.data}
          </Text>
        );
      case "heading_1":
        return (
          <Heading
            key={index}
            letterSpacing="wider"
            fontWeight="600"
            pt={index !== 0 ? "4" : "0"}
          >
            {block.data}
          </Heading>
        );
      case "heading_2":
        return (
          <Heading
            key={index}
            letterSpacing="wide"
            fontSize="3xl"
            fontWeight="500"
            pt={"2"}
          >
            {block.data}
          </Heading>
        );
      case "numbered_list_item":
        return (
          <OrderedList pl={10} key={index}>
            {(block.data as string[]).map((item: string, index: number) => (
              <ListItem key={index} py={1}>
                <Text fontSize="md" fontWeight="400">
                  {item}
                </Text>
              </ListItem>
            ))}
          </OrderedList>
        );
      // case "image":
      //   return (
      //     <Box py="4" alignSelf="center">
      //       <Box overflow="clip" borderRadius="lg" maxH="md" maxW="2xl">
      //         <Image src={block.data} alt="image" objectFit="cover" />
      //       </Box>
      //     </Box>
      //   );
      default:
        return <Text key={index}>Block not recognized</Text>;
    }
  });

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

// const getProjectIdFromSlug = async (slug: string) => {
//   const database_id = "4f1fd603748b44d58615d782979d7a1e";
//   const response: QueryDatabaseResponse = await notion.databases.query({
//     database_id,
//     filter: {
//       property: "slug",
//       text: {
//         contains: slug,
//       },
//     },
//   });

//   if (response.results.length === 0) {
//     throw new Error("No project found");
//   }

//   return response.results[0].id;
// };

interface Props extends ParsedUrlQuery {
  slug: string;
}

import { readFileSync } from "fs";
import { PageResponse, ResultsEntity } from "../../types/pageResponse";

export const getStaticProps: GetStaticProps<ProjectPage, Props> = async (
  context
) => {
  if (!context.params) {
    throw new Error("No params available");
  }
  const { slug } = context.params;
  // const projectId = await getProjectIdFromSlug(slug);
  // console.log(projectId);

  // const response = await notion.blocks.children.list({
  //   block_id: projectId,
  // });

  // writeFileSync(`./test_data/pages/${slug}.json`, JSON.stringify(response));
  const jsonString = readFileSync(`./test_data/pages/${slug}.json`, {
    encoding: "utf8",
  });
  const response: PageResponse = JSON.parse(jsonString);

  const extractContentFromBlock = (
    blockType: string,
    block: ResultsEntity
  ): string => {
    switch (blockType) {
      case "heading_1":
        return block.heading_1?.text?.[0].plain_text ?? "";
      case "heading_2":
        return block.heading_2?.text?.[0].plain_text ?? "";
      case "paragraph":
        return block.paragraph?.text?.[0]?.plain_text ?? "";
      case "numbered_list_item":
        return block.numbered_list_item?.text?.[0]?.plain_text ?? "";
      default:
        return "text not found";
    }
  };

  const extractListsFromBlock = (blocks: Block[]) => {
    let isList = false;
    const ans = Array<Block>();

    for (let i = 0; i < blocks.length; i += 1) {
      console.log(ans);
      const block = blocks[i];

      if (isList && block.type == "numbered_list_item") {
        const new_block_data = ans[ans.length - 1].data as string[];
        new_block_data.push(block.data as string);
        ans[ans.length - 1].data = new_block_data;
        continue;
      } else if (isList && block.type != "numbered_list_item") {
        isList = false;
      } else if (isList == false && block.type == "numbered_list_item") {
        isList = true;

        const new_block: Block = {
          id: block.id,
          type: block.type,
          data: [block.data as string],
        };
        ans.push(new_block);
        continue;
      }
      ans.push(block);
    }
    return ans;
  };

  const blocks: Block[] =
    response.results?.map((result, index) => {
      return {
        id: index.toString(),
        type: result.type,
        data: extractContentFromBlock(result.type, result),
      };
    }) ?? [];

  return {
    props: {
      title: "Dota 2",
      date: "January 10th, 2019",
      github: "github.com/dca123/hitchspots",
      headerImageUrl: "/images/image.jpg",
      skills: ["Node.js", "React", "Next.js", "TypeScript", "Chakra UI"],
      blocks: extractListsFromBlock(blocks),
    },
  };
};

// const notion = new Client({ auth: process.env.NOTION_API_KEY });

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {
        params: {
          slug: "dota-2",
        },
      },
      {
        params: {
          slug: "pre-rendering",
        },
      },
    ],
    fallback: "blocking",
  };
};
