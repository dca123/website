import {
  Heading,
  OrderedList,
  ListItem,
  Box,
  Text,
  VStack,
  UnorderedList,
  Code,
} from "@chakra-ui/react";

import Image from "next/image";
import { BlockInterface, ExternalImage, RichText } from "../types";

const RenderText = ({ content }: { content: RichText }) => {
  const { code, bold, italic, underline, text } = content;
  let textNode: JSX.Element = <>{text}</>;
  if (italic) {
    textNode = <Text as="em">{textNode}</Text>;
  }
  if (underline) {
    textNode = <Text as="u">{textNode}</Text>;
  }
  if (code) {
    textNode = <Code colorScheme="orange">{textNode}</Code>;
  }
  return (
    <Text
      as="span"
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
            return <RenderText content={text as RichText} key={textIndex} />;
          });
          return <Box key={index}>{textArray}</Box>;
        }
        return <RenderText content={block.data as RichText} />;
      case "heading_1":
        return (
          <Heading
            key={index}
            letterSpacing="wider"
            fontWeight="600"
            pt={index !== 0 ? "4" : "0"}
          >
            {(block.data as RichText).text}
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
            {(block.data as RichText).text}
          </Heading>
        );
      case "numbered_list_item":
        return (
          <OrderedList pl={10} key={index}>
            {(block.data as RichText[]).map((item: RichText, index: number) => (
              <ListItem key={index} py={0.5}>
                <RenderText content={item} />
              </ListItem>
            ))}
          </OrderedList>
        );
      case "bulleted_list_item":
        return (
          <UnorderedList pl={10} key={index}>
            {(block.data as RichText[]).map((item: RichText, index: number) => (
              <ListItem key={index} py={0.5}>
                <RenderText content={item} />
              </ListItem>
            ))}
          </UnorderedList>
        );
      case "image":
        return (
          <VStack py="4" alignSelf="center" align="flex-start" key={index}>
            <Box overflow="clip" borderRadius="lg" w={["xs", "lg", "2xl"]}>
              <Image
                src={(block.data as ExternalImage).url}
                alt={(block.data as ExternalImage).caption}
                layout="responsive"
                objectFit="cover"
                sizes="50vw"
                width={100}
                height={100}
                placeholder="blur"
                blurDataURL={(block.data as ExternalImage).blurUrl}
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
