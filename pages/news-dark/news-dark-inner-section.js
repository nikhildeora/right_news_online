import dynamic from "next/dynamic";
import BlogTopSection from "../blog-light/blog-top-section";
import BreadcrumbsSection from "../blog-light/breadcrumbs-section";
import NewsPaginationDark from "./news-pagination";
const NewsFiltering = dynamic(() => import("./news-filtering"), {
  ssr: false,
});
export default function NewsDarkInnerSection({ newsdata }) {
  return (
    <div className="fugu--inner-section dark-version">
      <div className="container">
        <BreadcrumbsSection />
        {/* <BlogTopSection /> */}
        <NewsFiltering newsdata={newsdata} />
        <NewsPaginationDark />
      </div>

      <div className="fugu--blog-shape1">
        <img src="/images/all-img/v3/shape2.png" alt="" />
      </div>
      <div className="fugu--blog-shape3">
        <img src="/images/all-img/blog2/shape.png" alt="" />
      </div>
    </div>
  );
}
