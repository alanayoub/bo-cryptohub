'use strict';

const mongoose = require('mongoose');

//
// NOTES: _id fields get indexed by default
//

const projectSchema = new mongoose.Schema({
  _id: String,          // project slug
  name: String,
  symbol:  String,
  githubUrls: [String],
  original: {           // original files (this project wrote this code)
    active: [String],   // hashes of active files
    old: [String],      // changed or deleted files
  },
  copies: {             // copied files (this project copied/forked this code)
    active: [String],
    old: [String],
  }
});

const repoSchema = new mongoose.Schema({
  _id: String,          // projectname/repo
  log: String,          // git log object
  isFork: Boolean,      // is a fork of another repo?
  commit: String,       // current commit
  project: String,      // project name
  firstCommit: String,  // the projects first commit (will be different if it was a fork)
  githubObject: String, // github api repo object
});

const fileSchema = new mongoose.Schema({
  _id: String,          // hash of file
  date: Date,
  path: String,         // file path
  repo: String,
  length: Number,       // number of characters
  active: Boolean,
  copies: [{project: String, date: Date, active: Boolean}],
  authors: [String],
  project: String,
  comments: Number,
  language: String,
  whiteSpace: Number,
});

// const lineSchema = new mongoose.Schema({
//   _id: String,          // hash of line
//   length: Number,
//   project: String,
//   repo: String,
//   active: Boolean,
//   date: Date,
//   copies: [
//     {project: String, date: Date}
//   ]
// });

const commitSchema = new mongoose.Schema({
  _id: String,          // commit hash
  project: String,      // which project this commit belongs to
  commit: {
    hash: String,
    date: Date,
    author: {
      name: String,
      email: String,
    },
    message: String,
  }
});

const Project = mongoose.model('Project', projectSchema);
const Commit = mongoose.model('Commit', commitSchema);
const Repo = mongoose.model('Repo', repoSchema);
const File = mongoose.model('File', fileSchema);

module.exports = {
  Project, Commit, Repo, File
}
