const Course = require('../models/Course');
const db = require('../config/db');

class MeController {
    // [GET] /me/stored/courses
    storedCourses(req, res, next) {
        const sql = 'SELECT * FROM course';
        db.query(sql, (error, courses) => {
            if (error) {
                // Xử lý lỗi
                console.error("Lỗi khi xem tất cả khóa học:", error);
                return next(error);
            }

            // Truyền dữ liệu vào mẫu và render
            res.render('me/stored-courses', { courses });
        });
    }

}

module.exports = new MeController();