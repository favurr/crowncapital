// components/mdx/mdx-renderer.tsx
import { MDXRemote } from "next-mdx-remote/rsc";
import Callout from "../ui/Callout";

const components = {
  Callout,
};

interface MDXRendererProps {
  source: string;
}

export default function MDXRenderer({ source }: MDXRendererProps) {
  return (
    <div className="prose dark:prose-invert">
      <MDXRemote source={source} components={components} />
    </div>
  );
}