import React, { useState, useEffect } from "react";
import {
  useNavigate,
  // , Routes, Route
} from "react-router-dom";
import c from "./HelpPage.module.css";

import SearchCategoriesNav from "../components/SearchCategoriesNav/SearchCategoriesNav";
import SearchBar from "../components/SearchBar/SearchBar";

import HelpArticleLi from "../components/HelpArticles/HelpArticleLi";
import HelpCategoyLi from "../components/HelpArticles/HelpCategoyLi";
// import Article from "../components/HelpArticles/Article";

const HelpPage = () => {
  // const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setfilteredArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setactiveCategory] = useState("");
  const [articleId, setArticleId] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState({
    id: 1,
    date: "Jan 14, 2022",
    title:
      "[Technical Issues] What should I do if I encounter a problem/error/blank page on Minastop?",
    caption:
      "If you encounter technical issues on the app, such as problem loading pages, payment not processing, inability to add a product to cart, or inability to send messages via Minastop, contact us.",
    categories: ["tech", "account"],
  });

  useEffect(() => {
    fetch("https://minastop-mern.herokuapp.com/help").then((res) =>
      res.json().then((data) => {
        setArticles(data);
        // props.setHelpArticles(data)
        setfilteredArticles(data);
        // console.log(data)
      })
    );
  }, []);

  useEffect(() => {
    //gets all categories based off 'articles' state
    const cat = [];
    articles.forEach((a) => {
      a.categories.forEach((category) =>
        cat.includes(category) ? null : cat.push(category)
      );
    });
    setCategories(cat);
    // console.log(articles);
  }, [articles]);
  // console.log(window.location.href)
  function toggleArticles(id) {
    // navigate(`/help/${id}`);
    // console.log(id);
    // setArticleId(id);
    // console.log(articleId);
    window.open(window.location.href + '/' + id);
  }
  useEffect(() => {
    const article = articles.filter((a) => a.id === articleId);
    const [a] = article;
    setSelectedArticle(a);
    console.log(articleId); //for toggleArticles()
    return () => {
      console.log(a, selectedArticle);
    };
  }, [articleId]);

  function changeActiveCategory(category) {
    category === "all" ? setactiveCategory("") : setactiveCategory(category);
  }
  useEffect(() => {
    //renders articles under activecategory
    if(activeCategory){
      const filtered = articles.filter((a) =>
        a.categories.includes(activeCategory)
      );
      setfilteredArticles(filtered);
    }else{
      setfilteredArticles(articles)
    }
  }, [activeCategory]);

  return (
    <section className={`section ${c.section}`}>
      <h2>Guides Center</h2>
      <SearchCategoriesNav className={c.nav}>
        <SearchBar placeholder="How can we help?" />
      </SearchCategoriesNav>
      <section className={c.section2}>
        <nav>
          <ul className={c.categories}>
            <HelpCategoyLi
              className={c.category}
              key={c}
              text={"all"}
              active={activeCategory}
              onClick={changeActiveCategory}
            />
            {categories.map((c) => (
              <HelpCategoyLi
                className={c.category}
                key={c}
                text={c}
                active={activeCategory}
                onClick={changeActiveCategory}
              />
            ))}
          </ul>
        </nav>
        <ul className={c.articles}>
          {!articleId &&
            filteredArticles.map((a) => (
              <HelpArticleLi
                key={a._id}
                id={a._id}
                title={a.title}
                caption={a.caption}
                date={a.date}
                categories={a.categories}
                toggleArticles={toggleArticles}
              />
            ))}
        
        </ul>
        
      </section>
    </section>
  );
};

export default HelpPage;
