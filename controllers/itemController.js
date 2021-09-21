const Item = require("../models/item");

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

exports.item_create_get = (req, res) => {
  res.send("NOT IMPLEMENTED YET");
};

exports.item_create_post = (req, res) => {
  res.send("NOT IMPLEMENTED YET");
};

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
