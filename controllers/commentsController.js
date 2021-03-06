const { updateComments, deleteComments } = require("../models/commentModels");

const patchCommentsByID = (req, res, next) => {
  console.log("hit controller");
  const { comment_id } = req.params;
  updateComments(comment_id, req.body)
    .then(comments => {
      if (comments.length === 0)
        return Promise.reject({ status: 404, msg: "Comment not found" });
      else res.status(200).send({ comments });
    })
    .catch(next);
};
const deleteCommentsByID = (req, res, next) => {
  const { comment_id } = req.params;
  deleteComments(comment_id, req.body).then(comments => {
    res.status(204).send(comments);
  });
};

module.exports = { patchCommentsByID, deleteCommentsByID };
