export interface PageConfigResponse {
  object: string;
  results?: PageConfigResultsEntity[] | null;
  next_cursor?: null;
  has_more: boolean;
}
export interface PageConfigResultsEntity {
  object: string;
  id: string;
  created_time: string;
  last_edited_time: string;
  cover?: null;
  icon?: null;
  parent: Parent;
  archived: boolean;
  properties: Properties;
  url: string;
}
export interface Parent {
  type: string;
  database_id: string;
}
export interface Properties {
  content: Content;
  property: Property;
}
export interface Content {
  id: string;
  type: string;
  rich_text?: (RichTextEntity | null)[] | null;
}
export interface RichTextEntity {
  type: string;
  text: Text;
  annotations: Annotations;
  plain_text: string;
  href?: string | null;
}
export interface Text {
  content: string;
  link?: Link | null;
}
export interface Link {
  url: string;
}
export interface Annotations {
  bold: boolean;
  italic: boolean;
  strikethrough: boolean;
  underline: boolean;
  code: boolean;
  color: string;
}
export interface Property {
  id: string;
  type: string;
  title?: TitleEntityOrRichTextEntity[] | null;
}
export interface TitleEntityOrRichTextEntity {
  type: string;
  text: Text1;
  annotations: Annotations;
  plain_text: string;
  href?: null;
}
export interface Text1 {
  content: string;
  link?: null;
}
