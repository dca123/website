import {
  Box,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  useColorModeValue,
  Text,
  HTMLChakraProps,
  chakra,
} from "@chakra-ui/react";
import { HTMLMotionProps, motion } from "framer-motion";
import Link from "next/link";
import Layout from "../../components/Layout";

type Merge<P, T> = Omit<P, keyof T> & T;

type MotionBoxProps = Merge<HTMLChakraProps<"div">, HTMLMotionProps<"div">>;

export const MotionBox: React.FC<MotionBoxProps> = motion(chakra.div);

const Projects = () => {
  const bg = useColorModeValue("gray.200", "gray.700");
  const shadow = useColorModeValue("4px 4px #ED8936", "4px 4px #F6AD55");

  const items = [1, 2, 3, 4, 5, 6].map((num) => (
    <Link href="/" passHref key={num}>
      <MotionBox
        boxShadow="0px 0px #ED8936"
        // transition={{ ease: "easeOut" }}
        whileHover={{
          cursor: "pointer",
          boxShadow: shadow,
          scale: 1.01,
          // transition: { bounce: 1 },
        }}
        whileTap={{ scale: 0.9 }}
        borderRadius="md"
      >
        <Flex
          alignItems="flex-start"
          justify="space-between"
          direction="column"
          px={7}
          bg={bg}
          // bgGradient={bg}
          h="full"
          borderRadius="md"
          // _hover={{
          //   boxShadow: shadow,
          //   cursor: "pointer",
          // }}
        >
          <Box py={6}>
            <Heading
              variant="card"
              fontSize="xl"
              fontWeight="600"
              letterSpacing="widest"
            >
              {`Project ${num}`}
            </Heading>
            <Text variant="card" pt={2} lineHeight="normal">
              {
                "Slam varial opposite footed finger flip ollie hole. Shiloh Greathouse lip bone air pressure flip ollie north slappy. Front foot impossible gnar bucket "
              }
            </Text>
          </Box>
        </Flex>
      </MotionBox>
    </Link>
  ));

  return (
    <Layout>
      <Heading
        fontSize="2xl"
        fontWeight="500"
        alignSelf="center"
        letterSpacing="widest"
      >
        {"All Projects"}
      </Heading>
      <SimpleGrid columns={[1, 2, 3]} spacing={10} mt={16}>
        {items}
      </SimpleGrid>
    </Layout>
  );
};

export default Projects;
