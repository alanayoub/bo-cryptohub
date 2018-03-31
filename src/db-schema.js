'use strict';

const mongoose = require('mongoose');

//
// NOTES: _id fields get indexed by default
//

const projectSchema = new mongoose.Schema({
  _id: String,          // project slug
  name: String,
  symbol:  String,
  rank: Number,
  githubUrls: [String],
  repos: [],            // github repo objects
  commits: [],          // last commit parsed per repo ///// TODO: REMOVE THIS and use repo schema
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
  isFork: Boolean,      // is a fork of another repo?
  commit: {             // current commit
    hash: String,
    date: Date,
    author: {
      name: String,
      email: String,
    },
    message: String,
  },
  commits: String,      // git log object
  project: String,      // project name
  githubObject: String, // github api repo object
});

const fileSchema = new mongoose.Schema({
  _id: String,          // hash of file
  length: Number,
  project: String,
  active: Boolean,
  date: Date,
  copies: [
    {project: String, date: Date, active: Boolean}
  ]
});

const Project = mongoose.model('Project', projectSchema);
const Repo = mongoose.model('Repo', repoSchema);
const File = mongoose.model('File', fileSchema);

module.exports = {
  Project, Repo, File
}
