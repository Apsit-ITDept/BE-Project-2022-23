const error = require('../errors/index');
const UserData = require('../models/userdata');
const course = require('../models/courses');
const CourseData = require('../models/coursedata');
const Module = require('../models/modules');

module.exports.pushData = async (req, res) => {
  const data = req.body;
  await addCourseData(data);

  await pushUserData(data);
  if(data.enrollButton){
    await enrollStudent(data.courseId);
  }

  return res.status(200).send('OK')
}

function validateData(data){
  if(data.guestId){}
}


async function addCourseData(data) {
  let courseData = await CourseData.findOne({courseId: data.courseId});
  const user = await UserData.findOne({guestId: data.userData.guestId})

  if(!courseData){
    await CourseData.create({
      courseId: data.courseId
    })
    try {
      const insert = [
        {courseId: data.courseId, moduleName: 'Introduction', versionKey: false},
        {courseId: data.courseId, moduleName: 'Module 1 - What is Photoshop', versionKey: false},
        {courseId: data.courseId, moduleName: 'Module 2 - How to Use Tools', versionKey: false},
        {courseId: data.courseId, moduleName: 'Module 3 - Creating First Homepage', versionKey: false},
        {courseId: data.courseId, moduleName: 'Module 4 - Understanding Colors', versionKey: false}
      ]
      await Module.insertMany(insert)
    } catch (error) {
      console.log("Iska Error hai :" + error);
    }
  }
  if(data.video){
    var play = data.video.states.play;
    var paused = data.video.states.paused;
    var seeked = data.video.states.seeked;
  }

  switch(data.currentPage){
    case '/Achieving_Personal_and_Professional_Success.html':
      if(data.review){
        await courseData.incReviews();
      }
      if(data.courseDescription){
        await courseData.incCourseDescription();
      }
      if(data.courseDetails){
        await courseData.incCourseDetails();
      }
      if(data.courseDescription || data.courseDetails || data.review || data.enrollButton){
        await courseData.incPageView();
        // if(userData.timestamp.pop() !== data.timestamp) {
        //   await courseData.incDistPageView();
        // }
      } else {
        await courseData.incBounceRates();
      } 
      break
    case '/introduction.html':
      const introduction = await Module.findOne({_id: '644f875002f08a55cbf1dc56'})
      // if(data.video){
      //   console.log(data.video.play.pop());
      //   await courseData.updatePlay(data.video.play.pop());
      // }

      if(play && paused && seeked){
        await introduction.updateSeek(data.video.play.pop().toString());
      } else{
        if(seeked){
          await introduction.updateSeek(data.video.seeked.pop().toString());
        }else{
          paused ? await introduction.updatePause(data.video.paused.pop().toString()) : false;
          play ? await introduction.updatePlay(data.video.play.pop().toString()) : false;
        }
      }
      if(data.video.rateChange.length){
        await introduction.updatePB(data.video.rateChange.pop().toString().replace('.','-'));
      }
      if(data.video.ended){
        await introduction.incEnded();
        await user.addToCompletionPath('introduction')
      }
      
      break
    case '/module1.html':
      const module1 = await Module.findOne({_id: '644f875002f08a55cbf1dc57'})

      console.log(play,paused,seeked);
      if(play && paused && seeked){
        await module1.updateSeek(data.video.play.pop().toString());
      } else{
        if(seeked){
          await module1.updateSeek(data.video.seeked.pop().toString());
        }else{
          paused ? await module1.updatePause(data.video.paused.pop().toString()) : false;
          play ? await module1.updatePlay(data.video.play.pop().toString()) : false;
        }
      } 
      if(data.video.rateChange.length){
        await module1.updatePB(data.video.rateChange.pop().toString().replace('.','-'));
      }
      if(data.video.ended){
        await module1.incEnded();
        await user.addToCompletionPath('module1');
      }
      
      break
    case '/module2.html':
      const module2 = await Module.findOne({_id: '644f875002f08a55cbf1dc58'})

      if(play && paused && seeked){
        await module2.updateSeek(data.video.play.pop().toString());
      } else{
        if(seeked){
          await module2.updateSeek(data.video.seeked.pop().toString());
        }else{
          paused ? await module2.updatePause(data.video.paused.pop().toString()) : false;
          play ? await module2.updatePlay(data.video.play.pop().toString()) : false;
        }
      } 
      if(data.video.rateChange.length){
        await module2.updatePB(data.video.rateChange.pop().toString().replace('.','-'));
      }
      if(data.video.ended){
        await module2.incEnded();
        await user.addToCompletionPath('module2');
      }     
      break
    case '/module3.html':
      const module3 = await Module.findOne({_id: '644f875002f08a55cbf1dc59'})

      if(play && paused && seeked){
        await module3.updateSeek(data.video.play.pop().toString());
      } else{
        if(seeked){
          await module3.updateSeek(data.video.seeked.pop().toString());
        }else{
          paused ? await module3.updatePause(data.video.paused.pop().toString()) : false;
          play ? await module3.updatePlay(data.video.play.pop().toString()) : false;
        }
      }
      if(data.video.rateChange.length){
        await module3.updatePB(data.video.rateChange.pop().toString().replace('.','-'));
      }
      if(data.video.ended){
        await module3.incEnded();
        await user.addToCompletionPath('module3');
      }      
      break
    case '/module4.html':
      const module4 = await Module.findOne({_id: '644f875002f08a55cbf1dc5a'})

      if(play && paused && seeked){
        await module4.updateSeek(data.video.play.pop().toString());
      } else{
        if(seeked){
          await module4.updateSeek(data.video.seeked.pop().toString());
        }else{
          paused ? await module4.updatePause(data.video.paused.pop().toString()) : false;
          play ? await module4.updatePlay(data.video.play.pop().toString()) : false;
        }
      }
      if(data.video.rateChange.length){
        await module4.updatePB(data.video.rateChange.pop().toString().replace('.','-'));
      }      
      if(data.video.ended){
        await module4.incEnded();
        await user.addToCompletionPath('module4');
      }
      break
    default:
      console.log('default');
      break;
  }
}


async function enrollStudent(id) {
  try {
    const Course = await course.findById(id);
    await Course.enroll();
  } catch (error) {
    console.log(error);
  }
}

async function pushUserData(data){
  await UserData.findOneAndUpdate({guestId: data.userData.guestId, courseId: data.courseId},{
    courseId: data.courseId,
    guestId: data.userData.guestId,
    lastUrl: data.currentPage,
    $addToSet: {timestamp: data.timestamp},
    deviceData:{
      browser: data.userData.browser,
      browserVersion: data.userData.browserVersion,
      platform: data.userData.platform
    }}, {new: true, upsert: true})
}