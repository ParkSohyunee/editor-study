import { RenderElementProps } from "slate-react";

interface DefaultElementProps {
  props: RenderElementProps;
}

export default function DefaultElement({ props }: DefaultElementProps) {
  return <p {...props.attributes}>{props.children}</p>;
}
