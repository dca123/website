import { AcceptedTypes } from "./pageResponse";

export interface ProjectProperties {
  title: string;
  slug: string;
  skills: string[];
  date: string;
  githubUrl: string;
  description: string;
}
export interface ProjectCardProps
  extends Omit<ProjectProperties, "githubUrl" | "date"> {
  projectImage: string;
}
export interface ProjectPageProps
  extends ProjectCardProps,
    Omit<ProjectProperties, "description" | "slug"> {
  blocks: BlockInterface[];
}

export interface ExternalImage {
  url: string;
  caption: string;
}

type Lists = string[];

export type BlockData = string | Lists | ExternalImage;
export interface BlockInterface<T = BlockData> {
  id: string;
  type: AcceptedTypes;
  data: T;
}
