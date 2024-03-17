
class Course {
    constructor(course) {
        this.id = course.id;
        this.name = course.name;
        this.description = course.description;
        this.image = course.image;
        this.videoId = course.videoId;
        this.level = course.level;
        this.slug = course.slug;
    }
}


module.exports = Course;