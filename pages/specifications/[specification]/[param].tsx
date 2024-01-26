import { useRouter } from "next/router";
import { useContext } from "react";
import { SpecificationPage } from "@/components/content/Entryscape/SpecificationPage";
import { useScript } from "@/hooks/useScript";
import { SettingsContext } from "@/providers/SettingsProvider";
import EntrystoreProvider from "@/providers/EntrystoreProvider";

export default function Specification() {
  const { env } = useContext(SettingsContext);
  const { query } = useRouter() || {};
  const { specification, param } = query || {};
  const curi = `${specification}/${param}`;
  const entryUri = `https://dataportal.se/specifications/${curi}`;
  const postscribeStatus = useScript(
    "/postscribe.min.js",
    "sha384-1nPAWyZS0cvGLWSoWOrkTZAy8Xq8g6llEe985qo5NRPAeDi+F9h9U+0R8v56XWCM",
    "anonymous",
  );

  return postscribeStatus === "ready" ? (
    <EntrystoreProvider
      env={env}
      entryUri={entryUri}
      entrystoreUrl={env.ENTRYSCAPE_TERMS_PATH}
      fetchMore={false}
    >
      <SpecificationPage curi={curi} />
    </EntrystoreProvider>
  ) : (
    <></>
  );
}
