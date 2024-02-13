import { FC } from "react";
import { Heading } from "@/components/global/Typography/Heading";
import ArrowRightIcon from "@/assets/icons/arrowRight.svg";
import ExternalLinkIcon from "@/assets/icons/external-link.svg";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { isExternalLink } from "@/utilities";

export interface PromoProps {
  title: string;
  slug: string;
  description?: string;
  linktype?: string;
  __typename?: string;
}

export const Promo: FC<{
  link: PromoProps;
  icon?: any;
  inline?: boolean;
}> = ({ link, icon, inline }) => {
  const { t } = useTranslation("common");

  const Icon = icon;

  return (
    <Link
      href={link.slug}
      aria-label={link.title}
      className="group flex h-full flex-col bg-white text-brown-900 no-underline"
    >
      {icon && (
        <div className="flex justify-center bg-pink-600">
          <Icon />
        </div>
      )}
      <div className="flex h-full flex-col p-lg">
        <Heading
          level={!inline ? 2 : 3}
          size="sm"
          className={link.description && !inline ? "" : "pb-lg"}
        >
          {link.title}
        </Heading>
        {link.description && !inline && (
          <p className="pb-lg pt-sm text-brown-600">{link.description}</p>
        )}
        <span className="button button--small button--primary focus--none mt-auto">
          {t("read-more")}
          {isExternalLink(link.slug) ? (
            <ExternalLinkIcon height={16} width={16} viewBox="0 0 24 24" />
          ) : (
            <ArrowRightIcon height={16} width={16} viewBox="0 0 24 24" />
          )}
        </span>
      </div>
    </Link>
  );
};
