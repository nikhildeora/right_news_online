/* eslint-disable @next/next/no-img-element */
import Isotope from "isotope-layout";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import NewsCard from "../../components/NewsCard/NewsCard";

export default function NewsFiltering({ newsdata }) {
  const isotope = useRef();
  const [activeClass, setActiveClass] = useState("*");
  const [filterKey, setFilterKey] = useState("*");
  useEffect(() => {
    isotope.current = new Isotope("#fugu--two-column", {
      itemSelector: ".collection-grid-item",
      layoutMode: "fitRows",

      percentPosition: true,
    });
    return () => isotope.current.destroy();
  }, []);

  useEffect(() => {
    filterKey === "*"
      ? isotope.current.arrange({ filter: `*` })
      : isotope.current.arrange({ filter: `.${filterKey}` });
  }, [filterKey]);

  const handleFilterKeyChange = (key) => () => {
    setFilterKey(key);
    setActiveClass(key);
  };

  const handleActiveClass = (key) => {
    if (key === activeClass) return "active";
  };
  return (
    <div className="fugu--blog-filtering dark-version row">
      <div className="fugu--section-title-wrap col-md-12">
        <div className="fugu--default-content content-sm">
          <h2>Latest News</h2>
        </div>
        <div className="fugu--portfolio-menu"></div>
      </div>

      <div className="col-12">
        <div className="fugu--portfolio-wrap row" id="fugu--two-column">
          {newsdata.map((news, index) => {
            return <NewsCard key={index} news={news}></NewsCard>;
          })}
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------------------------------------------------------------------------------------
//Category filter which was placed inside "fugu--portfolio-menu"

//  <ul className="option-set clear-both">
//    <li onClick={handleFilterKeyChange("*")} className={handleActiveClass("*")}>
//      <span>All</span>
//    </li>
//    <li
//      onClick={handleFilterKeyChange("analysis")}
//      className={handleActiveClass("analysis")}
//    >
//      <span>Art & Analysis</span>
//    </li>
//    <li
//      onClick={handleFilterKeyChange("collectible")}
//      className={handleActiveClass("collectible")}
//    >
//      <span>Collectible</span>
//    </li>
//    <li
//      onClick={handleFilterKeyChange("metaverse")}
//      className={handleActiveClass("metaverse")}
//    >
//      <span>Metaverse</span>
//    </li>
//    <li
//      onClick={handleFilterKeyChange("utility")}
//      className={handleActiveClass("utility")}
//    >
//      <span>Utility</span>
//    </li>
//  </ul>;
