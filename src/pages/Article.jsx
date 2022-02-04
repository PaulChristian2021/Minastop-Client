import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import c from "./Article.module.css";
import IconButton from "../components/ui/IconButton";

const Article = () => {
  const navigate = useNavigate();
  const { articleId } = useParams();
  useEffect(() => {
    fetch(`https://minastop-mern.herokuapp.com/help/${articleId}`)
      .then((res) => res.json())
      .then((data) => setArticle(data));
  }, []);

  const [article, setArticle] = useState({
    _id: "",
    date: "",
    title: "",
    caption: "",
    categories: [],
  });

  return (
    <article className={c.article}>
      <nav className={c.nav}>
        <IconButton
          className={c.backBtn}
          onClick={() => {
            navigate(`/help`);
          }}
        >
          <IoMdArrowBack />
          Back
        </IconButton>
      </nav>
      <main className={c.main}>
        <header>
          <h3>{article.title}</h3>
          <span>{article.date.slice(0,10)}</span>
        </header>
        <div className={c.div}>
          <ul className={c.ul}>
            {article.categories.map((cat) => (
              <li key={cat}>{cat}</li>
            ))}
          </ul>
          <p>{article.caption}</p>
        </div>
      </main>
    </article>
  );
};

export default Article;
