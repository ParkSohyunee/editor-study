"use client";

import { KeyboardEvent, useCallback, useState } from "react";

// Import the Slate editor factory.
import { createEditor, Editor, Element, Transforms } from "slate";

// Import the Slate components and React plugin.
import { Slate, Editable, withReact, RenderElementProps } from "slate-react";

// TypeScript users only add this code
import { BaseEditor, Descendant } from "slate";
import { ReactEditor } from "slate-react";

import CodeElement from "./CodeElement";
import DefaultElement from "./DefaultElement";

type CustomElement = { type: "paragraph" | "code"; children: CustomText[] };
type CustomText = { text: string };

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

const initialValue: Descendant[] = [
  {
    type: "paragraph",
    children: [{ text: "A line of text in a paragraph." }],
  },
];

export default function SlateEditor() {
  // Create a Slate editor object that won't change across renders.
  const [editor] = useState(() => withReact(createEditor()));

  // Adding Event Handlers
  const onKeyDownText = (e: KeyboardEvent) => {
    if (e.key === "`" && e.ctrlKey) {
      // Prevent the "`" from being inserted by default.
      e.preventDefault();

      const [match] = Editor.nodes(editor, {
        match: (n: any) => n.type === "code",
      });

      // Otherwise, set the currently selected blocks type to "code".
      Transforms.setNodes(
        editor,
        { type: match ? "paragraph" : "code" },
        { match: (n) => Element.isElement(n) && Editor.isBlock(editor, n) }
      );
    }
  };

  // Define a rendering function based on the element passed to `props`. We use
  // `useCallback` here to memoize the function for subsequent renders.
  const renderElement = useCallback((props: RenderElementProps) => {
    switch (props.element.type) {
      case "code":
        return <CodeElement props={props} />;
      default:
        return <DefaultElement props={props} />;
    }
  }, []);

  // Render the Slate context.
  // Add the editable component inside the context.
  return (
    <Slate editor={editor} initialValue={initialValue}>
      <Editable renderElement={renderElement} onKeyDown={onKeyDownText} />
    </Slate>
  );
}
