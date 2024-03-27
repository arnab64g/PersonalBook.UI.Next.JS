
const sortByDateNew_Old = (expenses) =>  {
    return expenses.sort((a, b) => {
        if((new Date(a.date)).getTime()  > (new Date(b.date)).getTime()){
            return -1;
        }
        else{
            return 1
        }
      });
}

const sortByDateOld_New = (expenses) => {
    return expenses.sort((a, b) => {
      if((new Date(a.date)).getTime() < (new Date(b.date)).getTime()){
          return -1;
      }
      else{
          return 1
      }
    });
}

const sortByAmountLow_High = (expenses) =>{
    return expenses.sort((a, b) => {
        if(Number(a.amount) < Number(b.amount)){
            return -1;
        }
        else{
            return 1
        }
      });
}

const sortByAmountHigh_Low = (expenses) =>{
    return expenses.sort((a, b) => {
        if(Number(a.amount) > Number(b.amount)){
            return -1;
        }
        else{
            return 1
        }
      });
}

const orderByCategory = (expenses) =>{
    return expenses.sort((a, b) => {
        if(Number(a.category) < Number(b.category)){
            return -1;
        }
        else{
            return 1
        }
      });
}

module.exports = {
  sortByDateNew_Old, 
  sortByDateOld_New, 
  sortByAmountLow_High,
  sortByAmountHigh_Low,
  orderByCategory
}