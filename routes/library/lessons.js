const { Router } = require("express");
const router = Router();
const Library = require("../../models/Library");
const Lesson = require("../../models/Lesson");
const toDelete = require("../../middleware/fileDelete");
const adminMan = require("../../middleware/adminManager");
router.get("/add", adminMan, async (req, res) => {
  const categories = await Library.find();
  res.render("lessons/lesson-add", {
    title: "Create lesson",
    categories,
  });
});
router.post("/add", adminMan, async (req, res) => {
  const lesson = new Lesson({
    name: req.body.name,
    url: req.body.url,
    libraryId: req.body.libraryId,
  });
  await lesson.save();
  res.redirect("/library");
});
router.get("/edit/:id", adminMan, async (req, res) => {
  const lesson = await Lesson.findById(req.params.id);
  res.render("lessons/lesson-edit", {
    title: "Edit lesson",
    lesson,
  });
});
router.post("/edit/:id", adminMan, async (req, res) => {
  const lesson = req.body;
  await Lesson.findByIdAndUpdate(req.params.id, lesson, (err) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect(`/library/${req.body.libraryId}`);
    }
  });
});
router.post("/delete/:id", adminMan, async (req, res) => {
  const { img } = await Lesson.findById(req.params.id);
  toDelete(img);
  await Lesson.findByIdAndDelete(req.params.id);
  res.redirect(`/library/${req.body.libraryId}`);
});

module.exports = router;
