const mongoose = require('mongoose');
const { stringify } = require('yamljs');
const {Schema} = mongoose

const UserData = new Schema({
  courseId: {type: mongoose.Schema.Types.ObjectId, ref: 'courses', required: true},
  guestId: {type: String},
  lastUrl: {type: String},
  completed: {type: Number},
  completionPath: [{type:String}], 
  timestamp: [{type: String}],
  deviceData: {
    browser: {type: String},
    browserVersion: {type: String},
    platform: {type: String}
  }
}, {versionKey: false})

UserData.methods.addToCompletionPath = function(newPath) {
  if (!this.completionPath.includes(newPath)) {
    this.completionPath.push(newPath);
  }
  this.completed = Math.floor(this.completionPath.length / 5);
  return this.save();
};

UserData.pre('save', function (next) {
  if (this.timestamp.length > 100) {
    // Remove oldest timestamp if queue size is exceeded
    this.timestamp.splice(0, this.timestamp.length - 100);
  }
  next();
});

module.exports = mongoose.model('userData', UserData);