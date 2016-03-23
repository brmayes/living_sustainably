//requre db file
var db = require('../config/db');

exports.all = function(req, res) {
  var collection = db.get().collection('entries');

  collection.find({}).toArray(function(error, results){
    res.render('all', {entries: results});
  });
};

exports.form = function(req, res) {
  res.render('newEntry');
}

exports.create = function(req, res) {
    var collection = db.get().collection('entries');

    //note about xss and sanitization
    collection.insert({
        title: req.body.entryTitle,
        author: req.body.entryAuthor,
        category: req.body.entryCategory,
        body: req.body.entryBody,
        date: req.body.entryDate,
        thumbnail: req.body.entryThumbnail,
    });

    res.redirect('/');
};
