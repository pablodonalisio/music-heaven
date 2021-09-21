#! /usr/bin/env node

console.log(
  "This script populates some test items and categories to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true"
);

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require("async");
var Item = require("./models/item");
var Category = require("./models/category");

var mongoose = require("mongoose");
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

var items = [];
var categories = [];

function itemsCreate(name, description, category, price, brand, stock, cb) {
  itemdetail = {
    name: name,
    description: description,
    category: category,
    price: price,
    brand: brand,
    stock: stock,
  };

  var item = new Item(itemdetail);

  item.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New Item: " + item);
    items.push(item);
    cb(null, item);
  });
}

function categoryCreate(name, cb) {
  var category = new Category({ name: name });

  category.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New Category: " + category);
    categories.push(category);
    cb(null, category);
  });
}

function createCategories(cb) {
  async.series(
    [
      function (callback) {
        categoryCreate("Guitarras", callback);
      },
      function (callback) {
        categoryCreate("Pianos y órganos", callback);
      },
      function (callback) {
        categoryCreate("Micrófonos", callback);
      },
      function (callback) {
        categoryCreate("Baterías", callback);
      },
    ],
    // optional callback
    cb
  );
}

function createItems(cb) {
  async.parallel(
    [
      function (callback) {
        itemsCreate(
          "Teclado 61 teclas",
          "Organo teclado con 61 teclas musical lcd micrófono y atril",
          categories[1],
          4999,
          "MQ",
          603,
          callback
        );
      },
      function (callback) {
        itemsCreate(
          "Teclado 54 teclas",
          "Organo musical con 54 teclas teclado lcd micrófono y fuente",
          categories[1],
          3799,
          "MQ",
          523,
          callback
        );
      },
      function (callback) {
        itemsCreate(
          "Guitarra eléctrica Music",
          "Guitarra eléctrica Music guitar rock festival",
          categories[0],
          8500,
          "Music",
          1,
          callback
        );
      },
      function (callback) {
        itemsCreate(
          "Guitarra juguete criolla",
          "Guitarra juguete criolla acústica sonido real niños",
          categories[0],
          4136,
          "La le lu",
          15,
          callback
        );
      },
      function (callback) {
        itemsCreate(
          "Juguete micrófono",
          "Juguete micrófono, karaoke, luces, conexion mp3, celular",
          categories[2],
          1989,
          "Love",
          136,
          callback
        );
      },
    ],
    // optional callback
    cb
  );
}

async.series(
  [createCategories, createItems],
  // Optional callback
  function (err, results) {
    if (err) {
      console.log("FINAL ERR: " + err);
    } else {
      console.log("Items: " + items);
    }
    // All done, disconnect from database
    mongoose.connection.close();
  }
);
