import { ArticleListPage } from "../../components/pages/Articles";
import { getPublicationsList, populateSeo } from "../../utilities";

export async function getStaticProps({ locale }: any) {
  return await getPublicationsList([], ["Nyhet"], locale || "sv", {
    seo: {
      ...populateSeo,
      title: "Nyheter",
    },
    basePath: `/nyheter`,
    heading: "Nyheter",
  });
}

export default ArticleListPage;
