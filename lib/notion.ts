// const notion = new Client({ auth: process.env.NOTION_API_KEY });
import {
  Cover,
  ProjectPropertiesResponse,
  Properties,
} from "../types/projectReponse";
import { ProjectPropertiesResultsEntity } from "../types/projectReponse";

import {
  AcceptedTypes,
  ProjectContentResponse,
  ProjectContentResultsEntity,
  TextTypes,
} from "../types/pageResponse";
import {
  BlockData,
  BlockInterface,
  ExternalImage,
  PageConfig,
  PageConfigProperties,
  ProjectCardProps,
  ProjectProperties,
  RichText,
} from "../types";
import { PageConfigResponse } from "../types/pageConfig";

export const getPageConfig = (response: PageConfigResponse): PageConfig => {
  const pageConfig: PageConfig = {
    email: "",
    github: "",
    linkedin: "",
    resume: "",
    tagline: "",
  };
  response.results?.forEach((property) => {
    if (property.properties.property.title!.length < 1) {
      throw new Error(`Propert Config with id ${property.id} is missing`);
    }
    const propertyName =
      property.properties.property.title?.[0].plain_text ?? "";
    const propertyValue =
      property.properties.content.rich_text?.[0]?.plain_text ?? "";
    pageConfig[propertyName as PageConfigProperties] = propertyValue;
  });

  return pageConfig;
};

export const getProjects = (response: ProjectPropertiesResponse) => {
  const projects: ProjectCardProps[] =
    response.results
      ?.map((result: ProjectPropertiesResultsEntity) => {
        const project = extractProjectProperties(result.properties);
        const projectImage = extractProjectCoverImage(result.cover);
        return {
          ...project,
          projectImage,
        };
      })
      .slice(0, 6) ?? [];

  return projects;
};

export const getProjectSlugs = async (response: ProjectPropertiesResponse) => {
  const projects = getProjects(response);
  return projects.map((project) => ({ params: { slug: project.slug } }));
};

export const extractProjectCoverImage = (coverImage: Cover) => {
  if (coverImage.type === "external") {
    return coverImage.external?.url ?? "";
  } else if (coverImage.type === "file") {
    return coverImage.file?.url ?? "";
  }
  return "";
};

export const extractProjectProperties = (
  property: Properties
): ProjectProperties => ({
  title: property.name.title?.[0].plain_text ?? "",
  slug: property.slug.rich_text?.[0].plain_text ?? "",
  description: property.description.rich_text?.[0].plain_text ?? "",
  skills: property.skills.multi_select?.map((skill) => skill.name) ?? [],
  date: property.date.date.start,
  githubUrl: property.github.rich_text?.[0].plain_text ?? "",
});

const extractTextFromBlock = (
  blockType: TextTypes,
  block: ProjectContentResultsEntity
) => {
  if (block[blockType]!.text!.length > 1) {
    return (
      block[blockType]?.text?.map(
        (block) =>
          ({
            text: block?.plain_text ?? "",
            bold: block?.annotations.bold ?? false,
            underline: block?.annotations.underline ?? false,
            italic: block?.annotations.italic ?? false,
          } as RichText)
      ) ?? []
    );
  }
  return block[blockType]?.text?.[0]?.plain_text ?? "";
};

export const extractContentFromResponse = (
  blockType: AcceptedTypes,
  block: ProjectContentResultsEntity
): BlockData => {
  switch (blockType) {
    case "heading_1":
    case "heading_2":
    case "paragraph":
    case "numbered_list_item":
    case "bulleted_list_item":
      return extractTextFromBlock(blockType, block);
    case "image":
      return {
        url: block.image?.external.url,
        caption: block.image?.caption?.[0]?.plain_text,
      } as ExternalImage;
    default:
      return "text not found";
  }
};

export const groupListBlocks = (blocks: BlockInterface[]): BlockInterface[] => {
  const ans: BlockInterface[] = [];
  let tempList: string[] = [];
  let tempType: AcceptedTypes | undefined;
  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];
    switch (block.type) {
      case "numbered_list_item":
      case "bulleted_list_item":
        tempType = block.type;
        tempList.push((block as BlockInterface<string>).data);
        break;
      default:
        if (tempList.length > 0 && tempType) {
          ans.push({
            id: ans.length.toString(),
            type: tempType,
            data: tempList,
          });
          tempList = [];
        }
        ans.push(block);
        break;
    }
  }

  return ans;
};

export const responseToBlocks = (
  response: ProjectContentResponse
): BlockInterface[] => {
  let blockContent =
    response.results?.map((result, index) => {
      return {
        id: index.toString(),
        type: result.type,
        data: extractContentFromResponse(result.type, result),
      } as BlockInterface;
    }) ?? [];
  blockContent = groupListBlocks(blockContent);
  return blockContent;
};
