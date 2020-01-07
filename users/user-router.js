const express = require("express");
const postRouter = require("../posts/post-router");
const db = require("../data/db-config.js");
const userModel = require("./user-model");

const router = express.Router();

router.use("/:id/posts", postRouter);

router.get("/", async (req, res, next) => {
  try {
    res.json(await userModel.find());
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    res.json(await userModel.findById(id));
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  const userData = req.body;
  try{
    res.json(await userModel.add(userData))
  }catch(err){
    next(err)
  }
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  db("users")
    .where({ id })
    .update(changes)
    .then(count => {
      if (count) {
        res.json({ update: count });
      } else {
        res.status(404).json({ message: "Could not find user with given id" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to update user" });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  db("users")
    .where({ id })
    .del()
    .then(count => {
      if (count) {
        res.json({ removed: count });
      } else {
        res.status(404).json({ message: "Could not find user with given id" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to delete user" });
    });
});

module.exports = router;
