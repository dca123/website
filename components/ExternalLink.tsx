import { Button } from "@chakra-ui/react";

interface ExternalLinkProps {
  href: string;
  title: string;
  solid?: boolean;
}

export const ExternalLink = ({
  href,
  title,
  solid: main,
}: ExternalLinkProps) => {
  let button;
  if (main) {
    button = (
      <Button
        size="md"
        fontWeight="700"
        color="white"
        bgGradient="linear(to-r, hsla(27, 84%, 55%, 1), hsla(17, 84%, 55%, 0.8))"
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
      <Button size="md" colorScheme="gray" variant="ghost" fontWeight="400">
        {title}
      </Button>
    );
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {button}
    </a>
  );
};
