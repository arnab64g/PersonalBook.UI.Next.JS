export function sortResults(results) {
    return results.sort((a, b) => {
        if(a.semester.year > b.semester.year){
            return 1;
        }
        else if(a.semester.year < b.semester.year)
        {
            return -1
        }
        else{
            if(a.semester.monthBng > b.semester.monthBng){
                return 1;
            }
            else{
                return -1;
            }
        }
    });
}