import { MQACategoryPage } from "@/components/content/Entryscape/MQACategoryPage";
import { useScript } from "@/hooks/useScript";
import EntrystoreProvider from "@/providers/EntrystoreProvider";
import { SettingsContext } from "@/providers/SettingsProvider";
// import { usePathname } from "next/navigation";
// import { useRouter } from "next/router";
import { useContext } from "react";

export default function MqaCategoryPage() {
  const { env } = useContext(SettingsContext);
  // const { asPath } = useRouter() || {};

  // console.log(asPath);

  const postscribeStatus = useScript(
    "/postscribe.min.js",
    "sha384-1nPAWyZS0cvGLWSoWOrkTZAy8Xq8g6llEe985qo5NRPAeDi+F9h9U+0R8v56XWCM",
    "anonymous",
  );

  return postscribeStatus === "ready" ? (
    <EntrystoreProvider
      env={env}
      entrystoreUrl={env.ENTRYSCAPE_MQA_PATH}
      fetchMore={false}
    >
      <MQACategoryPage />
    </EntrystoreProvider>
  ) : (
    <></>
  );
}
