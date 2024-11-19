import DOMPurify from "dompurify";
import React from "react";

export const HtmlRenderer = ({ htmlString }: { htmlString: string }) => {
  const sanitizedHtml = DOMPurify.sanitize(htmlString); // Sanitize the HTML
  return <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />;
};
