import { EntryStore, EntryStoreUtil } from "@entryscape/entrystore-js";
import { GetServerSideProps } from "next";

import { SettingsUtil } from "@/env";

export default function Terminology() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({
  params,
  locale,
}) => {
  const env = SettingsUtil.create();
  const terminology = (params?.terminology as string[]) || [];
  const scheme = terminology[0];

  if (scheme != "http" && scheme != "https") {
    return {
      notFound: true,
    };
  }

  // Reconstruct the original URI and redirect to the new format
  const curi = terminology.slice(1).join("/");
  const entryUri = `${scheme}://${curi}`;

  try {
    const es = new EntryStore(
      `https://${env.ENTRYSCAPE_TERMS_PATH}/store` ||
        "https://admin.dataportal.se/store",
    );
    const esu = new EntryStoreUtil(es);

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
