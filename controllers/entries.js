//requre db file
var db = require('../config/db');

exports.all = function(req, res) {
  var collection = db.get().collection('entries');

  collection.find({}).toArray(function(error, results){
    res.render('all', {entries: results});
  });
};

exports.category = function(req, res) {
  var collection = db.get().collection('entries');

  collection.find({"category": req.params.category}).toArray(function(error, results){
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
        urlID: req.body.entryURL
    });

    res.redirect('/');
};

exports.entry = function(req, res) {
    var collection = db.get().collection('entries');

    collection.find({"urlID": req.params.id}).limit(1).toArray(function(err, results) {
        res.render('entry', {entry: results[0]});
    });
};

exports.edit = function(req, res) {
    var collection = db.get().collection('entries');

    collection.find({"urlID": req.params.id}).limit(1).toArray(function(err, results) {
        res.render('edit', {entry: results[0]});
    });
};

exports.update = function(req, res) {
    var collection = db.get().collection('entries');

    //note about xss and sanitization
    collection.updateOne(
        {urlID: req.params.id},
        {
            $set: {
              title: req.body.entryTitle,
              author: req.body.entryAuthor,
              category: req.body.entryCategory,
              body: req.body.entryBody,
              date: req.body.entryDate,
              thumbnail: req.body.entryThumbnail,
              urlID: req.body.entryURL
            }
        }
    );

    res.redirect('/');
};

exports.remove = function(req, res) {
    var collection = db.get().collection('entries');

    //note about xss and sanitization
    collection.removeOne({
        urlID: req.params.id
    });

    return res.redirect('/');
};
