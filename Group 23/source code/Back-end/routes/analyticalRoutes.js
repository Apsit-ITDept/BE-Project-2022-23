const express = require('express');
const router = express.Router();

// Controllers
const {pushData} = require('../controllers/analytics');
const {coursedata, modulesdata, videoData} = require('../controllers/getRoutes');

// Middlewares
const authMiddleware = require('../middlewares/auth');

router.route('/record-userdata').post(pushData);
router.route('/get-coursedata/:courseid').get(coursedata);
router.route('/get-moduledata/:courseid').get(modulesdata);
router.route('/course/:courseid/get-modulevideo/:moduleid').get(videoData);

module.exports = router;