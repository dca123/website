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
import { BlockInterface, ExternalImage, RichText } from "../types";

const renderText = (richText: RichText, index: number) => {
  const { bold, italic, underline, text } = richText;
  let textNode: JSX.Element = <span>{text}</span>;
  if (italic) {
    textNode = <Text as="em">{text}</Text>;
  }
  if (underline) {
    textNode = <Text as="u">{textNode}</Text>;
  }
  return (
    <Text
      as="span"
      key={index}
      fontSize="lg"
      fontWeight={bold ? "700" : "400"}
      lineHeight="tall"
    >
      {textNode}
    </Text>
  );
};

export const renderBlocks = (blocks: BlockInterface[]) =>
  blocks.map((block: BlockInterface, index) => {
    switch (block.type) {
      case "paragraph":
        if (Array.isArray(block.data)) {
          const textArray = block.data.map((text, textIndex) => {
            return renderText(text as RichText, textIndex);
          });
          return <Box key={index}>{textArray}</Box>;
        }
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
                src={(block.data as ExternalImage).url}
                alt={(block.data as ExternalImage).caption}
                layout="responsive"
                objectFit="cover"
                sizes="50vw"
                width={100}
                height={100}
              />
            </Box>
            <Text variant="caption" pl="2">
              {(block.data as ExternalImage).caption}
            </Text>
          </VStack>
        );
      default:
        return <Text key={index}>Block not recognized</Text>;
    }
  });
