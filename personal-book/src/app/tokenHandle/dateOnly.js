const dateOnly =  (date) => {
    let date0 = new Date(date);
    date0.setHours(0);
    date0.setMinutes(0);
    date0.setSeconds(0);

    return date0;
}

module.exports = {
    dateOnly
}