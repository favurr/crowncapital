import sanitize from "sanitize-html";

export default function sanitizeHtml(dirty?: string): string {
  if (!dirty) return "";

  return sanitize(dirty, {
    allowedTags: sanitize.defaults.allowedTags.concat([
      "img",
      "h1",
      "h2",
      "h3",
      "blockquote",
      "pre",
      "code",
      "ul",
      "ol",
      "li",
    ]),
    allowedAttributes: {
      a: ["href", "target", "rel"],
      img: ["src", "alt", "title"],
      code: ["class"],
      "*": ["class"],
    },
    transformTags: {
      a: sanitize.simpleTransform("a", {
        rel: "noopener noreferrer",
        target: "_blank",
      }),
    },
  });
}
