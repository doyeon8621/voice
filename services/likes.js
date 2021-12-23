const { Likes } = require("../models/index");
const likeClass = require("../classes/likes");

// const findLike = async ({ newTrackId, loginUserId }) => {
//   try {
//     const likeExist = await Likes.findOne({ where: { trackId: newTrackId, userId: loginUserId } });
//     return likeExist;
//   } catch (error) {
//     console.log(error);
//     return error;
//   }
// };

const clickLike = async ({ newTrackId, loginUserId }) => {
  try {
    // newTrackId는 string, loginUserId는 int값임
    const likeExist = await Likes.findOne({ where: { trackId: newTrackId, userId: loginUserId } });
    if (!likeExist) {
      //   2개 선택하는거 맞나?
      await Likes.create({
        trackId: newTrackId,
        userId: loginUserId,
      });
      // likeCnt 중복됨
      const likeCnt = await Likes.count({
        where: { trackId: newTrackId },
      });
      const likeObj = new likeClass.likeForm({ likeCnt, like: true });
      return likeObj;
    }

    await Likes.destroy({ where: { trackId: newTrackId, userId: loginUserId } });
    // likeCnt 중복됨
    const likeCnt = await Likes.count({
      where: { trackId: newTrackId },
    });
    const likeObj = new likeClass.likeForm({ likeCnt, like: false });
    return likeObj;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const findLikes = async ({ newTrackId }) => {
  const findedLikes = await Likes.count({ where: { trackId: newTrackId } });
  return findedLikes;
};

const findLike = async ({ findedTracks }) => {
  let array = [];
  for (let i = 0; i < findedTracks.length; i++) {
    const findedLikes = await Likes.count({ where: { trackId: findedTracks[i] } });
    array.push(findedLikes);
  }
  return array;
};

module.exports = { clickLike, findLikes, findLike };
