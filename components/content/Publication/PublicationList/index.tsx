import { FC } from "react";
import useTranslation from "next-translate/useTranslation";
import { PublicationTeaser } from "@/components/content/Publication/PublicationTeaser";
import { ButtonLink } from "@/components/global/Button";
import Heading from "@/components/global/Typography/Heading";
import {
  ContainerDataFragment,
  PublicationDataFragment,
} from "@/graphql/__generated__/operations";

interface PublicationListProps {
  publications: PublicationDataFragment[] | ContainerDataFragment[];
  heading?: string;
  showMoreLink?: {
    slug: string;
    title: string;
  };
}

export const PublicationList: FC<PublicationListProps> = ({
  publications,
  heading,
  showMoreLink,
}) => {
  const { t } = useTranslation();

  return (
    <div className="mb-xl">
      <div
        className={`flex items-center ${
          publications.length <= 3 ? "justify-between" : "gap-sm"
        } text-2xl`}
      >
        {heading && (
          <Heading level={2} size={"md"}>
            {heading}
          </Heading>
        )}
        {showMoreLink && (
          <ButtonLink
            size="sm"
            href={showMoreLink.slug}
            label={showMoreLink.title}
            variant="secondary"
          />
        )}
      </div>
      {publications.length > 0 ? (
        <ul className="gap-4 grid grid-cols-1 gap-xl pt-xl md:grid-cols-2 lg:grid-cols-3">
          {publications.map((publication, idx) => (
            <li key={idx}>
              <PublicationTeaser publication={publication} />
            </li>
          ))}
        </ul>
      ) : (
        <span className="pt-xl">{t("pages|listpage$no-articles")}</span>
      )}
    </div>
  );
};
