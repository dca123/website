import {
  Box,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  VStack,
  Text,
} from "@chakra-ui/react";
import Layout from "../components/Layout";
import Image from "next/image";
const AboutMe = () => {
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
          <Box borderRadius="lg" w={["xs", "lg"]} mb="10%" overflow="clip">
            <Image
              alt="Picture of me"
              width={112}
              height={120}
              objectFit="cover"
              layout="responsive"
              // sizes="50vw"
              // className={styles.blob}
              src="/images/me.jpg"
            />
          </Box>
        </VStack>
        <Text>
          {
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada vel lectus a scelerisque. Praesent dolor urna, varius id urna eget, scelerisque suscipit orci. Aliquam felis urna, viverra ultricies gravida vel, aliquam sit amet sapien. Vivamus accumsan elit et felis vehicula, in suscipit dui tempus. Nullam erat nibh, venenatis sit amet pharetra porttitor, aliquam vitae tortor. Sed in venenatis lectus. In hac habitasse platea dictumst. Aenean facilisis neque enim. Maecenas dui dolor, semper eget mi in, feugiat fermentum mi. In non vestibulum sem. Nam ut nisi eu ipsum volutpat molestie. Nunc ante arcu, finibus eu velit eget, euismod pellentesque est."
          }
        </Text>
        <Text>
          {
            "Quisque euismod enim eu tellus tincidunt, non pharetra purus tempor. Etiam ut pretium arcu. Nulla eget dapibus mi. Pellentesque iaculis suscipit ex eu luctus. Pellentesque ultricies pharetra sapien, a posuere diam gravida sit amet. Vivamus id porttitor lectus, ut rutrum metus. Nam iaculis, metus tincidunt fringilla accumsan, purus sem aliquam velit, a volutpat dolor arcu id risus. Aenean auctor auctor tortor vitae porta. Integer feugiat facilisis luctus. Proin aliquet scelerisque euismod. Integer ac enim et diam condimentum volutpat non eget diam."
          }
        </Text>
      </VStack>
    </Layout>
  );
};

export default AboutMe;
