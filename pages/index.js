import dynamic from "next/dynamic";
import Head from "next/head";

import CardSliderOne from "../components/common/sliders/card/card-slider-one";
import TextSliderNews from "../components/common/sliders/text/text-slider-News";
import HeroSection from "../components/home-three/hero-section";
import NewsLetter from "../components/home-three/news-letter";
import NftRoadMap from "../components/home-three/nft-roadmap";
import Team from "../components/home-three/Team";

import { createClient } from "next-sanity";

const FilterGalarryOne = dynamic(
  () => import("../components/common/filter-gallary/filter-gallary-one"),
  {
    ssr: false,
  }
);

export default function IndexThree({ newsdata, catagorydata }) {
  return (
    <>
      <Head>
        <title>fugu - index 01</title>
      </Head>
      <HeroSection />
      <CardSliderOne />
      <FilterGalarryOne newsdata={newsdata} catagorydata={catagorydata} />
      <TextSliderNews newsdata={newsdata} />
      <Team />
      <NftRoadMap />
      <NewsLetter />
    </>
  );
}
export async function getStaticProps() {
  const client = createClient({
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: process.env.SANITY_DATASET,
    token: process.env.SANITY_TOKEN,

    useCdn: false, // set to `false` to bypass the edge cache
    apiVersion: "1",
  });

  const newsQuery = `*[_type=="news"]{newsTitle,
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

  const catagoryQuery = `*[_type=="catagories"]{
                        "id":_id,
                        "type":_type,
                        "slug":slug.current,
                        "rev":_rev,
                        "createdAt":_createdAt,
                        "updatedAT":_updatedAt,             
                        "catagoryImage":catagoryImage.asset->url,
                        "catagoryName":catagoryName
                        }`;

  const catagorydata = await client.fetch(catagoryQuery);
  return {
    props: {
      newsdata: newsdata,
      catagorydata: catagorydata,
      header: "three",
      footer: "three",
    },
  };
}

//  const cat = {
//    id: "",
//    type: "catagories",
//    slug: null,
//    rev: "",
//    createdAt: "",
//    updatedAT: "",
//    catagoryImage: "",
//    catagoryName: "All News",
//  };
//  catagorydata.unshift(cat);
