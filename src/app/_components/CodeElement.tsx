import { RenderElementProps } from "slate-react";

interface CodeElementProps {
  props: RenderElementProps;
}

export default function CodeElement({ props }: CodeElementProps) {
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  );
}
