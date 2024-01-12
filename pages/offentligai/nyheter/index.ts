import { getPublicationsList, populateSeo } from "@/utilities";
import { ListPage } from "@/components/content/ListPage";

export async function getStaticProps({ locale }: any) {
  return await getPublicationsList(["offentligai"], ["Nyhet"], locale || "sv", {
    seo: {
      ...populateSeo,
      title: "AI - Nyheter",
      description: "Nyheter relaterat till offentlig AI ",
    },
    basePath: `/offentligai/nyheter`,
    heading: "Nyheter",
  });
}

export default ListPage;
