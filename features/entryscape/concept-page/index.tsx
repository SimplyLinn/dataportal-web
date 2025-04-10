import Link from "next/link";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import { FC, useContext, useEffect } from "react";

import { Container } from "@/components/layout/container";
import { Heading } from "@/components/typography/heading";
import { Preamble } from "@/components/typography/preamble";
import { useEntryScapeBlocks } from "@/hooks/use-entry-scape-blocks";
import { EntrystoreContext } from "@/providers/entrystore-provider";
import { SettingsContext } from "@/providers/settings-provider";
import { linkBase } from "@/utilities";

export const ConceptPage: FC = () => {
  const { setBreadcrumb, iconSize } = useContext(SettingsContext);
  const entry = useContext(EntrystoreContext);
  const { lang, t } = useTranslation();
  const { pathname } = useRouter() || {};
  const isTerminology = pathname.startsWith("/terminology");

  useEntryScapeBlocks({
    entrystoreBase: entry.entrystore.getBaseURI(),
    env: entry.env,
    lang,
    iconSize,
    pageType: isTerminology ? "terminology" : "concept",
    context: entry.context,
    esId: entry.esId,
  });

  useEffect(() => {
    setBreadcrumb?.({
      name: entry.title,
      crumbs: [
        { name: "start", link: { ...linkBase, link: "/" } },
        {
          name: t("routes|concepts$title"),
          link: { ...linkBase, link: `/${t("routes|concepts$path")}?q=&f=` },
        },
      ],
    });
  }, [pathname, entry.title]);

  return (
    <Container>
      <Heading level={1} size={"lg"} className="mb-lg md:mb-xl">
        {entry.title}
      </Heading>
      <div className="mb-lg flex flex-col gap-xl md:mb-xl lg:flex-row lg:gap-2xl">
        {/* Left column */}
        <div className="flex w-full max-w-md flex-col">
          {entry.organisationLink ? (
            <Link
              className="mb-lg text-lg font-normal text-green-600 hover:!no-underline"
              href={entry.organisationLink}
            >
              {entry.publisher}
            </Link>
          ) : (
            entry.publisher && (
              <Preamble data-test-id="publisher" className="mb-lg">
                {entry.publisher}
              </Preamble>
            )
          )}

          {entry.description !== "" && (
            <p data-test-id="description" className="mb-lg text-textSecondary">
              {entry.description}
            </p>
          )}

          <div
            data-test-id="concept-block"
            className="flex flex-col gap-lg"
            data-entryscape="conceptBlock"
          />

          <span
            data-test-id="terminology-block"
            data-entryscape="terminologyBlock"
            className="totTerminology conceptDetail"
          />
        </div>

        {/* Right column */}
        <div
          data-test-id="about-section"
          className="mb-lg h-fit w-full max-w-md bg-white p-md lg:mb-none lg:max-w-[296px]"
        >
          <Heading
            level={2}
            size={"sm"}
            className="mb-sm font-strong text-textSecondary md:mb-md"
          >
            {isTerminology
              ? t("pages|concept_page$about_terminology")
              : t("pages|concept_page$about_concept")}
          </Heading>

          <div className="space-y-lg">
            <div data-test-id="address">
              <Heading
                className="font-strong text-textSecondary"
                level={3}
                size={"xxs"}
              >
                {isTerminology
                  ? t("pages|concept_page$term_adress")
                  : t("pages|concept_page$concept_adress")}
              </Heading>

              <Link
                className="break-words text-sm text-green-600 hover:no-underline"
                href={entry.address}
              >
                {entry.address}
              </Link>
            </div>

            {entry.relatedSpecifications &&
              entry.relatedSpecifications?.length > 0 && (
                <div>
                  <Heading
                    className="font-strong text-textSecondary"
                    level={3}
                    size={"xxs"}
                  >
                    {t("pages|datasetpage$related_specifications")}
                  </Heading>
                  {entry.relatedSpecifications.map(({ title, url }, idx) => (
                    <Link
                      className="block text-sm text-green-600 hover:no-underline"
                      key={idx}
                      href={url}
                    >
                      {title}
                    </Link>
                  ))}
                </div>
              )}

            {entry.relatedTerm && (
              <div data-test-id="related-terminology">
                <Heading
                  className="font-strong text-textSecondary"
                  level={3}
                  size={"xxs"}
                >
                  {t("pages|concept_page$terminology_concept")}
                </Heading>
                <Link
                  className="block text-sm text-green-600 hover:no-underline"
                  href={entry.relatedTerm.url}
                >
                  {entry.relatedTerm.title}
                </Link>
              </div>
            )}

            {/* Download formats */}
            {entry.downloadFormats && entry.downloadFormats?.length > 0 && (
              <div data-test-id="download-formats">
                <Heading
                  className="font-strong text-textSecondary"
                  level={3}
                  size={"xxs"}
                >
                  {t("pages|datasetpage$download_link")}
                </Heading>
                <div className="flex flex-col gap-xs">
                  {entry.downloadFormats.map(({ title, url }, idx) => (
                    <a
                      key={idx}
                      href={url + (idx === 0 ? "" : "&recursive=conceptscheme")}
                      className="text-sm text-green-600 hover:no-underline"
                    >
                      {title}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        {/* End right column */}
      </div>

      <div data-entryscape="conceptHierarchy" className="conceptDetail" />
    </Container>
  );
};
