const mongoose = require('mongoose');
const {Schema} = mongoose;

const courseSchema = new Schema({
  courseName: {type: String},
  courseDescription: {type: String},
  category: [{type: String}],
  instructor: {type: mongoose.Schema.Types.ObjectId, ref: 'users', req: true},
  period: {type: Number},
  studentsEnrolled: [{hits: {type: Number, default: 0}, timestamp: {type: String}, _id: false}] 
}, {versionKey: false})

courseSchema.methods.enroll = function() {
  const now = new Date();
  const todayStr = now.toISOString().slice(0, 10);
  const lastView = this.studentsEnrolled[this.studentsEnrolled.length - 1];
  
  // If there are no views yet, or the last view is not from today, add a new view object
  if (!lastView || lastView.timestamp !== todayStr) {
    this.studentsEnrolled.push({ hits: 1, timestamp: todayStr });
  } else {
    // Otherwise, increment the hits value of the last view object
    lastView.hits++;
  }
  
  return this.save();
};

courseSchema.pre('save', function(next){
  const maxtimestamps = 100;
  const studentsEnrolledlen = this.studentsEnrolled.length;

  if(studentsEnrolledlen > maxtimestamps){
    this.studentsEnrolled.splice(0, studentsEnrolledlen - maxtimestamps);
  }

  next();
})

module.exports = mongoose.model('Courses', courseSchema); // grab an existing collection named "courses"