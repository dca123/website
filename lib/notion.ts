// const notion = new Client({ auth: process.env.NOTION_API_KEY });
import { ProjectPropertiesResponse, Properties } from "../types/projectReponse";
import { ProjectCardPropsInterface, ProjectPageInterface } from "../pages";
import { ProjectPropertiesResultsEntity } from "../types/projectReponse";
import {
  BlockInterface,
  BlockData,
  ExternalImageInterface,
} from "../pages/projects/[slug]";
import {
  AcceptedTypes,
  ProjectContentResponse,
  ProjectContentResultsEntity,
  TextTypes,
} from "../types/pageResponse";

export const getProjects = async (response: ProjectPropertiesResponse) => {
  const projects: ProjectCardPropsInterface[] =
    response.results
      ?.map((result: ProjectPropertiesResultsEntity) => {
        const project = extractProjectProperties(result.properties);
        return project;
      })
      .slice(0, 6) ?? [];

  return projects;
};

export const getProjectSlugs = async (response: ProjectPropertiesResponse) => {
  const projects = await getProjects(response);
  return projects.map((project) => ({ params: { slug: project.slug } }));
};

export const extractProjectProperties = (
  property: Properties
): ProjectPageInterface => ({
  title: property.name.title?.[0].plain_text ?? "",
  slug: property.slug.rich_text?.[0].plain_text ?? "",
  projectImage: `https://picsum.photos/id/${Math.floor(
    Math.random() * (500 - 300) + 500
  )}/1024/768`,
  description: property.description.rich_text?.[0].plain_text ?? "",
  skills:
    property.skills.multi_select?.map((skill) => skill.name).slice(0, 3) ?? [],
  date: property.date.date.start,
  githubUrl: property.github.rich_text?.[0].plain_text ?? "",
});

const extractTextFromBlock = (
  blockType: TextTypes,
  block: ProjectContentResultsEntity
) => {
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
      } as ExternalImageInterface;
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
