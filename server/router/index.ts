const Router = require('express').Router
const userController = require('../controllers/user-controller')
const courseController = require('../controllers/course-controller')
const subjectController = require('../controllers/subject-controller')
const eventController = require('../controllers/event-controller')
const router = new Router()
const { body } = require('express-validator')
const roleMiddleware = require('../middleware/role-middleware')
const constants = require('../constants')

router.post('/registration',
	body('email').isEmail(),
	body('password').isLength({ min: 3, max: 32 }),
	userController.registration
)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.get('/activate/:link', userController.activate)
router.get('/refresh', userController.refresh)
router.get('/users', roleMiddleware([constants.ROLE_ADMIN]), userController.getUsers)

router.get('/courses', courseController.getCourses)
router.get('/courses/:id', courseController.getCourseById)
// router.post('/add-course', courseController.addCourse)

router.get('/get-user-events/:id', eventController.getUserEvents)
router.post('/add-user-event', eventController.addUserEvent)
router.post('/add-user-events', eventController.addUserEvents)

router.get('/subjects', subjectController.getSubjects)

router.post('/request-teacher-role', userController.requestTeacherRoles)
router.post('/validate-teacher-role/:id', userController.validateTeacherRequest)
router.post('/reject-teacher-role/:id', userController.rejectTeacherRequest)

router.post('/payment/create')

module.exports = router
