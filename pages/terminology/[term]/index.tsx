import { EntryStore, EntryStoreUtil } from "@entryscape/entrystore-js";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useContext } from "react";

import { SettingsUtil } from "@/env";
import { ConceptPage } from "@/features/entryscape/concept-page";
import { EntrystoreProvider } from "@/providers/entrystore-provider";
import { SettingsContext } from "@/providers/settings-provider";

export default function Terminology() {
  const { env } = useContext(SettingsContext);
  const { query } = useRouter() || {};
  const { term } = query || {};
  const ids = (typeof term === "string" && term.split("_")) || [];
  const eid = ids.pop() || "";
  const cid = ids.join("_");

  return (
    <EntrystoreProvider
      env={env}
      cid={cid}
      eid={eid}
      entrystoreUrl={env.ENTRYSCAPE_TERMS_PATH}
      pageType="terminology"
    >
      <ConceptPage />
    </EntrystoreProvider>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  params,
  locale,
}) => {
  const env = SettingsUtil.create();
  const { term } = params || {};

  if (typeof term === "string" && /\d/.test(term) && term.includes("_")) {
    return { props: {} };
  }

  try {
    const es = new EntryStore(
      `https://${env.ENTRYSCAPE_TERMS_PATH}/store` ||
        "https://admin.dataportal.se/store",
    );
    const esu = new EntryStoreUtil(es);
    const entryUri = env.ENTRYSCAPE_TERMS_PATH.includes("sandbox")
      ? `https://www-sandbox.dataportal.se/concepts/${term}`
      : `https://dataportal.se/concepts/${term}`;

    const entry = await esu.getEntryByResourceURI(entryUri);

    if (entry) {
      return {
        redirect: {
          destination: `/${locale}/terminology/${entry
            .getContext()
            .getId()}_${entry.getId()}`,
          permanent: true, // This creates a 301 redirect
        },
      };
    }
  } catch (error) {
    console.error("Error fetching entry:", error);
  }

  return {
    notFound: true,
  };
};
