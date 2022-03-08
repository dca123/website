import { AcceptedTypes } from "./pageResponse";

export interface ProjectProperties {
  title: string;
  slug: string;
  skills: string[];
  date: string;
  githubUrl: string;
  description: string;
  imageBlur: string;
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

export interface AboutPageProps {
  blocks: BlockInterface[];
}
export interface ExternalImage {
  url: string;
  blurUrl: string;
  caption: string;
}

type Lists = RichText[];
export type BlockData = Lists | ExternalImage | RichText;

export interface RichText {
  bold: boolean;
  italic: boolean;
  underline: boolean;
  code: boolean;
  text: string;
}

export interface BlockInterface<T = BlockData> {
  id: string;
  type: AcceptedTypes;
  data: T;
}

export type PageConfigProperties =
  | "tagline"
  | "github"
  | "linkedin"
  | "email"
  | "resume";
export type PageConfig = Record<PageConfigProperties, string>;
