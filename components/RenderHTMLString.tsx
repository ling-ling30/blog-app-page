// HtmlRenderer.tsx
import DOMPurify from "dompurify";

export const HtmlRenderer = ({ htmlString }: { htmlString: string }) => {
  const sanitizedHtml = DOMPurify.sanitize(htmlString);

  return (
    <div
      className={"renderer"}
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
    />
  );
};
