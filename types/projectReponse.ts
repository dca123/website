export interface ProjectProperties {
  object: string;
  results?: ProjectPropertiesResultsEntity[] | null;
  next_cursor?: null;
  has_more: boolean;
}
export interface ProjectPropertiesResultsEntity {
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
  github: GithubOrDescriptionOrSlug;
  description: GithubOrDescriptionOrSlug;
  skills: Skills;
  published: Published;
  date: Date;
  slug: GithubOrDescriptionOrSlug;
  name: Name;
}
export interface GithubOrDescriptionOrSlug {
  id: string;
  type: string;
  rich_text?: RichTextEntityOrTitleEntity[] | null;
}
export interface RichTextEntityOrTitleEntity {
  type: string;
  text: Text;
  annotations: Annotations;
  plain_text: string;
  href?: null;
}
export interface Text {
  content: string;
  link?: null;
}
export interface Annotations {
  bold: boolean;
  italic: boolean;
  strikethrough: boolean;
  underline: boolean;
  code: boolean;
  color: string;
}
export interface Skills {
  id: string;
  type: string;
  multi_select?: MultiSelectEntity[] | null;
}
export interface MultiSelectEntity {
  id: string;
  name: string;
  color: string;
}
export interface Published {
  id: string;
  type: string;
  checkbox: boolean;
}
export interface Date {
  id: string;
  type: string;
  date: Date1;
}
export interface Date1 {
  start: string;
  end?: null;
  time_zone?: null;
}
export interface Name {
  id: string;
  type: string;
  title?: RichTextEntityOrTitleEntity[] | null;
}
