import { Descendant, Element, Node } from "slate";

export type CustomHeadingElement = {
  type: "heading";
  text: string;
};

const createTableOfContents = (nodes: Descendant[]) => {
  const toc: CustomHeadingElement[] = [];

  const traverseNodes = (nodes: Descendant[]) => {
    for (const node of nodes) {
      if (Element.isElement(node) && node.type === "heading") {
        toc.push({
          type: node.type,
          text: Node.string(node),
        });
      }
    }
  };

  traverseNodes(nodes);
  return toc;
};

export default createTableOfContents;
