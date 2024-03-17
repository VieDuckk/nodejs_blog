const Course = require("../models/Course");
const db = require('../config/db');

class SiteController {
    // [GET] /news
    index(req, res, next) {
        const sql = 'SELECT * FROM course';

        db.query(sql, (error, courses) => {
            if (error) {
                console.error("Lỗi khi truy vấn khóa học:", error);
                return next(error);
            }

            res.render("home", { courses });
        });
    }
    // [GET] /search
    search(req, res) {
        res.render("search");
    }
}

module.exports = new SiteController();

