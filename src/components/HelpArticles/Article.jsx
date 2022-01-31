import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import c from "./Article.module.css";
import IconButton from "../ui/IconButton";

const Article = () => {
  const { articleId } = useParams();
  useEffect(() => {
    fetch(`https://minastop-mern.herokuapp.com/help/${articleId}`)
      .then((res) => res.json())
      .then((data) => setArticle(data));
  }, []);

  const [article, setArticle] = useState({});
  // console.log(article);
  // const a = props.article
  return (
    <article className={c.article}>
      <div>
        <IconButton className={c.backBtn}>
          <IoMdArrowBack />
          Back
        </IconButton>
      </div>
      <main>
        <header>
          <h3>{article.title}</h3>
        </header>
        <div>
          <ul>
            {article.categories.map(cat=> <li>{cat}</li>)}
          </ul>
          <p>{article.caption}</p>
        </div>
      </main>
    </article>
  );
};

export default Article;
