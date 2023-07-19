import { createClient } from "next-sanity";
import NewsDarkInnerSection from "../components/news-dark/news-dark-inner-section";

export default function BlogDark({ newsdata }) {
  return <NewsDarkInnerSection newsdata={newsdata} />;
}

export async function getStaticProps() {
  const client = createClient({
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: process.env.SANITY_DATASET,
    token: process.env.SANITY_TOKEN,

    useCdn: false, // set to `false` to bypass the edge cache
    apiVersion: "1",
  });

  const newsQuery = `*[_type=="news"&&newsCatagory->catagoryName=="Sports"]{newsTitle,
                     newsLongDescription,
                     newsShortDescription,
                     "id":_id,
                     "type":_type,
                     "slug":slug.current,
                     "createdAt":_createdAt,
                     "video":newsVideo.asset->,
                     "newsImage":newsImage.asset->url,
                     "newsCategory":newsCatagory->catagoryName,
                     "Catagory" : newsCatagory->}`;

  const newsdata = await client.fetch(newsQuery);

  return {
    props: {
      newsdata: newsdata,
      header: "three",
      footer: "three",
    },
  };
}
