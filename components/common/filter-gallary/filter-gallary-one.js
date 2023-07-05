/* eslint-disable @next/next/no-img-element */
import Isotope from "isotope-layout";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Select from "react-select";

import NewsCard from "../../NewsCard/NewsCard";

export default function FilterGalarryOne(props) {
  //Repesat News Filtration
  const filterRepeatNews = () => {
    return props.newsdata.filter(
      (News1, index) =>
        index ===
        props.newsdata.findIndex(
          (other) =>
            News1.newsShortDescription === other.newsShortDescription &&
            News1.newsTitle === other.newsTitle &&
            News1.newsImage === other.newsImage &&
            News1.slug === other.slug &&
            News1.createdAt === other.createdAt
        )
    );
  };

  //Repesat Catagory Filtration

  const filterRepeatCatagory = () => {
    return props.catagorydata.filter(
      (Cat1, index) =>
        index ===
        props.catagorydata.findIndex(
          (other) => Cat1.catagoryName === other.catagoryName
        )
    );
  };

  //Assigning News and catagory

  const [News, setNews] = useState(filterRepeatNews());

  const Catagory = filterRepeatCatagory();

  const options = [
    { value: "latestNews", label: "Latest News Decending" },
    { value: "oldestNews", label: "Oldest News Ascending" },
  ];

  const isotope = useRef();
  const [activeClass, setActiveClass] = useState("*");
  const [filterKey, setFilterKey] = useState("*");

  //Layout For News Cards
  useEffect(() => {
    setTimeout(() => {
      isotope.current = new Isotope("#fugu--four-column", {
        itemSelector: ".collection-grid-item",
        layoutMode: "fitRows",

        percentPosition: true,
        resizable: false,
        masonry: {
          columnWidth: ".collection-grid-item",
          gutterWidth: 0,
        },
      });
      return () => isotope.current.destroy();
    }, 10);
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

  // Sort by Date function
  const handleChange = (e) => {
    console.log(e);
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
              <span>All News</span>
            </li>
            {Catagory.map((Cat, index) => {
              return (
                <li
                  key={index}
                  onClick={handleFilterKeyChange(Cat.catagoryName)}
                  className={handleActiveClass(Cat.catagoryName)}
                >
                  <span>{Cat.catagoryName}</span>
                </li>
              );
            })}
          </ul>
        </div>
        {/* <div className="container ">
          <div className="filters">
            <Select onChange={handleChange} options={options} />
          </div>
        </div> */}
        <div className="fugu--portfolio-wrap mt-2" id="fugu--four-column">
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

//----------------------------------------------------------------------------------------------------------------------//

//old codes related to template

{
  /* <Catagorylist key={index} Cat={Cat}></Catagorylist>; */
}

//  <li onClick={handleFilterKeyChange("*")} className={handleActiveClass("*")}>
//    <span>All News</span>
//  </li>;

//<li
//  onClick={handleFilterKeyChange("virtual")}
//  className={handleActiveClass("virtual")}
//>
//  <span>
//    <img src="/images/all-img/v3/m-icon3.png" alt="" /> Virtual Land
//  </span>
//</li>
//<li
//  onClick={handleFilterKeyChange("domain")}
//  className={handleActiveClass("domain")}
//>
//  <span>
//    <img src="/images/all-img/v3/m-icon4.png" alt="" /> Domain Names
//  </span>
//</li>
//<li
//  onClick={handleFilterKeyChange("music")}
//  className={handleActiveClass("music")}
//>
//  <span>
//    <img src="/images/all-img/v3/m-icon5.png" alt="" />
//    Music
//  </span>
//</li>
//<li
//  onClick={handleFilterKeyChange("sports")}
//  className={handleActiveClass("sports")}
//>
//  <span>
//    <img src="/images/all-img/v3/m-icon6.png" alt="" />
//    Sports
//  </span>
//</li>

// useEffect(() => {
//   if (filterKey === "*") {
//     setNews(props.newsdata);
//     console.log(News);
//   } else {
//     const N = props.newsdata.filter((v1) => {
//       return v1.newsCategory === filterKey;
//     });
//     console.log(N);
//     setNews(N);
//   }
// }, [News]);

//   if (key === "*") {
//     setNews(props.newsdata);

//     console.log(News);
//   } else {
//     const N = props.newsdata.filter((v1) => {
//       return v1.newsCategory === key;
//     });
//     console.log(N);
//     setNews(N);
//   }
// };

// isotope.current = new Isotope("#fugu--four-column", {
//   itemSelector: ".collection-grid-item",

//   resizable: false,
//   masonry: {
//     columnWidth: ".collection-grid-item",
//     gutterWidth: 0,
//   },
// });
