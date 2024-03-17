const Course = require('../models/Course');
const db = require('../config/db');

class CourseController {
    // [GET] /courses/:slug
    show(req, res, next) {
        const slug = req.params.slug;
        const sql = 'SELECT * FROM course WHERE slug = ?';

        db.query(sql, [slug], (error, results) => {
            if (error) {
                // Xử lý lỗi truy vấn cơ sở dữ liệu
                console.error("Lỗi khi truy xuất khóa học:", error);
                return next(error);
            }

            if (results.length === 0) {
                // Xử lý trường hợp không tìm thấy khóa học
                return res.status(404).send("Khóa học không tồn tại");
            }

            // Lấy dữ liệu khóa học từ kết quả truy vấn
            const course = results[0];

            // Render trang "courses/show" với dữ liệu khóa học
            res.render("courses/show", { course });
        });
    }

    // [GET] /courses/create
    create(req, res, next) {
        res.render('courses/create');
    }

    // [POST] /courses/store
    store(req, res, next) {
        const formData = req.body;
        const imageUrl = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;

        // Xây dựng câu lệnh SQL INSERT
        const sql = 'INSERT INTO course SET ?';

        // Thêm URL hình ảnh vào dữ liệu khóa học
        formData.image = imageUrl;

        // Thực thi truy vấn SQL INSERT với dữ liệu của khóa học mới
        db.query(sql, formData, (error, result) => {
            if (error) {
                // Xử lý lỗi
                console.error("Lỗi khi lưu trữ khóa học:", error);
                return next(error);
            }

            // Nếu không có lỗi, chuyển hướng người dùng về trang chính
            res.redirect('/');
        });
    }

    // [GET] /courses/:id/edit
    edit(req, res, next) {
        const id = req.params.id;
        db.query('SELECT * FROM course WHERE id = ?', [id])
            .then((course) => {
                if (!course) {
                    // Xử lý trường hợp không tìm thấy khóa học
                    return res.status(404).send("Khóa học không tồn tại");
                }
                res.render("courses/edit", { course });
            })
            .catch((err) => {
                // Xử lý lỗi truy vấn cơ sở dữ liệu
                console.error("Lỗi khi truy xuất khóa học:", err);
                next(err);
            });
    }

    // [PUT] /courses/:id
    update(req, res, next) {
        const courseId = req.params.id;
        const newData = req.body;

        // Xây dựng câu lệnh SQL UPDATE
        const sql = `UPDATE course SET ? WHERE id = ?`;

        // Thực thi truy vấn với dữ liệu mới và id của khóa học
        db.query(sql, [newData, courseId], (error, results) => {
            if (error) {
                // Xử lý lỗi
                console.error("Lỗi khi cập nhật khóa học:", error);
                return next(error);
            }

            // Nếu không có lỗi, chuyển hướng người dùng đến trang "/me/stored/courses"
            res.redirect('/me/stored/courses');
        });
    }
    // [DELETE] /courses/:id
    destroy(req, res, next) {
        const courseId = req.params.id;

        // Xây dựng câu lệnh SQL DELETE
        const sql = `DELETE FROM course WHERE id = ?`;

        // Thực thi truy vấn với id của khóa học cần xóa
        db.query(sql, [courseId], (error, results) => {
            if (error) {
                // Xử lý lỗi
                console.error("Lỗi khi xóa khóa học:", error);
                return next(error);
            }

            // Nếu không có lỗi, chuyển hướng người dùng về trang trước đó
            res.redirect('back');
        });
    }
}

module.exports = new CourseController();