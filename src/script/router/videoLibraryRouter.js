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
    let getAdminDetails = await all.Admin.find();
    res.send(getAdminDetails);
  } catch (err) {
    console.log(err);
  }
});

router.get("/get/videos", async (req, res) => {
  try {
    let getVideoDetails = await all.Videos.find();
    res.send(getVideoDetails);
  } catch (err) {
    console.log(err);
  }
});
router.post("/save/videos", async (req, res) => {
  try {
    let postVideo = new all.Videos(req.body);
    let videos = await postVideo.save();
    res.send(videos);
  } catch (err) {
    console.log(err);
  }
});
router.get("/view/video/:id", async (req, res) => {
  try {
    const id = req.params.id;
    let videos = await all.Videos.find({ _id: id });
    res.send(videos);
  } catch (err) {
    console.log(err);
  }
});

router.put("/save/edit/video/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let b = await all.Videos.findByIdAndUpdate({ _id: id }, { $set: req.body }, { new: true });
    res.send(b);
  } catch (err) {
    console.log(err);
  }
});

router.delete("/delete/video/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let b = await all.Videos.deleteOne({ _id: id });
    res.send(b);
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;
