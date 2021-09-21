const Category = require("../models/category");
const Item = require("../models/item");
const async = require("async");

exports.category_list = (req, res, next) => {
  Category.find().exec((err, categories) => {
    if (err) return next(err);

    res.render("category_list", {
      title: "Categorías",
      categories: categories,
    });
  });
};

exports.category_detail = (req, res, next) => {
  async.parallel(
    {
      category: (callback) => {
        Category.findById(req.params.id).exec(callback);
      },
      category_items: (callback) => {
        Item.find({ category: req.params.id }).exec(callback);
      },
    },
    (err, results) => {
      if (err) return next(err);
      res.render("category_detail", {
        title: results.category.name,
        category: results.category,
        category_items: results.category_items,
      });
    }
  );
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
