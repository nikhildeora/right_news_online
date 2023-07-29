import { createClient } from "next-sanity";
import { useRouter } from "next/router";
import NewsDarkInnerSection from "../../../components/news-dark/news-dark-inner-section";

export default function BlogDark({ newsdata }) {
  return <NewsDarkInnerSection newsdata={newsdata} />;
}

export async function getServerSideProps(props) {
  // console.log(props.params.category);
  // program to convert first letter of a string to uppercase
  function capitalizeFirstLetterofstring(strg) {
    return strg.charAt(0).toUpperCase() + strg.slice(1);
  }

  const Category = capitalizeFirstLetterofstring(props.params.category);

  const client = createClient({
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: process.env.SANITY_DATASET,
    token: process.env.SANITY_TOKEN,

    useCdn: false, // set to `false` to bypass the edge cache
    apiVersion: "1",
  });

  const newsQuery = `*[_type=="news"&&newsCatagory->catagoryName=="${Category}"]| order(_createdAt desc){newsTitle,
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

  // console.log(newsQuery);

  const newsdata = await client.fetch(newsQuery);
  // console.log(newsdata);

  return {
    props: {
      newsdata: newsdata,
      header: "three",
      footer: "three",
    },
  };
}

// -------------------------------------------------------------------------------------------------------------------------------------
// const newsQuery = `*[_type=="news"&&newsCatagory->catagoryName=="${Queryparameter}"]| order(_createdAt desc){newsTitle,
//                      newsLongDescription,
//                      newsShortDescription,
//                      "id":_id,
//                      "type":_type,
//                      "slug":slug.current,
//                      "createdAt":_createdAt,
//                      "video":newsVideo.asset->,
//                      "newsImage":newsImage.asset->url,
//                      "newsCategory":newsCatagory->catagoryName,
//                      "Catagory" : newsCatagory->}`;
// ----------------------------------------------------------------------------------------------------------------------------
//   const filterParam = filterFunction(props.params.category.split("-"));
//   const filterFunction = (arr) => {
//   if (arr[0] && arr[1] == "oldest" && arr[2] === "news") {
//     return "_createdAt asc";
//   } else if (arr[0]) {
//     return "_createdAt desc";
//   }
// };

// ----------------------------------------------------------------------------------------------------------------------------------
// export const getStaticPaths = async () => {
//   return {
//     paths: [
//       {
//         params: {
//           category: "next.js",
//         },
//       },
//     ],
//     fallback: true,
//   };
// };
