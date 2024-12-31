import { RenderElementProps } from "slate-react";

interface HeadingElementProps {
  props: RenderElementProps;
}

export default function HeadingElement({ props }: HeadingElementProps) {
  return <h1 {...props.attributes}>{props.children}</h1>;
}
