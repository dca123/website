import { Tag } from "@chakra-ui/react";

export const renderSkillTags = (skills: string[]) =>
  skills.map((skill) => {
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
