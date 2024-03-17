const filterSemesterResult = (id, list) => {
    return list.filter(x => x.semester.semesterId == id);
}

module.exports = {
    filterSemesterResult
}