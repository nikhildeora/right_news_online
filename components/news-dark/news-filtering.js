/* eslint-disable @next/next/no-img-element */
import Isotope from "isotope-layout";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import NewsCard from "../../components/NewsCard/NewsCard";
import { useRouter } from "next/router";
import Select from "react-select";
import { IoMdArrowDropdown } from "react-icons/io";

export default function NewsFiltering({ newsdata }) {
  // console.log(newsdata);
  const router = useRouter();
  const isotope = useRef();
  const [newsDataCategory, setNewsDatacategory] = useState(newsdata);
  const [activeClass, setActiveClass] = useState("*");
  const [filterKey, setFilterKey] = useState("*");
  const [filterValue, setFilterValue] = useState([]);
  useEffect(() => {
    setNewsDatacategory(newsdata);
    isotope.current = new Isotope("#fugu--two-column", {
      itemSelector: ".collection-grid-item",
      layoutMode: "fitRows",

      percentPosition: true,
    });
    return () => isotope.current.destroy();
  }, [newsDataCategory, newsdata]);

  useEffect(() => {
    setNewsDatacategory(filterValue);
    isotope.current = new Isotope("#fugu--two-column", {
      itemSelector: ".collection-grid-item",
      layoutMode: "fitRows",

      percentPosition: true,
    });
    return () => isotope.current.destroy();
  }, [filterValue]);

  // let x = newsdata?.sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  // let z = newsdata?.sort((a, b) => a.createdAt.localeCompare(b.createdAt));

  // console.log(x);
  // console.log(z);

  const handleFilterKeyChange = (key) => () => {
    setFilterKey(key);
    setActiveClass(key);
  };

  const handleActiveClass = (key) => {
    if (key === activeClass) return "active";
  };

  const options = [
    { value: "latestnews", label: "Latest News" },
    { value: "oldestnews", label: "Oldest News" },
  ];

  const styles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: "#db0303",
      borderColor: "#fff",
      "&:hover": {
        borderColor: state.isFocused
          ? "2px solid #db0303"
          : "#2px solid #db0303",
      },
      "&:focus": {
        borderColor: state.isFocused
          ? "#2px solid #db0303"
          : "#2px solid #db0303",
      },
    }),
    placeholder: (provided, state) => ({
      ...provided,
      color: "#fff",
      fontSize: "18px",
      fontWeight: "550",
      letterSpacing: "0.7px",
    }),
    indicatorContainer: (provided, state) => ({
      ...provided,
      color: "#fff",
      fontSize: "20px",
    }),
    indicatorSeparator: (provided, state) => ({
      ...provided,
      width: "2px",
    }),
    singleValue: (provided, state) => ({
      ...provided,
      color: "#fff",
      fontSize: "18px",
      fontWeight: "550",
      letterSpacing: "0.7px",
    }),
    option: (provided, state) => ({
      ...provided,
      color: "red",
      backgroundColor: "#fff",
      backgroundColor: state.isSelected ? "rgba(225, 215, 198, 1)" : "#fff",
      borderBottom: "2px",
      fontSize: "18px",
      height: "100%",
      letterSpacing: "0.8px",
      fontWeight: "530",
    }),
  };

  const handleFilterChange = (e) => {
    let filteNews;
    if (e.value === "latestnews") {
      console.log(e.value);
      let filterNews = newsdata?.sort((a, b) =>
        b.createdAt.localeCompare(a.createdAt)
      );
      setFilterValue(filteNews);
    } else if (e.value === "oldestnews") {
      console.log(e.value);
      filteNews = newsdata?.sort((a, b) =>
        a.createdAt.localeCompare(b.createdAt)
      );
    }
    setFilterValue(filteNews);
  };

  return (
    <div className="fugu--blog-filtering dark-version row">
      <div className="fugu--section-title-wrap col-md-12">
        <div className="fugu--default-content content-sm">
          <h2>Latest News</h2>
        </div>
        <div className="fugu--portfolio-menu select-container">
          <Select
            options={options}
            styles={styles}
            placeholder={"Sort News..."}
            onChange={handleFilterChange}
          />
        </div>
      </div>

      <div className="col-12">
        <div className="fugu--portfolio-wrap row" id="fugu--two-column">
          {newsDataCategory?.map((news, index) => {
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

//   useEffect(() => {
//   setTimeout(() => {
//     isotope.current = new Isotope("#fugu--two-column", {
//       itemSelector: ".collection-grid-item",
//       layoutMode: "fitRows",

//       percentPosition: true,
//     });
//   }, 500);
// }, []);

// useEffect(() => {
//   filterKey === "*"
//     ? isotope.current.arrange({ filter: `*` })
//     : isotope.current.arrange({ filter: `.${filterKey}` });
// }, [filterKey]);
