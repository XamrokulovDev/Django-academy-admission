const supabase = require('../config/supabase')
const asyncHandle = require('../middlewares/async')
const ErrorResponse = require('../utils/errorResponse')
const jwt = require('jsonwebtoken')

// process.env
const { ADMIN_USERNAME, ADMIN_PASSWORD, JWT_SECRET, JWT_EXPIRE } = process.env

// Router: /admin/register
// Method: POST
// Description: Registration for admin
exports.adminRegister = asyncHandle(async (req, res, next) => {
    const { username, password } = req.body
    
    // Check username and password of admin
    if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
        return next(new ErrorResponse('Uncorrect password or username', 400))
    }

    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: JWT_EXPIRE })
    res.status(200).json({
        success: true,
        message: 'Congratulations, you are admin',
        token
    })
})