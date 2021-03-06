import {
  Box,
  HStack,
  Tag,
  Text,
  Heading,
  Flex,
  useColorModeValue,
  chakra,
  HTMLChakraProps,
  LinkBox,
  LinkOverlay,
} from "@chakra-ui/react";
import Image from "next/image";
import { ProjectCardProps } from "../types";
import { HTMLMotionProps, motion } from "framer-motion";
type Merge<P, T> = Omit<P, keyof T> & T;

type MotionBoxProps = Merge<HTMLChakraProps<"div">, HTMLMotionProps<"div">>;

export const MotionBox: React.FC<MotionBoxProps> = motion(chakra.div);

export default function ProjectCard({
  title,
  projectImage: imageUrl,
  skills,
  slug,
  description,
  imageBlur,
}: ProjectCardProps) {
  // const bg = useColorModeValue(
  //   "linear(to-t, hsla(214, 32%, 90%, 1), hsla(214, 32%, 90%, 0.2))",
  //   "linear(to-t, hsla(214, 32%, 20%, 0.8), hsla(214, 32%, 20%, 0.6))"
  // );
  const shadow = useColorModeValue("5px 4px #DD6B20", "5px 4px #ED8936");
  const bg = useColorModeValue("gray.200", "gray.700");
  const skillStack = skills.slice(0, 3).map((skill, index) => {
    return (
      <Tag size="md" key={skill + index}>
        {skill}
      </Tag>
    );
  });
  return (
    <MotionBox
      boxShadow="0px 0px #ED8936"
      // transition={{ ease: "easeInOut", duration: 0.125 }}
      whileHover={{
        scale: 1.01,
        cursor: "pointer",
        boxShadow: shadow,
        // transition: { bounce: 1 },
      }}
      whileTap={{ scale: 0.99 }}
      borderRadius="md"
    >
      <LinkBox borderRadius="lg" overflow="hidden" h="full">
        <Flex direction="column" h="full">
          <Box>
            <Image
              src={imageUrl}
              alt="image"
              objectFit="cover"
              layout="responsive"
              sizes="50vw, 20vw"
              width={120}
              height={75}
              blurDataURL={imageBlur}
              placeholder="blur"
            />
          </Box>
          <Flex
            alignItems="flex-start"
            justify="space-between"
            direction="column"
            px={7}
            bg={bg}
            // bgGradient={bg}
            h="full"
          >
            <Box py={5}>
              <Heading fontSize="2xl" variant="card">
                <LinkOverlay href={"/projects/" + slug}>{title}</LinkOverlay>
              </Heading>
              <Text variant="card" pt={1}>
                {description}
              </Text>
            </Box>
            <Box pb={8}>
              <HStack>{skillStack}</HStack>
            </Box>
          </Flex>
        </Flex>
      </LinkBox>
    </MotionBox>
  );
}
