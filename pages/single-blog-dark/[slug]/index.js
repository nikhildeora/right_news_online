import InnerSection from "../../../components/single-blog-dark/inner-section";
import { createClient } from "next-sanity";
export default function SingleBlogDark(props) {
  return <InnerSection news={props.news} />;
}

export async function getServerSideProps(props) {
  console.log(props);

  const client = createClient({
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: process.env.SANITY_DATASET,
    token: process.env.SANITY_TOKEN,

    useCdn: false, // set to `false` to bypass the edge cache
    apiVersion: "1",
  });
  const news =
    await client.fetch(`*[_type == "news" && slug.current == "${props.params.slug}"][0]{newsTitle,
		newsLongDescription,
		newsShortDescription,
		"id":_id,
		"type":_type,
		"slug":slug.current,
		"createdAt":_createdAt,
    "video":newscvid.url,
		"newsImage":newsImage.asset->url,
		"newsCategory":newsCatagory->catagoryName,
		"Catagory" : newsCatagory->}`);
  return { props: { header: "three", footer: "three", news: news } };
}

// -----------------------------------------------------------------------------------------------------------------------------
// Furkan's Code below
// export const getStaticPaths = async () => {
//   return {
//     paths: [
//       {
//         params: {
//           slug: "next.js",
//         },
//       },
//     ],
//     fallback: true,
//   };
// };
