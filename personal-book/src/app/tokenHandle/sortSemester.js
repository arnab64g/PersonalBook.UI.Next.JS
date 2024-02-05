export function sortSemester(results) {
    return results.sort((a, b) => {
        if(a.year > b.year){
            return 1;
        }
        else if(a.year < b.year)
        {
            return -1
        }
        else{
            if(a.monthBng > b.monthBng){
                return 1;
            }
            else{
                return -1;
            }
        }
    });
}