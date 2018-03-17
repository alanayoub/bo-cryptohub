"use strict"

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
  commits: [String],    // last commit parsed per repo
  original: {           // original files (this project wrote this code)
    active: [String],   // hashes of active files
    old: [String],      // changed or deleted files
  },
  copies: {             // copied files (this project copied/forked this code)
    active: [String],
    old: [String],
  }
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
const File = mongoose.model('File', fileSchema);

module.exports = {
  Project, File
}
