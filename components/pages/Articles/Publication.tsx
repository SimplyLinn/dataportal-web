import React from "react";
import { ArticleBlock } from "../..";
import { checkLang, PublicationResponse } from "@/utilities";
import ContentHandler from "@/components/content/ContentHandler";

const whitelistedTagsSV = ["Goda exempel", "Event", "Nyhet"];
export const findPublicationTypeTag = (tags: PublicationResponse["tags"]) => {
  return tags.find((tag) => whitelistedTagsSV.includes(tag.value));
};

const getRelatedHeading = (tag: string) => {
  switch (tag) {
    case "Event":
      return tag.toLowerCase();
    case "Goda exempel":
      return tag.toLowerCase();
    case "Nyhet":
      return "nyheter";
    default:
      return "artiklar";
  }
};

export const Publication: React.FC<PublicationResponse> = ({
  heading,
  preamble,
  tags,
  blocks,
  related,
}) => {
  return (
    <div className="container">
      <div>
        <div className={"content "}>
          {heading && <h1>{checkLang(heading)}</h1>}
          <p className="preamble text-lg">{checkLang(preamble)}</p>
          {blocks && blocks.length > 0 && <ContentHandler blocks={blocks} />}
        </div>
      </div>
      {related && related.length > 0 && (
        <div className="related-content">
          <h2>
            Fler{" "}
            {tags &&
              getRelatedHeading(findPublicationTypeTag(tags)?.value || "")}
          </h2>
          <ArticleBlock articles={related} />
        </div>
      )}
    </div>
  );
};
