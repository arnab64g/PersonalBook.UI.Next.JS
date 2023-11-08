const sortByCourseCodeAsc = (courses)=>{
    return courses.sort((a, b) => {if (a.courseCode > b.courseCode){
        return 1;
    }
    else {
        return -1;
    }});
}

const sortByCourseCodeDesc = (courses) =>{
    return courses.sort((a, b) => {if (a.courseCode < b.courseCode){
        return 1;
    }
    else {
        return -1;
    }});
}

const sortByCourseTitleAsc = (courses)=>{
    return courses.sort((a, b) => {if (a.courseTitle > b.courseTitle){
        return 1;
    }
    else {
        return -1;
    }});
}

const sortByCourseTitleDesc = (courses) =>{
    return courses.sort((a, b) => {if (a.courseTitle < b.courseTitle){
        return 1;
    }
    else {
        return -1;
    }});
}

module.exports = {
    sortByCourseCodeAsc,
    sortByCourseCodeDesc,
    sortByCourseTitleAsc,
    sortByCourseTitleDesc
}