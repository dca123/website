export interface ProjectContentResponse {
  object: string;
  results?: ProjectContentResultsEntity[] | null;
  next_cursor?: null;
  has_more: boolean;
}
export interface ProjectContentResultsEntity {
  object: string;
  id: string;
  created_time: string;
  last_edited_time: string;
  has_children: boolean;
  archived: boolean;
  type: string;
  heading_1?: Heading1OrParagraphOrHeading2OrNumberedListItem | null;
  paragraph?: Paragraph | null;
  heading_2?: Heading1OrParagraphOrHeading2OrNumberedListItem1 | null;
  numbered_list_item?: Heading1OrParagraphOrHeading2OrNumberedListItem2 | null;
  image?: Image | null;
}
export interface Heading1OrParagraphOrHeading2OrNumberedListItem {
  text?: TextEntityOrCaptionEntity[] | null;
}
export interface TextEntityOrCaptionEntity {
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
export interface Paragraph {
  text?: (TextEntityOrCaptionEntity1 | null)[] | null;
}
export interface TextEntityOrCaptionEntity1 {
  type: string;
  text: Text;
  annotations: Annotations;
  plain_text: string;
  href?: null;
}
export interface Heading1OrParagraphOrHeading2OrNumberedListItem1 {
  text?: TextEntityOrCaptionEntity[] | null;
}
export interface Heading1OrParagraphOrHeading2OrNumberedListItem2 {
  text?: TextEntityOrCaptionEntity[] | null;
}
export interface Image {
  caption?: TextEntityOrCaptionEntity[] | null;
  type: string;
  external: External;
}
export interface External {
  url: string;
}
