import React, { useContext, useEffect, useState } from "react";
import { decode } from "qss";
import SearchProvider from "../Search/SearchProvider";
import {
  SearchHeader,
  SearchFilters,
  SearchInput,
  SearchResults,
  ESRdfType,
  ESType,
  SettingsContext,
  SearchContext,
} from "..";
import useTranslation from "next-translate/useTranslation";
import { useScript } from "../../hooks/useScript";
import { useRouter } from "next/router";
import { useMatomo } from "@datapunt/matomo-tracker-react";
import Head from "next/head";
import { Heading, Container } from "@digg/design-system";
import { MainContainerStyle } from "../../styles/general/emotion";

interface SearchProps {
  activeLink?: string;
}

export const SearchSpecificationsPage: React.FC<SearchProps> = () => {
  const { env } = useContext(SettingsContext);
  const { t, lang } = useTranslation("common");
  const [query, setQuery] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const postscribeStatus = useScript(
    "/postscribe.min.js",
    "sha384-1nPAWyZS0cvGLWSoWOrkTZAy8Xq8g6llEe985qo5NRPAeDi+F9h9U+0R8v56XWCM",
    "anonymous"
  );
  const { pathname } = useRouter() || {};
  const { trackPageView } = useMatomo();

  useEffect(() => {
    //needed for handling back/forward buttons and changing state for input correctly
    if (typeof window !== "undefined") {
      //handles back/forward button
      window.addEventListener("popstate", () => {
        let qs = decode(window.location.search.substring(1)) as any;
        const querytext =
          qs.q && qs.q.toString().length > 0 ? qs.q.toString() : "";

        if (querytext) setQuery(querytext);
      });

      //*** makes sure querytext is set from location to input, on page reloads
      let qs = decode(window.location.search.substring(1)) as any;
      let querytext = qs.q && qs.q.toString().length > 0 ? qs.q.toString() : "";

      if (querytext)
        setQuery(decodeURIComponent(querytext.replace(/\+/g, "%20")));

      //***
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }
  });

  useEffect(() => {
    trackPageView({ documentTitle: t("routes|specifications$title") });
  }, [pathname]);

  const pathResover = (hitMeta: any) => {
    let resourceUri = hitMeta.getResourceURI();
    let path = "";

    if (resourceUri.includes("://")) {
      let tmp = resourceUri.split("://");
      path = tmp[1];

      if (path.includes("dataportal.se/")) {
        path = path.replace("dataportal.se/", "");
      }
    } else path = resourceUri;

    return `/${path}`;
  };

  return (
    <>
      <Head>
        <title>{`${t("search-specs")} - Sveriges dataportal`}</title>
        <meta
          property="og:title"
          content={`${t("search-specs")} - Sveriges dataportal`}
        />
        <meta
          name="twitter:title"
          content={`${t("search-specs")} - Sveriges dataportal`}
        />
      </Head>
      {postscribeStatus === "ready" && (
        <SearchProvider
          hitSpecifications={{
            "http://www.w3.org/ns/dx/prof/Profile": {
              path: `/specifications/`,
              titleResource: "dcterms:title",
              descriptionResource: "dcterms:description",
              pathResolver: pathResover,
            },
            "http://purl.org/dc/terms/Standard": {
              path: `/specifications/`,
              titleResource: "dcterms:title",
              descriptionResource: "dcterms:description",
              pathResolver: pathResover,
            },
          }}
          facetSpecification={{
            facets: [
              {
                resource: "http://www.w3.org/ns/dcat#theme",
                type: ESType.uri,
                dcatProperty: "dcat:theme",
                dcatType: "choice",
                dcatFilterEnabled: true,
                indexOrder: 0,
              },
              {
                resource: "http://purl.org/dc/terms/publisher",
                type: ESType.uri,
                indexOrder: 1,
              },
            ],
          }}
          entryscapeUrl={
            env.ENTRYSCAPE_SPECS_PATH
              ? `https://${env.ENTRYSCAPE_SPECS_PATH}/store`
              : "https://editera.dataportal.se/store"
          }
          initRequest={{
            esRdfTypes: [ESRdfType.spec_standard, ESRdfType.spec_profile],
            language: lang,
            takeFacets: 30,
          }}
        >
          <SearchContext.Consumer>
            {(search) => (
              <div className="wpb_wrapper">
                <Container cssProp={MainContainerStyle}>
                  <SearchHeader activeLink={"specifications"} query={query} />

                  <div className="row">
                    <Heading
                      color={"pinkPop"}
                      weight={"light"}
                      size={"3xl"}
                      className="search-header"
                    >
                      {t("search-specs")}
                    </Heading>
                  </div>

                  <SearchInput
                    search={search}
                    searchMode="specifications"
                    query={query}
                    setQuery={setQuery}
                  />

                  <SearchFilters
                    search={search}
                    showFilter={showFilter}
                    searchMode="specifications"
                    query={query}
                    setShowFilter={setShowFilter}
                  />
                  <noscript>{t("no-js-text")}</noscript>
                  <SearchResults
                    showSorting={showFilter}
                    search={search}
                    searchMode="specifications"
                  />
                </Container>
              </div>
            )}
          </SearchContext.Consumer>
        </SearchProvider>
      )}
    </>
  );
};
