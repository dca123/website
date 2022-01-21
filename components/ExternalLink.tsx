import { Button, Icon, useColorModeValue } from "@chakra-ui/react";
import { IconType } from "react-icons";

interface ExternalLinkProps {
  href: string;
  title: string;
  solid?: boolean;
  icon?: IconType;
}

export const ExternalLink = ({
  href,
  title,
  solid: main,
  icon,
}: ExternalLinkProps) => {
  let button;
  const iconColor = useColorModeValue("gray.700", "gray.300");
  const backgroundColor = useColorModeValue("gray.200", "gray.800");

  if (main) {
    button = (
      <Button
        size="md"
        fontWeight="700"
        color="white"
        bgGradient="linear(to-r, hsla(27, 84%, 55%, 1), hsla(17, 84%, 55%, 0.8))"
        w="full"
        _hover={{
          bgGradient:
            "linear(to-r, hsla(27, 84%, 45%, 1), hsla(17, 84%, 45%, 0.8))",
        }}
      >
        {title}
      </Button>
    );
  } else {
    button = (
      <Button
        size="md"
        variant="ghost"
        fontWeight="400"
        w="full"
        _hover={{
          backgroundColor,
        }}
      >
        <Icon as={icon} boxSize="5" color={iconColor} />
      </Button>
    );
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {button}
    </a>
  );
};
