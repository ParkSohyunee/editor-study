"use client";

import { KeyboardEvent, useCallback, useMemo, useState } from "react";

// Import the Slate editor factory.
import { createEditor } from "slate";

// Import the Slate components and React plugin.
import {
  Slate,
  Editable,
  withReact,
  RenderElementProps,
  RenderLeafProps,
} from "slate-react";

// TypeScript users only add this code
import { BaseEditor, Descendant } from "slate";
import { ReactEditor } from "slate-react";

import CodeElement from "./CodeElement";
import DefaultElement from "./DefaultElement";
import Leaf from "./Leaf";

import CustomEditor from "../_models/CustomEditor";

type CustomElement = { type: "paragraph" | "code"; children: CustomText[] };
type CustomText = { text: string; bold?: true };

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

const defaultInitialValue: Descendant[] = [
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
    if (!e.ctrlKey) {
      return;
    }

    // Prevent the "`" from being inserted by default.
    e.preventDefault();

    switch (e.key) {
      // When "`" is pressed, keep our existing code block logic.
      case "`": {
        CustomEditor.toggleCodeBlock(editor);
        break;
      }

      // When "B" is pressed, bold the text in the selection.
      case "b": {
        CustomEditor.toggleBoldMark(editor);
        break;
      }
    }
  };

  // Save the value to Local Storage.
  const handleChangeValue = (value: Descendant[]) => {
    const isAstChange = editor.operations.some(
      (op) => "set_selection" !== op.type
    );
    if (isAstChange) {
      const content = JSON.stringify(value);
      localStorage.setItem("content", content);
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

  // Define a leaf rendering function that is memoized with `useCallback`.
  const renderLeaf = useCallback((props: RenderLeafProps) => {
    return <Leaf props={props} />;
  }, []);

  // Update the initial content to be pulled from Local Storage if it exists.
  const initialValue: Descendant[] = useMemo(
    () =>
      JSON.parse(localStorage.getItem("content") as string) ||
      defaultInitialValue,
    []
  );

  // Render the Slate context.
  // Add the editable component inside the context.
  return (
    <Slate
      editor={editor}
      initialValue={initialValue}
      onChange={handleChangeValue}
    >
      <div>
        <button
          onMouseDown={(event) => {
            event.preventDefault();
            CustomEditor.toggleBoldMark(editor);
          }}
        >
          Bold
        </button>
        <button
          onMouseDown={(event) => {
            event.preventDefault();
            CustomEditor.toggleCodeBlock(editor);
          }}
        >
          Code Block
        </button>
      </div>

      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        onKeyDown={onKeyDownText}
      />
    </Slate>
  );
}
