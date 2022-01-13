import {
  Heading,
  OrderedList,
  ListItem,
  Box,
  Text,
  VStack,
  UnorderedList,
} from "@chakra-ui/react";
import Image from "next/image";
import {
  BlockInterface,
  ExternalImageInterface,
} from "../pages/projects/[slug]";

export const renderBlocks = (blocks: BlockInterface[]) =>
  blocks.map((block: BlockInterface, index) => {
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
      case "bulleted_list_item":
        return (
          <UnorderedList pl={10} key={index}>
            {(block.data as string[]).map((item: string, index: number) => (
              <ListItem key={index} py={0.5}>
                <Text fontSize="lg" fontWeight="400">
                  {item}
                </Text>
              </ListItem>
            ))}
          </UnorderedList>
        );
      case "image":
        return (
          <VStack py="4" alignSelf="center" align="flex-start" key={block.id}>
            <Box overflow="clip" borderRadius="lg" w={["xs", "lg", "2xl"]}>
              <Image
                src={(block.data as ExternalImageInterface).url}
                alt="image"
                layout="responsive"
                objectFit="cover"
                width="100"
                height="100"
              />
            </Box>
            <Text variant="caption" pl="2">
              {(block.data as ExternalImageInterface).caption}
            </Text>
          </VStack>
        );
      default:
        return <Text key={index}>Block not recognized</Text>;
    }
  });
