const express = require("express");
const router = new express.Router();
const all = require("./../model/videoLibrary");

router.post("/submit/register", async (req, res) => {
  try {
    let details = new all.UserRegister(req.body);
    let posted = await details.save();
    res.send(posted);
  } catch (err) {
    console.log(err);
  }
});



router.get("/get/userLogin", async (req, res) => {
  try {
    let getDetails = await all.UserRegister.find();
    res.send(getDetails);
  } catch (err) {
    console.log(err);
  }
});

router.get("/get/admin/Login", async (req, res) => {
  try {
    let getAdminDetails = await all.Adminn.find();
    res.send(getAdminDetails);
  } catch (err) {
    console.log(err);
  }
});

router.get("/get/videos", async (req, res) => {
  try {
    let getVideoDetails = await all.Videoss.find();
    res.send(getVideoDetails);
  } catch (err) {
    console.log(err);
  }
});
router.post("/save/videos", async (req, res) => {
  try {
    let postVideos = new all.Videoss(req.body);
    let videos = await postVideos.save();
    res.send(videos);
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;
