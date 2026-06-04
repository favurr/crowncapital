import type React from "react"

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "tv-ticker-tape": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        symbols?: string
        "item-size"?: string
        "hover-type"?: string
        theme?: string
      }
    }

      // Allow importing global CSS and CSS modules in TypeScript
      declare module "*.css";
      declare module "*.scss";
      declare module "*.sass";

      declare module "*.module.css" {
        const classes: { readonly [key: string]: string };
        export default classes;
      }

      declare module "*.module.scss" {
        const classes: { readonly [key: string]: string };
        export default classes;
      }
  }
}
