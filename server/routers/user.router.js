const { Router } = require('express')
const router = Router()
const {
    userRegister,
    getUsers
} = require('../controllers/user.controller')
const adminAuth = require('../middlewares/adminAuth')
const { body, validationResult } = require('express-validator')

router.post('/user/register', [
    body('first_name')
        .notEmpty().withMessage('First name is required'),
    body('last_name')
        .notEmpty().withMessage('Last name is required'),
    body('phone_number')
        .isMobilePhone().withMessage('Invalid phone number'),
    body('direction')
        .notEmpty().withMessage('Direction is required'),
    body('groupId')
        .isMongoId().withMessage('Invalid group ID'),
    body('telegram_id')
        .optional().isNumeric().withMessage('Telegram ID must be numeric'),
    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            })
        }
        next()
    }
], userRegister)
router.get('/users', adminAuth, getUsers)

module.exports = router