const LidCategory = require("../models/LidCategory");
const LidForm = require("../models/LidForm");
module.exports.LidsGet = async (req, res) => {
  const admin = req.session.admin;
  const lidForms = await LidForm.find();
  const lids = await LidCategory.find();
  await Promise.all(
    lidForms.map((c) => c.populate("categoryId").execPopulate())
  );
  lids.map((c) => {
    const count = lidForms.filter((k) => {
      return c.name === k.categoryId.name;
    });
    c.count = count.length;
    return c;
  });
  const today = lidForms.filter((c) => {
    var date_new = c.date;
    var date_t = new Date(date_new);
    var date = new Date();
    var timer = (date_t - date) / 1000 / 3600;
    if (timer > 0 && timer < 24) {
      return c;
    }
  });
  const todayLength = today.length;
  const tomorrow = lidForms.filter((c) => {
    var date_new = c.date;
    var date_t = new Date(date_new);
    var date = new Date();
    var timer = (date_t - date) / 1000 / 3600;
    if (timer > 24 && timer < 48) {
      return c;
    }
  });
  const tomorrowLength = tomorrow.length;
  const fire = lidForms.filter((c) => {
    var date_new = c.date;
    var date_t = new Date(date_new);
    var date = new Date();
    var timer = (date_t - date) / 1000 / 3600;
    if (timer < 0) {
      return c;
    }
  });
  const fireLength = fire.length;
  res.render("lids/lids", {
    layout: "admin",
    admin,
    lids,
    lidForms,
    todayLength,
    tomorrowLength,
    fireLength,
  });
};
module.exports.LidsPost = async (req, res) => {
  const { name, categoryId, num1, num2, found, company, comment, date, note } =
    req.body;
  const lids = new LidForm({
    name,
    categoryId,
    num1,
    num2,
    found,
    company,
    comment,
    date,
    note,
  });
  await lids.save();
  res.redirect("/lids");
};
module.exports.moreLidsGet = async (req, res) => {
  const admin = req.session.admin;
  const lidForms = await LidForm.findById(req.params.id);
  res.render("lids/moreLid", {
    layout: "admin",
    admin,
    lidForms,
  });
};
module.exports.lidCategoriesGet = async (req, res) => {
  const admin = req.session.admin;
  const lids = await LidCategory.find();
  res.render("lids/lidCategory", {
    layout: "admin",
    lids,
    admin,
  });
};
module.exports.idCategoriesLidGet = async (req, res) => {
  const admin = req.session.admin;
  const lidsCategory = await LidCategory.findById(req.params.id);
  const lidForms = await LidForm.find();
  await Promise.all(
    lidForms.map((c) => c.populate("categoryId").execPopulate())
  );
  const lids = await LidCategory.find();
  const lidds = lidForms.filter((c) => {
    return c.categoryId.name == lidsCategory.name;
  });
  lids.map((c) => {
    const count = lidForms.filter((k) => {
      return c.name === k.categoryId.name;
    });
    c.count = count.length;
    return c;
  });
  const today = lidForms.filter((c) => {
    var date_new = c.date;
    var date_t = new Date(date_new);
    var date = new Date();
    var timer = (date_t - date) / 1000 / 3600;
    if (timer > 0 && timer < 24) {
      return c;
    }
  });
  const todayLength = today.length;
  const tomorrow = lidForms.filter((c) => {
    var date_new = c.date;
    var date_t = new Date(date_new);
    var date = new Date();
    var timer = (date_t - date) / 1000 / 3600;
    if (timer > 24 && timer < 48) {
      return c;
    }
  });
  const tomorrowLength = tomorrow.length;
  const fire = lidForms.filter((c) => {
    var date_new = c.date;
    var date_t = new Date(date_new);
    var date = new Date();
    var timer = (date_t - date) / 1000 / 3600;
    if (timer < 0) {
      return c;
    }
  });
  const fireLength = fire.length;
  res.render("lids/lidID", {
    title: lidsCategory.name,
    layout: "admin",
    lidds,
    lids,
    admin,
    fireLength,
    tomorrowLength,
    todayLength,
  });
};
module.exports.createCategoriesLidGet = (req, res) => {
  const admin = req.session.admin;
  res.render("lids/addCategoryLid", {
    layout: "admin",
    title: "Create LidCategory",
    admin,
  });
};
module.exports.createCategoriesLidPost = async (req, res) => {
  const { name } = req.body;
  const lidCategory = new LidCategory({
    name,
  });
  await lidCategory.save();
  res.redirect("/lids");
};
module.exports.editLidsGet = async (req, res) => {
  const admin = req.session.admin;
  const lidForms = await LidForm.findById(req.params.id);
  const lids = await LidCategory.find();
  res.render("lids/lidEdit", {
    layout: "admin",
    title: "Edit Lid",
    lids,
    lidForms,
    admin,
  });
};
module.exports.editLidsPost = async (req, res) => {
  const admin = req.body;
  await LidForm.findByIdAndUpdate(req.params.id, admin, (err) => {
    console.log(err);
  });
  res.redirect("/lids");
};
module.exports.deleteLidsGet = async (req, res) => {
  await LidForm.findByIdAndDelete(req.params.id);
  res.redirect("/lids");
};
module.exports.todayLidsGet = async (req, res) => {
  const admin = req.session.admin;
  const lidForms = await LidForm.find();
  const lids = await LidCategory.find();
  await Promise.all(
    lidForms.map((c) => c.populate("categoryId").execPopulate())
  );
  lids.map((c) => {
    const count = lidForms.filter((k) => {
      return c.name === k.categoryId.name;
    });
    c.count = count.length;
    return c;
  });
  const today = lidForms.filter((c) => {
    var date_new = c.date;
    var date_t = new Date(date_new);
    var date = new Date();
    var timer = (date_t - date) / 1000 / 3600;
    if (timer > 0 && timer < 24) {
      return c;
    }
  });
  const todayLength = today.length;
  const tomorrow = lidForms.filter((c) => {
    var date_new = c.date;
    var date_t = new Date(date_new);
    var date = new Date();
    var timer = (date_t - date) / 1000 / 3600;
    if (timer > 24 && timer < 48) {
      return c;
    }
  });

  const tomorrowLength = tomorrow.length;
  const fire = lidForms.filter((c) => {
    var date_new = c.date;
    var date_t = new Date(date_new);
    var date = new Date();
    var timer = (date_t - date) / 1000 / 3600;
    if (timer < 0) {
      return c;
    }
  });
  const fireLength = fire.length;
  res.render("lids/today", {
    layout: "admin",
    lids,
    lidForms,
    admin,
    today,
    todayLength,
    tomorrowLength,
    fireLength,
  });
};
module.exports.tomorrowLidsGet = async (req, res) => {
  const admin = req.session.admin;
  const lidForms = await LidForm.find();
  const lids = await LidCategory.find();
  await Promise.all(
    lidForms.map((c) => c.populate("categoryId").execPopulate())
  );
  lids.map((c) => {
    const count = lidForms.filter((k) => {
      return c.name === k.categoryId.name;
    });
    c.count = count.length;
    return c;
  });
  const today = lidForms.filter((c) => {
    var date_new = c.date;
    var date_t = new Date(date_new);
    var date = new Date();
    var timer = (date_t - date) / 1000 / 3600;
    if (timer > 0 && timer < 24) {
      return c;
    }
  });
  const todayLength = today.length;
  const tomorrow = lidForms.filter((c) => {
    var date_new = c.date;
    var date_t = new Date(date_new);
    var date = new Date();
    var timer = (date_t - date) / 1000 / 3600;
    if (timer > 24 && timer < 48) {
      return c;
    }
  });
  const tomorrowLength = tomorrow.length;
  const fire = lidForms.filter((c) => {
    var date_new = c.date;
    var date_t = new Date(date_new);
    var date = new Date();
    var timer = (date_t - date) / 1000 / 3600;
    if (timer < 0) {
      return c;
    }
  });
  const fireLength = fire.length;
  res.render("lids/tomorrow", {
    layout: "admin",
    admin,
    lids,
    lidForms,
    tomorrow,
    todayLength,
    tomorrowLength,
    fireLength,
  });
};
module.exports.fireLidsGet = async (req, res) => {
  const admin = req.session.admin;
  const lidForms = await LidForm.find();
  const lids = await LidCategory.find();
  await Promise.all(
    lidForms.map((c) => c.populate("categoryId").execPopulate())
  );
  lids.map((c) => {
    const count = lidForms.filter((k) => {
      return c.name === k.categoryId.name;
    });
    c.count = count.length;
    return c;
  });
  const today = lidForms.filter((c) => {
    var date_new = c.date;
    var date_t = new Date(date_new);
    var date = new Date();
    var timer = (date_t - date) / 1000 / 3600;
    if (timer > 0 && timer < 24) {
      return c;
    }
  });
  const todayLength = today.length;
  const tomorrow = lidForms.filter((c) => {
    var date_new = c.date;
    var date_t = new Date(date_new);
    var date = new Date();
    var timer = (date_t - date) / 1000 / 3600;
    if (timer > 24 && timer < 48) {
      return c;
    }
  });

  const tomorrowLength = tomorrow.length;
  const fire = lidForms.filter((c) => {
    var date_new = c.date;
    var date_t = new Date(date_new);
    var date = new Date();
    var timer = (date_t - date) / 1000 / 3600;
    if (timer < 0) {
      return c;
    }
  });
  const fireLength = fire.length;
  res.render("lids/fire", {
    layout: "admin",
    admin,
    lids,
    lidForms,
    fire,
    todayLength,
    tomorrowLength,
    fireLength,
  });
};
