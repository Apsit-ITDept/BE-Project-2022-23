const mongoose = require('mongoose');
const {Schema} = mongoose;

const moduleSchema = new Schema({
  courseId: {type: mongoose.Schema.Types.ObjectId, ref: 'courses', required: 'true'},
  moduleName: {type: String},
  pause: {type: Object, _id:false, default: {time: 'hits'}},
  seekTime: {type: Object, _id:false, default: {time: 'hits'}},
  play: {type: Object, _id:false, default: {time: 'hits'}},
  rateChange: {type: Object, _id:false, default: {playbackRate: 'hits'}},
  ended: {type: Number, default: 0},
})


function roundToNearestMultipleOfFive(num) {
  const closestMultiple = Math.round(num / 5) * 5;
  const lcmOfFive = 5;
  return Math.ceil(closestMultiple / lcmOfFive) * lcmOfFive;
}

function secondToTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  const hoursStr = hours < 10 ? `0${hours}` : `${hours}`;
  const minutesStr = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const secondsStr = remainingSeconds < 10 ? `0${remainingSeconds}` : `${remainingSeconds}`;

  if(!hours){
    return `${hoursStr}:${minutesStr}:${secondsStr}`;
  }
  return `${minutesStr}:${secondsStr}`
}


moduleSchema.methods.updatePlay = function(time){
  const update = { $set: {} };
  update.$set[`play.${time}`] = (this.play[time] || 0) + 1;
  return this.updateOne(update);
}

moduleSchema.methods.updatePause = function(time){
  const update = { $set: {} };
  update.$set[`pause.${time}`] = (this.pause[time] || 0) + 1;
  return this.updateOne(update);
}

moduleSchema.methods.updateSeek = function(time){
  const update = { $set: {} };
  update.$set[`seekTime.${time}`] = (this.seekTime[time] || 0) + 1;
  return this.updateOne(update);
}

moduleSchema.methods.updatePB = function(rate){
  const update = { $set: {} };
  update.$set[`rateChange.${rate}`] = (this.rateChange[rate] || 0) + 1;
  return this.updateOne(update);
}

moduleSchema.methods.incEnded = function() {
  this.ended++;
  return this.save();
};


// moduleSchema.methods.updatePlay = function(num, index) {
//   // Convert the array to an object where the keys are the numbers and the values are the number of repetitions
  
//   if(this.Modules[index].play.hasOwnProperty(num)){
//     this.Modules[index].play[num]++ 
//   } else {
//     this.Modules[index].play[num] = 1
//   } 

//   // Update the "play" field in the schema
//   return this.save();
  
// };

// Module.findOneAndUpdate(
//   {_id: moduleId},
//   {$inc: {'play.' + currentTime: 1}},
//   {new: true},
//   function(err, module) {
//     if (err) {
//       console.log('Unable to update module:', err);
//       return;
//     }
//     console.log('Module updated:', module);
//   }
// );

module.exports = mongoose.model('modules', moduleSchema);