// const notion = new Client({ auth: process.env.NOTION_API_KEY });
import { ProjectProperties, Properties } from "../types/projectReponse";
import { readFileSync } from "fs";
import { Project } from "../pages";
import { ProjectPropertiesResultsEntity } from "../types/projectReponse";
import { Block } from "../pages/projects/[slug]";
import { ProjectContentResultsEntity } from "../types/pageResponse";

export const getProjects = async () => {
  // const database_id = "4f1fd603748b44d58615d782979d7a1e";
  // const response: QueryDatabaseResponse = await notion.databases.query({
  //   database_id,
  // });

  // fs.writeFile("test_data/database.json", JSON.stringify(response), "utf8");

  const jsonString = readFileSync("./test_data/database.json", {
    encoding: "utf8",
  });

  const response: ProjectProperties = JSON.parse(jsonString);
  const projects: Project[] =
    response.results
      ?.map((result: ProjectPropertiesResultsEntity) => {
        const project = extractProjectProperties(result.properties);
        return project;
      })
      .slice(0, 6) ?? [];

  return projects;
};

export const extractProjectProperties = (property: Properties): Project => ({
  title: property.name.title?.[0].plain_text ?? "",
  slug: property.slug.rich_text?.[0].plain_text ?? "",
  imageUrl: `https://picsum.photos/id/${Math.floor(
    Math.random() * (500 - 300) + 500
  )}/600/300`,
  description: property.description.rich_text?.[0].plain_text ?? "",
  skills:
    property.skills.multi_select?.map((skill) => skill.name).slice(0, 3) ?? [],
});

export const extractContentFromBlock = (
  blockType: string,
  block: ProjectContentResultsEntity
): string => {
  switch (blockType) {
    case "heading_1":
      return block.heading_1?.text?.[0].plain_text ?? "";
    case "heading_2":
      return block.heading_2?.text?.[0].plain_text ?? "";
    case "paragraph":
      return block.paragraph?.text?.[0]?.plain_text ?? "";
    case "numbered_list_item":
      return block.numbered_list_item?.text?.[0]?.plain_text ?? "";
    case "bulleted_list_item":
      return block.numbered_list_item?.text?.[0]?.plain_text ?? "";
    case "image":
      return block.image?.external.url ?? "";
    default:
      return "text not found";
  }
};

export const extractListsFromBlock = (blocks: Block[]) => {
  let isList = false;
  const ans = Array<Block>();

  for (let i = 0; i < blocks.length; i += 1) {
    console.log(ans);
    const block = blocks[i];

    if (isList && block.type == "numbered_list_item") {
      const new_block_data = ans[ans.length - 1].data as string[];
      new_block_data.push(block.data as string);
      ans[ans.length - 1].data = new_block_data;
      continue;
    } else if (isList && block.type != "numbered_list_item") {
      isList = false;
    } else if (isList == false && block.type == "numbered_list_item") {
      isList = true;

      const new_block: Block = {
        id: block.id,
        type: block.type,
        data: [block.data as string],
      };
      ans.push(new_block);
      continue;
    }
    ans.push(block);
  }
  return ans;
};
