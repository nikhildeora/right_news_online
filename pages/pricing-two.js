import dynamic from "next/dynamic";

import FaqSection from "../components/common/faq/faq-section";
// import PricingSectionTwo from "../components/common/pricing/pricing-section-two";
import BreadcrumbOne from "./../components/common/breadcrumb/breadcrumb-one";
import ClientSliderTwo from "./../components/common/sliders/client/client-slider-two";

import { createClient } from "next-sanity";

const PricingSectionTwo = dynamic(
  () => import("../components/common/pricing/pricing-section-two"),
  {
    ssr: false,
  }
);

export default function PricingTwo(props) {
  //   console.log(props.newsplans);
  return (
    <>
      <BreadcrumbOne title="Membership Pricing" />
      <PricingSectionTwo newsplans={props.newsplans} />
      <FaqSection />
      <ClientSliderTwo />
    </>
  );
}

export async function getStaticProps() {
  const client = createClient({
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: process.env.SANITY_DATASET,
    token: process.env.SANITY_TOKEN,

    useCdn: false, // set to `false` to bypass the edge cache-
    apiVersion: "1",
  });

  const query = `*[_type=="plans"]{
                 planDays,
                 dailyDownloadLimit,
                 planPrice,
                 planTitle,
                 planScreen,
                 planFocus,
                 "id":_id,
                 "type":_type,
                 "slug":slug.current,
                 "rev":_rev,
                 "createdAt":_createdAt,
                 "updatedAT":_updatedAt,             
                 "planIcon":planIcon.asset->url
                 }`;
  const newsplans = await client.fetch(query);

  return {
    props: { newsplans: newsplans },
  };
}
