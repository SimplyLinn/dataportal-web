import React from "react";
import BlockList from "@/components/content/blocks/BlockList";
import { PublicationResponse } from "@/utilities";
import Container from "@/components/layout/Container";
import { PublicationList } from "@/components/content/Publication/PublicationList";
import { Hero } from "@/components/layout/Hero";
import { formatDateWithTime } from "@/utilities/dateHelper";
import Heading from "@/components/global/Typography/Heading";
import DateIcon from "@/assets/icons/date.svg";
import useTranslation from "next-translate/useTranslation";

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
  const { t } = useTranslation();
  return (
    <article>
      <Hero heading={heading} preamble={preamble} image={image} />
      <Container>
        <div className="grid gap-xl md:grid-cols-5">
          <main id="content" className="order-2 col-span-3 md:order-1">
            {blocks && blocks.length > 0 && <BlockList blocks={blocks} />}
          </main>
          <aside id="sidebar" className="order-1 col-span-2 md:order-2">
            <Heading
              level={4}
              size="sm"
              className="mb-sm flex text-textSecondary"
            >
              <DateIcon className="mr-sm" />
              {t("common|published-date")}
            </Heading>
            <p className="ml-lg pl-md">{formatDateWithTime(publishedAt)}</p>
          </aside>
        </div>
        {related && related.length > 0 && (
          <PublicationList publications={related} heading={relatedHeading} />
        )}
      </Container>
    </article>
  );
};
