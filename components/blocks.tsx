import {
  Heading,
  OrderedList,
  ListItem,
  Box,
  Img,
  Text,
} from "@chakra-ui/react";

import { Block } from "../pages/projects/[slug]";

export const renderBlocks = (blocks: Block[]) =>
  blocks.map((block: Block, index) => {
    switch (block.type) {
      case "paragraph":
        return (
          <Text key={index} fontSize="lg" fontWeight="400" lineHeight="tall">
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
              <ListItem key={index} py={0.5}>
                <Text fontSize="lg" fontWeight="400">
                  {item}
                </Text>
              </ListItem>
            ))}
          </OrderedList>
        );
      case "image":
        return (
          <Box py="4" alignSelf="center">
            <Box overflow="clip" borderRadius="lg" maxH="md" maxW="2xl">
              <Img src={block.data as string} alt="image" objectFit="cover" />
            </Box>
          </Box>
        );
      default:
        return <Text key={index}>Block not recognized</Text>;
    }
  });
