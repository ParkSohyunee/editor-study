export type ParagraphElement = {
  type: "paragraph";
  children: CustomText[];
};

export type CodeElement = {
  type: "code";
  children: CustomText[];
};

export type HeadingElement = {
  type: "heading";
  children: CustomText[];
};

export type CustomElement = ParagraphElement | CodeElement | HeadingElement;
export type CustomText = { text: string; bold?: true };
