import News from "../models/News.js";

export const createRepository = ({ title, banner, text }, userId) =>
  News.create({ title, banner, text, user: userId });

export const findAllRepository = (offset, limit) =>
  News.find().sort({ _id: -1 }).skip(offset).limit(limit).populate("user");

export const countNewsRepository = () => News.countDocuments();

export const topNewsRepository = () =>
  News.findOne().sort({ _id: -1 }).populate("user");

  export const findByIdRepository = (id) => {
    return News.findById(id).populate("user");
  };

export const searchByTitleRepository = (title) =>
  News.find({
    title: { $regex: `${title || ""}`, $options: "i" },
  })
    .sort({ _id: -1 })
    .populate("user");

export const findByUserRepository = (id) =>
  News.find({ user: id }).sort({ _id: -1 }).populate("user");

export const updateNewsRepository = (id, title, text, banner) =>
  News.findOneAndUpdate(
    { _id: id },
    { title, text, banner },
    { rawResult: true }
  );

export const delNewsRepository = (id) =>
  News.findOneAndDelete({ _id: id });

export const newsLikedRepository = (id, userId) =>
  News.findOneAndUpdate(
    { _id: id, "likes.userId": { $nin: [userId] } },
    { $push: { likes: { userId, created: new Date() } } },
    {
      rawResult: true,
    }
  );

export const delLikedNewsRepository = (id, userId) =>
  News.findOneAndUpdate({ _id: id }, { $pull: { likes: { userId } } });

export const addCommentNewsRepository = (idNews, comment, userId) => {
  let idComment = Math.floor(Date.now() * Math.random()).toString(36);

  return News.findOneAndUpdate(
    { _id: idNews },
    {
      $push: {
        comments: { idComment, comment, userId, createdAt: new Date() },
      },
    },
    {
      rawResult: true,
    }
  );
};

export const delCommentNewsRepository = (idNews, idComment, userId) =>
  News.findOneAndUpdate(
    { _id: idNews },
    { $pull: { comments: { idComment, userId } } }
  );

