// posts
const db = require("../models");
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");
const path = require("path");

module.exports = {
  // getAllPosts
  findAll: function (req, res) {
    // console.log("Get all posts")
    db.Post.find(req.query)
      .sort({ date: -1 })
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },

  // find posts by owner (user) id req.user._id
  findPostsByUser: function (req, res) {
    // console.log("Find by user from post Controller")
    const ObjectId = require("mongoose").Types.ObjectId;
    // console.log(req.user._id)
    db.Post.find({ owner: new ObjectId(req.user._id) })
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },

  // getPostBy Post Id
  findById: function (req, res) {
    db.Post.findById(req.params.id)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },

  // createPost for logged in user
  // logged in user id = req.user._id
  create: async (req, res) => {
    try {
      // console.log(req.file.path)
      // upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {
        upload_preset: "cuposugar",
      });
      // create post body with form data and cloudinary secure_url and public_id
      const value = {
        ...req.body,
        owner: req.user._id,
        image: result.secure_url,
        cloudinary_id: result.public_id,
      };
      const model = await db.Post.create(value);
      // console.log(value, model);
      res.json(model);
    } catch (err) {
      console.log(err);
    }
  },

  // updatePost - if item is open, assign to requester; if item was already requested, return 'alreadyRequested' message
  update: async (req, res) => {
    try {
      // get post info and status
      let post = await db.Post.findOne({ _id: req.params.id });
      // if already claimed, return alreadyClaimed message
      if (post.status === "claimed") {
        res.json("alreadyClaimed");
        return;
      }

      // if item still open, update post as status claimed with responseOwner as logged in owner
      // logged in user id = req.user._id
      let postUpdate = await db.Post.findOneAndUpdate(
        { _id: req.params.id },
        { ...req.body, responseOwner: req.user._id },
        { new: true }
      ).populate("User");

      // get post owner info
      let postOwnerInfo = await db.User.findOne({ _id: postUpdate._doc.owner });

      // return updated post with post owmer info (email)
      res.json({ ...postUpdate._doc, owner: postOwnerInfo });
    } catch (err) {
      res.status(422).json(err);
      console.log(err);
    }
  },

  // deletePost
  remove: function (req, res) {
    db.Post.findById({ _id: req.params.id })
      .then((dbModel) => dbModel.remove())
      // delete image from cloudinary
      .then((dbModel) => {
        cloudinary.v2.uploader.destroy(
          dbModel.cloudinary_id,
          function (error, result) {
            console.log(result, error);
          }
        );
      })
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
};
