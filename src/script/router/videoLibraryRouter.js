const express = require("express");
const router = new express.Router();
const UserRegister = require("./../model/videoLibrary");

router.post("/submit/register", async (req, res) => {
  try {
    let details = new UserRegister(req.body);
    let posted = await details.save();
    res.send(posted);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;