import dynamic from "next/dynamic";
import Head from "next/head";

import CardSliderOne from "../components/common/sliders/card/card-slider-one";
import TextSliderTwo from "../components/common/sliders/text/text-slider-two";
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

export default function IndexThree({ newsdata }) {
  return (
    <>
      <Head>
        <title>fugu - index o3</title>
      </Head>
      <HeroSection />
      <CardSliderOne />
      <FilterGalarryOne newsdata={newsdata} />
      <TextSliderTwo />
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

  const query = `*[_type=="news"]{newsTitle,
             newsLongDescription,
             newsShortDescription,
             "id":_id,
             "type":_type,
             "slug":slug.current,
             "createdAt":_createdAt,
             "video":video.asset->,
             "newsImage":newsImage.asset->url,
             "newsCategory":newsCatagory->catagoryName,
             "Catagory" : newsCatagory->}`;
  const newsdata = await client.fetch(query);

  return {
    props: { newsdata: newsdata, header: "three", footer: "three", newsdata },
  };
}
