import { BaseEditor, Editor, Element, Transforms } from "slate";
import { ReactEditor } from "slate-react";

type CustomEditorType = BaseEditor & ReactEditor;

// Define our own custom set of helpers.
const CustomEditor = {
  isBoldMarkActive(editor: CustomEditorType) {
    const marks = Editor.marks(editor);
    return marks ? marks.bold === true : false;
  },

  isCodeBlockActive(editor: CustomEditorType) {
    const [match] = Editor.nodes(editor, {
      match: (n: any) => n.type === "code",
    });

    return !!match;
  },

  toggleBoldMark(editor: CustomEditorType) {
    const isActive = CustomEditor.isBoldMarkActive(editor);
    if (isActive) {
      Editor.removeMark(editor, "bold");
    } else {
      Editor.addMark(editor, "bold", true);
    }
  },

  toggleCodeBlock(editor: CustomEditorType) {
    const isActive = CustomEditor.isCodeBlockActive(editor);
    Transforms.setNodes(
      editor,
      { type: isActive ? "paragraph" : "code" },
      { match: (n) => Element.isElement(n) && Editor.isBlock(editor, n) }
    );
  },
};

export default CustomEditor;
