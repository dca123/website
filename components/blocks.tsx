import { ExternalLinkIcon } from "@chakra-ui/icons";
import {
  Heading,
  OrderedList,
  ListItem,
  Box,
  Text,
  VStack,
  UnorderedList,
  Code,
  Link,
} from "@chakra-ui/react";

import Image from "next/image";
import { BlockInterface, ExternalImage, RichText } from "../types";

const RenderText = ({ content }: { content: RichText }) => {
  const { code, bold, italic, underline, text, link } = content;
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
  if (link !== null) {
    textNode = (
      <Link href={link}>
        <Text as="u">{textNode}</Text>
        <ExternalLinkIcon mx="4px" mb="4px" />
      </Link>
    );
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

const RenderTextArray = ({
  richTextArray,
}: {
  richTextArray: RichText | RichText[];
}) => {
  if (Array.isArray(richTextArray)) {
    const textArray = richTextArray.map((text, textIndex) => (
      <RenderText content={text as RichText} key={textIndex} />
    ));
    return <Box>{textArray}</Box>;
  }
  return <RenderText content={richTextArray} />;
};

export const renderBlocks = (blocks: BlockInterface[]) =>
  blocks.map((block: BlockInterface, index) => {
    switch (block.type) {
      case "paragraph":
        return (
          <RenderTextArray
            key={index}
            richTextArray={block.data as RichText[] | RichText}
          />
        );
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
                <RenderTextArray richTextArray={item} />
              </ListItem>
            ))}
          </OrderedList>
        );
      case "bulleted_list_item":
        return (
          <UnorderedList pl={10} key={index}>
            {(block.data as RichText[]).map((item: RichText, index: number) => (
              <ListItem key={index} py={0.5}>
                <RenderTextArray richTextArray={item} />
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
