const Category = require("../models/category");

exports.category_list = (req, res, next) => {
  Category.find().exec((err, categories) => {
    if (err) return next(err);

    res.render("category_list", {
      title: "Categorías",
      categories: categories,
    });
  });
};

exports.category_detail = (req, res) => {
  res.send("NOT IMPLEMENTED YET");
};

exports.category_create_get = (req, res) => {
  res.send("NOT IMPLEMENTED YET");
};

exports.category_create_post = (req, res) => {
  res.send("NOT IMPLEMENTED YET");
};

exports.category_delete_get = (req, res) => {
  res.send("NOT IMPLEMENTED YET");
};

exports.category_delete_post = (req, res) => {
  res.send("NOT IMPLEMENTED YET");
};

exports.category_update_get = (req, res) => {
  res.send("NOT IMPLEMENTED YET");
};

exports.category_update_post = (req, res) => {
  res.send("NOT IMPLEMENTED YET");
};
