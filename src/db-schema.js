// Libs
const mongoose = require('mongoose');

// Cryptohub
const { mapDbFields } = require.main.require('./utils/');

/**
 *
 * Shorten keys in schema objects to save space
 *
 */
function convertKeys(schemaOptions) {
  const len = Object.keys(schemaOptions).length;
  const result = {};
  let count = 0;
  for (let [key, val] of Object.entries(schemaOptions)) {
    const shortKey = mapDbFields.fullToShort[key];
    if (key === 'DATA') {
      val = convertKeys(val[0]);
      result[shortKey] = [val];
    }
    else {
      result[shortKey] = val;
    }
    if (++count === len) return result;
  }
}

//
// These names map directly to cryptocompare
//
const schemaOptions = {
  _id: Number, // timestamp_hour: "20131010230101" (YYYYMMDDHHMMSS)
  MARKET: String,
  TOSYMBOL: String,
  DATA: [{
    TYPE: String,
    FLAGS: String,
    FROMSYMBOL: {
      type: String
    },
    PRICE: {
      type: Number
    },
    LASTUPDATE: {
      type: Date
    },
    LASTVOLUME: {
      type: Number
    },
    LASTVOLUMETO: {
      type: Number
    },
    LASTTRADEID: String,
    VOLUMEDAY: {
      type: Number
    },
    VOLUMEDAYTO: {
      type: Number
    },
    VOLUME24HOUR: {
      type: Number
    },
    VOLUME24HOURTO: {
      type: Number
    },
    OPENDAY: {
      type: Number
    },
    HIGHDAY: {
      type: Number
    },
    LOWDAY: {
      type: Number
    },
    OPEN24HOUR: {
      type: Number
    },
    HIGH24HOUR: {
      type: Number
    },
    LOW24HOUR: {
      type: Number
    },
    LASTMARKET: String,
    CHANGE24HOUR: {
      type: Number
    },
    CHANGEPCT24HOUR: {
      type: Number
    },
    CHANGEDAY: {
      type: Number
    },
    CHANGEPCTDAY: {
      type: Number
    },
    SUPPLY: {
      type: Number
    },
    MKTCAP: {
      type: Number
    },
    TOTALVOLUME24H: {
      type: Number
    },
    TOTALVOLUME24HTO: {
      type: Number
    },
  }],
}

const generatedSchemaOptions = convertKeys(schemaOptions);

const timeseriesSchemaFast = new mongoose.Schema(generatedSchemaOptions);

// const timeseriesDataSlow = new mongoose.Schema({
//   _id: Date,           // Date of commit
//   name: String,
//   symbol:  String,
//   githubUrls: [String],
//   original: {           // original files (this project wrote this code)
//     active: [String],   // hashes of active files
//     old: [String],      // changed or deleted files
//   },
//   copies: {             // copied files (this project copied/forked this code)
//     active: [String],
//     old: [String],
//   }
// });

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////

//
//
// BELOW IS ALL FOR GITHUB REPO ANALYSIS WHICH HAS BEEN PUT ON HOLD
//
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
  _id: String,          // projectname/repo this is the coinmarketcap project name / repo
  log: [{               // git log object
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Commit'
  }],
  size: Number,
  forks: Number,
  isFork: Boolean,      // is a fork of another repo?
  commit: String,       // current commit hash (should probably change this)
  project: String,      // project name
  hasWiki: Boolean,
  watchers: Number,
  hasPages: Boolean,
  cloneUrl: String,
  hasIssues: Boolean,
  forkedFrom: String,   // what project/repo was the repo forked from (github project name not coinmarketcap)
  openIssues: Number,
  forksCount: Number,
  firstCommit: String,  // the projects first commit excluding any fork history
  hasProjects: Boolean,
  hasDownloads: Boolean,
  watchersCount: Number,
  defaultBranch: String,
  githubRepoName: String,
  openIssuesCount: Number,
  stargazersCount: Number,
  numberOfCommits: Number, // the real number of commits
  githubProjectName: String,
});

const fileSchema = new mongoose.Schema({
  _id: String,          // hash of file
  date: Date,           // Date of commit
  path: String,         // file path
  repo: String,
  commit: String,
  length: Number,       // number of characters
  copies: [{
    date: Date,
    active: {
      type: Boolean,
      default: false
    },
    repo: String,
    project: String,
  }],
  project: String,
  comments: Number,     // number of comment characters
  language: String,
  whiteSpace: Number,   // number of whitespace characters
  blankLines: Number,   // number of blank lines
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
  hash: String,
  date: Date,
  author: {
    name: String,
    email: String,
  },
  message: String,
});

const autoPopulate = function (next) {
  this.populate('log');
  next();
};
repoSchema.pre('findOne', autoPopulate);
repoSchema.pre('find', autoPopulate);

const TimeseriesFast = mongoose.model('TimeseriesFast', timeseriesSchemaFast);
const Project = mongoose.model('Project', projectSchema);
const Commit = mongoose.model('Commit', commitSchema);
const Repo = mongoose.model('Repo', repoSchema);
const File = mongoose.model('File', fileSchema);

module.exports = {
  TimeseriesFast, Project, Commit, Repo, File
}
