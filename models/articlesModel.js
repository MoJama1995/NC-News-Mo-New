const connection = require("../db/connection");

const selectArticles = ({ sort_by, order, author, topic }) => {
  return connection
    .select(
      "articles.author",
      "articles.title",
      "articles.article_id",
      "articles.body",
      "articles.topic",
      "articles.created_at",
      "articles.votes"
    )
    .count("comments.article_id as comment_count")
    .from("articles")
    .leftJoin("comments", "comments.article_id", "=", "articles.article_id")
    .groupBy("articles.article_id")
    .orderBy(sort_by || "created_at", order || "desc")
    .returning("*")
    .modify(query => {
      if (author) query.where("articles.author", author);
      if (topic) query.where("articles.topic", topic);
    });
};

const selectArticlesById = article_id => {
  return connection
    .select("*")
    .from("articles")
    .where("article_id", "=", article_id)
    .groupBy("articles.article_id")
    .returning("*");
};

const updateArticle = (article_id, { votes }) => {
  return connection("articles")
    .where("article_id", "=", article_id)
    .increment({ votes })
    .returning("*");
};

const selectCommentsByArticleID = (article_id, { sort_by, order }) => {
  return connection("comments")
    .where("comments.article_id", "=", article_id)
    .orderBy(sort_by || "created_at", order || "desc")
    .returning("*");
};

const insertComments = (comments, { article_id }) => {
  console.log(comments);
  return connection("comments")
    .insert(comments)
    .returning("*");
};

module.exports = {
  selectArticles,
  selectArticlesById,
  updateArticle,
  selectCommentsByArticleID,
  insertComments
};
