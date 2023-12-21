import React from "react";
import BlockList from "@/components/content/blocks/BlockList";
import { PublicationResponse } from "@/utilities";
import Container from "@/components/layout/Container";
import { PublicationList } from "@/components/content/Publication/PublicationList";
import { Hero } from "@/components/layout/Hero";
import { formatDateWithTime } from "@/utilities/dateHelper";
import Heading from "@/components/global/Typography/Heading";
import DateIcon from "@/assets/icons/date.svg";

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

export const PublicationFull: React.FC<PublicationResponse> = ({
  heading,
  preamble,
  image,
  tags,
  blocks,
  related,
  publishedAt,
}) => {
  let relatedHeading =
    "Fler " + getRelatedHeading(findPublicationTypeTag(tags)?.value || "");
  return (
    <article>
      <Hero heading={heading} preamble={preamble} image={image} />
      <Container>
        <main className="grid grid-cols-5 gap-xl">
          {blocks && blocks.length > 0 && (
            <div id="content" className="col-span-3">
              <BlockList blocks={blocks} />
            </div>
          )}
          <aside id="sidebar" className="col-span-2">
            <Heading
              level={4}
              size="sm"
              className="mb-sm flex text-textSecondary"
            >
              <DateIcon className="mr-sm" />
              Publiceringsdatum
            </Heading>
            <p className="ml-lg pl-md">{formatDateWithTime(publishedAt)}</p>
          </aside>
        </main>
        {related && related.length > 0 && (
          <PublicationList publications={related} heading={relatedHeading} />
        )}
      </Container>
    </article>
  );
};
