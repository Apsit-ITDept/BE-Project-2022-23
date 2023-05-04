const mongoose = require('mongoose');
const {Schema} = mongoose;

const courseData = new Schema ({
  courseId: {type: mongoose.Schema.Types.ObjectId, ref: 'courses', required: true},
  pageViews: [{hits: {type: Number, default: 0}, timestamp: {type: String}, _id: false}],
  bounceRates: [{hits: {type: Number, default: 0}, timestamp: {type: String}, _id: false}],
  reviews: [{hits: {type: Number, default: 0}, timestamp: {type: String}, _id: false}],
  courseDescription: [{hits: {type: Number, default: 0}, timestamp: {type: String}, _id: false}],
  courseDetails: [{hits: {type: Number, default: 0}, timestamp: {type: String}, _id: false}],
  Modules:{type: mongoose.Schema.Types.ObjectId, ref: 'modules'}
}, {versionKey: false})

// courseData.methods.incDistPageView = function() {
//   const now = new Date();
//   const todayStr = now.toISOString().slice(0, 10);
//   const lastView = this.distPageViews[this.distPageViews.length - 1];
  
//   // If there are no views yet, or the last view is not from today, add a new view object
//   if (!lastView || lastView.timestamp !== todayStr) {
//     this.distPageViews.push({ hits: 1, timestamp: todayStr });
//   } else {
//     // Otherwise, increment the hits value of the last view object
//     lastView.hits++;
//   }
  
//   return this.save();
// };

courseData.methods.incPageView = function() {
  const now = new Date();
  const todayStr = now.toISOString().slice(0, 10);
  const lastView = this.pageViews[this.pageViews.length - 1];
  
  // If there are no views yet, or the last view is not from today, add a new view object
  if (!lastView || lastView.timestamp !== todayStr) {
    this.pageViews.push({ hits: 1, timestamp: todayStr });
  } else {
    // Otherwise, increment the hits value of the last view object
    lastView.hits++;
  }
  
  return this.save();
};

courseData.methods.incBounceRates = function() {
  const now = new Date();
  const todayStr = now.toISOString().slice(0, 10);
  const lastView = this.bounceRates[this.bounceRates.length - 1];
  
  // If there are no views yet, or the last view is not from today, add a new view object
  if (!lastView || lastView.timestamp !== todayStr) {
    this.bounceRates.push({ hits: 1, timestamp: todayStr });
  } else {
    // Otherwise, increment the hits value of the last view object
    lastView.hits++;
  }
  
  return this.save();
};

courseData.methods.incReviews = function() {
  const now = new Date();
  const todayStr = now.toISOString().slice(0, 10);
  const lastView = this.reviews[this.reviews.length - 1];
  
  // If there are no views yet, or the last view is not from today, add a new view object
  if (!lastView || lastView.timestamp !== todayStr) {
    this.reviews.push({ hits: 1, timestamp: todayStr });
  } else {
    // Otherwise, increment the hits value of the last view object
    lastView.hits++;
  }
  
  return this.save();
};
courseData.methods.incCourseDescription = function() {
  const now = new Date();
  const todayStr = now.toISOString().slice(0, 10);
  const lastView = this.courseDescription[this.courseDescription.length - 1];
  
  // If there are no views yet, or the last view is not from today, add a new view object
  if (!lastView || lastView.timestamp !== todayStr) {
    this.courseDescription.push({ hits: 1, timestamp: todayStr });
  } else {
    // Otherwise, increment the hits value of the last view object
    lastView.hits++;
  }
  
  return this.save();
};
courseData.methods.incCourseDetails = function() {
  const now = new Date();
  const todayStr = now.toISOString().slice(0, 10);
  const lastView = this.courseDetails[this.courseDetails.length - 1];
  
  // If there are no views yet, or the last view is not from today, add a new view object
  if (!lastView || lastView.timestamp !== todayStr) {
    this.courseDetails.push({ hits: 1, timestamp: todayStr });
  } else {
    // Otherwise, increment the hits value of the last view object
    lastView.hits++;
  }
  
  return this.save();
};


// ****************** play pause object updation *********************
courseData.methods.updatePlay = function(num, index) {
  // Convert the array to an object where the keys are the numbers and the values are the number of repetitions
  
  if(this.Modules[index].play.hasOwnProperty(num)){
    this.Modules[index].play[num]++ 
  } else {
    this.Modules[index].play[num] = 1
  } 

  // Update the "play" field in the schema
  return this.save();
  
};

courseData.pre('save', function(next){
  const maxtimestamps = 60;
  const pageViewslen = this.pageViews.length;
  const bounceRateslen = this.bounceRates.length;
  const reviewslen = this.reviews.length;
  const courseDescriptionlen = this.courseDescription.length;
  const courseDetailslen = this.courseDetails.length;

  if(pageViewslen > maxtimestamps){
    this.pageViews.splice(0, pageViewslen - maxtimestamps);
  }
  if(bounceRateslen > maxtimestamps){
    this.bounceRates.splice(0, bounceRateslen - maxtimestamps);
  }
  if(reviewslen > maxtimestamps){
    this.reviews.splice(0, reviewslen - maxtimestamps);
  }
  if(courseDescriptionlen > maxtimestamps){
    this.courseDescription.splice(0, courseDescriptionlen - maxtimestamps);
  }
  if(courseDetailslen > maxtimestamps){
    this.courseDetails.splice(0, courseDetailslen - maxtimestamps);
  }

  next();
})


module.exports = mongoose.model('coursedata', courseData);