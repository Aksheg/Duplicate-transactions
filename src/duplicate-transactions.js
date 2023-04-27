function findDuplicateTransactions(transactions) {
    let copyTrans = [...transactions]
    //if the transaction is single, means no duplicate therefore return an empty array
      if(transactions.length == 1) {
          return []
      };
      //if the transaction is not an array return an error
      if(!Array.isArray(transactions)){
          throw Error('Invalid')
      }
    //Group similar objects together by comparing properties    
    let alikeArr = []; // hold all sorted arrays
      for (let i = 0; i < copyTrans.length; i++) { 
          let arr2 = [] // save duplicate transaction in array 2
          const {
              sourceAccount: srcActI,
              targetAccount: tgrActI,
              category: categI,
              amount: amtI,
          } = copyTrans[i]

          let num = copyTrans.findIndex((transaction) => {  
            return (transaction.sourceAccount === srcActI &&
              transaction.targetAccount == tgrActI &&
              transaction.amount == amtI &&
              transaction.category == categI)
          })

          for(let j = i; j < copyTrans.length; j++) {
              const {
                  sourceAccount: srcActJ,
                  targetAccount: tgrActJ,
                  category: categJ,
                  amount: amtJ,
              } = copyTrans[j]
              
              
              if (num == i) {
                if ((srcActI === srcActJ)
                  && (tgrActI === tgrActJ) &&
                  (amtI === amtJ) &&
                  (categI === categJ)) {
                      arr2.push(copyTrans[j]) // push to arr2
                  }
            } else continue
          }
          if (arr2.length > 0) {
              alikeArr.push(arr2)
          }
      }
      
    //Sort objects in each sub-array by time of occurence 
    let sortArr = []
      for (let i = 0; i < alikeArr.length; i++) {
          let sortedArr = alikeArr[i].sort((a, b) => {
              let aTime =  Math.floor(new Date(a.time).getTime()/1000);
              let bTime = Math.floor(new Date(b.time).getTime()/1000);
              return  aTime - bTime        })
          sortArr.push(sortedArr)
         
      }
    //Filter to remove empty arrays  
    let filtered = sortArr.filter((elem) => {
        return elem.length !== 1    })

    //Remove more than 60 secs interval transactions    
    let solutionArr = []
      filtered.forEach((subArr) => {
      let hold = []
      for (let j = 0; j < subArr.length-1; j++) {
            let currentTime = Math.floor(new Date(subArr[j].time).getTime()/1000);
            let nextTime = Math.floor(new Date(subArr[j+1].time).getTime()/1000);
            if (subArr.length < 3) {
              if(j<2 && nextTime - currentTime <= 60) {
                hold.push(subArr[j]);
                hold.push(subArr[j+1]);
              } else continue         
             }else if (subArr.length > 2) {
              if (Math.abs(currentTime - nextTime) <= 60) {
                hold.push(subArr[j]);
                if (j == subArr.length-2) {
                  hold.push(subArr[j+1])
                }
              }else if 
              (j >= 2 && Math.abs(currentTime - nextTime) >= 60 && 
              Math.abs(currentTime - Math.floor(new Date(subArr[j-1].time).getTime()/1000)) <= 60) {
                hold.push(subArr[j]);
              } else;
            }
          }
          if(hold.length > 0) {
            solutionArr.push(hold)
          }
    })
      solutionArr.sort((a, b) => {
        return a[0].id - b[0].id    })
    return solutionArr
  }
  
  
  export default findDuplicateTransactions;
