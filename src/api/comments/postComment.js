const Comments =require("../../models/Comments")
const postComment = async (req, res) => {
  const comment = req?.body;
  const result = await Comments.create(comment);
  res.send(result);
};

module.exports=postComment