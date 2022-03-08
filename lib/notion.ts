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
import { getBase64PlaceHolder } from "./placeholder";
import { Client } from "@notionhq/client";

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

const notion = new Client({ auth: process.env.NOTION_API_KEY });
export const getProjects = async (response: ProjectPropertiesResponse) => {
  const projects =
    response.results
      ?.map(async (result: ProjectPropertiesResultsEntity) => {
        const project = extractProjectProperties(result.properties);
        const projectImage = extractProjectCoverImage(result.cover);
        if (project.imageBlur === "") {
          project.imageBlur = await getBase64PlaceHolder(projectImage, 32);
          if (process.env.NODE_ENV === "production") {
            updateImageBlur(result, project.imageBlur);
          }
        }
        return {
          ...project,
          projectImage,
        } as ProjectCardProps;
      })
      .slice(0, 6) ?? [];

  return Promise.all(projects);
};

export const getProjectSlugs = async (response: ProjectPropertiesResponse) => {
  const projects = await getProjects(response);
  return projects.map((project) => ({ params: { slug: project.slug } }));
};

export const extractProjectCoverImage = (coverImage: Cover) => {
  if (coverImage.type === "external") {
    return coverImage.external?.url ?? "";
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
  imageBlur: property.image_blur.rich_text?.[0]?.plain_text ?? "",
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
            code: block?.annotations.code ?? false,
            link: block?.href === undefined ? null : block?.href,
          } as RichText)
      ) ?? []
    );
  }
  return {
    text: block[blockType]?.text?.[0]?.plain_text ?? "",
    bold: block[blockType]?.text?.[0]?.annotations.bold ?? false,
    underline: block[blockType]?.text?.[0]?.annotations.underline ?? false,
    italic: block[blockType]?.text?.[0]?.annotations.italic ?? false,
    code: block[blockType]?.text?.[0]?.annotations.code ?? false,
    link:
      block[blockType]?.text?.[0]?.href === undefined
        ? null
        : block[blockType]?.text?.[0]?.href,
  } as RichText;
};

export const extractContentFromResponse = async (
  blockType: AcceptedTypes,
  block: ProjectContentResultsEntity
): Promise<BlockData> => {
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
        blurUrl: await getBase64PlaceHolder(
          block.image?.external.url ?? "",
          16
        ),
        caption: block.image?.caption?.[0]?.plain_text,
      } as ExternalImage;
    default:
      throw new Error(`Block type ${blockType} not supported`);
  }
};

export const groupListBlocks = (blocks: BlockInterface[]): BlockInterface[] => {
  const ans: BlockInterface[] = [];
  let tempList: RichText[] = [];
  let tempType: AcceptedTypes | undefined;
  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];
    switch (block.type) {
      case "numbered_list_item":
      case "bulleted_list_item":
        tempType = block.type;
        tempList.push((block as BlockInterface<RichText>).data);
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

export const responseToBlocks = async (
  response: ProjectContentResponse
): Promise<BlockInterface[]> => {
  const blockContent = Promise.all(
    response.results?.map(async (result, index) => {
      return {
        id: index.toString(),
        type: result.type,
        data: await extractContentFromResponse(result.type, result),
      } as BlockInterface;
    }) ?? []
  );
  const groupedBlocks = groupListBlocks(await blockContent);
  return groupedBlocks;
};
const updateImageBlur = (
  result: ProjectPropertiesResultsEntity,
  projectImageBlur: string
) => {
  notion.pages.update({
    page_id: result.id,
    properties: {
      image_blur: {
        rich_text: [
          {
            type: "text",
            text: {
              content: projectImageBlur,
            },
          },
        ],
      },
    },
  });
};
