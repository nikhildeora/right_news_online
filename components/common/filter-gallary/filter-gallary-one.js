/* eslint-disable @next/next/no-img-element */
import Isotope from "isotope-layout";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import NewsCard from "../../NewsCard/NewsCard";

export default function FilterGalarryOne(props) {
  //News Content
  const News = props.newsdata;

  const isotope = useRef();
  const [activeClass, setActiveClass] = useState("*");
  const [filterKey, setFilterKey] = useState("*");
  useEffect(() => {
    setTimeout(() => {
      isotope.current = new Isotope("#fugu--four-column", {
        itemSelector: ".collection-grid-item",

        resizable: false,
        masonry: {
          columnWidth: ".collection-grid-item",
          gutterWidth: 0,
        },
      });
    }, 1000);
    return () => isotope.current.destroy();
  }, []);

  useEffect(() => {
    if (isotope.current)
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
    <div className="fugu--portfolio-section fugu--section-padding">
      <div className="container">
        <div className="fugu--section-title">
          <div className="fugu--default-content content-sm">
            <h2>Explore the most unique artworks</h2>
            <p>
              NFTs are usually associated with non-physical art but in reality,
              there are several different types of NFTs and are explained in
              this guide.
            </p>
          </div>
        </div>

        <div className="fugu--portfolio-menu">
          <ul className="option-set clear-both">
            <li
              onClick={handleFilterKeyChange("*")}
              className={handleActiveClass("*")}
            >
              <span>
                <img src="/images/all-img/v3/m-icon1.png" alt="" /> Artworks
              </span>
            </li>
            <li
              onClick={handleFilterKeyChange("video")}
              className={handleActiveClass("video")}
            >
              <span>
                <img src="/images/all-img/v3/m-icon2.png" alt="" />
                Video-Game
              </span>
            </li>
            <li
              onClick={handleFilterKeyChange("virtual")}
              className={handleActiveClass("virtual")}
            >
              <span>
                <img src="/images/all-img/v3/m-icon3.png" alt="" /> Virtual Land
              </span>
            </li>
            <li
              onClick={handleFilterKeyChange("domain")}
              className={handleActiveClass("domain")}
            >
              <span>
                <img src="/images/all-img/v3/m-icon4.png" alt="" /> Domain Names
              </span>
            </li>
            <li
              onClick={handleFilterKeyChange("music")}
              className={handleActiveClass("music")}
            >
              <span>
                <img src="/images/all-img/v3/m-icon5.png" alt="" />
                Music
              </span>
            </li>
            <li
              onClick={handleFilterKeyChange("sports")}
              className={handleActiveClass("sports")}
            >
              <span>
                <img src="/images/all-img/v3/m-icon6.png" alt="" />
                Sports
              </span>
            </li>
          </ul>
        </div>
        <div className="fugu--portfolio-wrap" id="fugu--four-column">
          {News.map((news, index) => {
            return <NewsCard key={index} news={news}></NewsCard>;
          })}
        </div>
      </div>
      <div className="fugu--shape2">
        <img src="/images/shape2/shape2.png" alt="" />
      </div>
    </div>
  );
}
