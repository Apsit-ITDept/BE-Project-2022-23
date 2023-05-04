const error = require('../errors/index');
const UserData = require('../models/userdata');
const course = require('../models/courses');
const CourseData = require('../models/coursedata');
const Module = require('../models/modules');


module.exports.coursedata = async function (req, res) {
  const coursedata = await CourseData.findOne({courseId: req.params.courseid});
  const enroll = await course.findOne({_id: req.params.courseid});
  if(!coursedata){
    throw new error.BadRequestError('Provide proper Request Params');
  }
  res.status(200).json({
    msg: 'Success',
    data: {
      _id: coursedata._id,
      courseId: coursedata.courseId,
      courseName: enroll.courseName,
      pageViews: coursedata.pageViews,
      bounceRates: coursedata.bounceRates,
      enroll: enroll.studentsEnrolled
    }
  })
}

module.exports.modulesdata = async function(req, res) {
  const modules = await Module.find({courseId: req.params.courseid});
  if(!modules){
    throw new error.BadRequestError('Modules not found');
  }
  const result = {}
  const id = {}
  modules.forEach((item,index) => {
    result[item.moduleName] = item.ended;
    id[index] = item._id;
  })
  res.status(200).json({
    msg: "Success",
    data: result,
    ids : id
  })
}


module.exports.videoData = async function(req, res) {
  const videoModule = await Module.findOne({_id: req.params.moduleid ,courseId: req.params.courseid});
  if(!videoModule){
    throw new error.BadRequestError('Either module or course not found or is wrong');
  }
  res.status(200).json({
    msg: "Success",
    data: videoModule
  })
};