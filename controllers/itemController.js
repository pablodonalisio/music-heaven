const Item = require("../models/item");
const Category = require("../models/category");
const { body, validationResult } = require("express-validator");

exports.index = (req, res) => {
  res.render("index", { title: "Bienvenidos a Music Heaven" });
};

exports.item_list = (req, res, next) => {
  Item.find().exec((err, items) => {
    if (err) return next(err);
    res.render("item_list", { title: "Lista de Items", items: items });
  });
};

exports.item_detail = (req, res, next) => {
  Item.findById(req.params.id).exec((err, item) => {
    if (err) return next(err);

    res.render("item_detail", { title: "Detalle", item: item });
  });
};

exports.item_create_get = (req, res, next) => {
  Category.find().exec((err, categories) => {
    if (err) return next(err);
    res.render("item_form", { title: "Create Item", categories });
  });
};

exports.item_create_post = [
  body("name", "Name is required").trim().isLength({ min: 1 }).escape(),
  body("description", "Description is required")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("category", "Category is required").trim().isLength({ min: 1 }).escape(),
  body("price", "Price is required").trim().isLength({ min: 1 }).escape(),
  body("brand", "Brand is required").trim().isLength({ min: 1 }).escape(),
  body("stock", "Stock is required").trim().isLength({ min: 1 }).escape(),

  (req, res, next) => {
    const errors = validationResult(req);
    const { name, description, category, price, brand, stock } = req.body;
    const item = new Item({
      name,
      description,
      category,
      price,
      brand,
      stock,
    });

    if (!errors.isEmpty()) {
      Category.find().exec((err, categories) => {
        if (err) return next(err);
        res.render("item_form", {
          title: "Create Item",
          item,
          categories,
          errors: errors.array(),
        });
      });
      return;
    }

    Item.findOne({ name: name }).exec((err, found_item) => {
      if (err) return next(err);
      if (found_item) {
        res.redirect(found_item.url);
      } else {
        item.save((err) => {
          if (err) return next(err);
          res.redirect(item.url);
        });
      }
    });
  },
];

exports.item_delete_get = (req, res) => {
  res.send("NOT IMPLEMENTED YET");
};

exports.item_delete_post = (req, res) => {
  res.send("NOT IMPLEMENTED YET");
};

exports.item_update_get = (req, res) => {
  res.send("NOT IMPLEMENTED YET");
};

exports.item_update_post = (req, res) => {
  res.send("NOT IMPLEMENTED YET");
};
