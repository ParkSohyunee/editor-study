import { useSlate } from "slate-react";
import CustomEditor from "../models/CustomEditor";

export default function Toolbar() {
  const editor = useSlate();

  return (
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
      <button
        onMouseDown={(event) => {
          event.preventDefault();
          CustomEditor.toggleHeadingBlock(editor);
        }}
      >
        Heading
      </button>
    </div>
  );
}
