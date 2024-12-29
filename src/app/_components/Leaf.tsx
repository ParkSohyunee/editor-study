import { RenderLeafProps } from "slate-react";

interface LeafProps {
  props: RenderLeafProps;
}

export default function Leaf({ props }: LeafProps) {
  return (
    <span
      {...props.attributes}
      style={{ fontWeight: props.leaf.bold ? "bold" : "normal" }}
    >
      {props.children}
    </span>
  );
}
