function classifier(input) {
  
    if (!Array.isArray(input)) {
        throw new Error();
      }
  
      if (input.length === 0) {
        return { noOfGroups: 0 };
      }

      let output = {};
      let holderArray = [];         
      let member = [];               

      let copyArray = [...input];

  
      let newAgeArray = copyArray.map((member) => {                             
        let age = 2019 - new Date(member.dob).getFullYear();                    
        return { ...member, age };                                           
      });
 
  
      let sortedArray = newAgeArray.sort((a, b) => a.age - b.age);         
  
      member.push(sortedArray[0]);


   
      for (let i = 1; i < sortedArray.length; i++) {    
        if (sortedArray[i].age - member[0].age <= 5 && member.length < 3) {     
          member.push(sortedArray[i]);     
        } else {                           
          holderArray.push(member);
          member = [];                     
          member.push(sortedArray[i]);    
        }
      }
      if (member.length > 0) {             
        holderArray.push(member);
      }
    

    
      output.noOfGroups = holderArray.length;
      for (let i = 0; i < holderArray.length; i++) {    
        output[`group${i + 1}`] = {      
          members: holderArray[i],      // return the members in each group
          oldest: holderArray[i][holderArray[i].length - 1].age,    // nested array to see memers in group one to give the index of the last person in the group
          sum: holderArray[i].reduce((acc, b) => acc + b.age, 0),    
          regNos: holderArray[i].map((el) => +el.regNo).sort((a, b) => a - b),
        };
      }
      
      return output;
    
}

export default classifier;







































// function classifier(input) {
//     const inputArr = input.slice();
//     const output = {};
  
//     if (typeof input !== 'object') {
//         throw new Error('Invalid Input');
//     }
  
//     if (!inputArr.length) {
//         output.noOfGroups = 0;
//         return output;
//     }
  
//     const ageArr = inputArr.map(student => {
//         student.age = 2019 - new Date(student.dob).getFullYear();
//         return student
//     }).sort((a, b) => {
//         return a.age - b.age;
//     })
  
//     const membersArray = [];
//     let members = [];
  
//     members.push(ageArr[0]);
  
//     for (let i = 1; i < ageArr.length; i++) {
//         if (ageArr[i].age - members[0].age <= 5 && members.length < 3) {
//             members.push(ageArr[i]);
//         } else {
//             membersArray.push(members);
//             members = [];
//             members.push(ageArr[i]);
//         }
//     }
  
//     if (members.length > 0) {
//         membersArray.push(members);
//     }
    
//     output.noOfGroups = membersArray.length;
    
//     for (let i = 0; i < membersArray.length; i++) {
//         output[`group${i + 1}`] = {
//             members: membersArray[i],
//             oldest: membersArray[i][membersArray[i].length - 1].age,
//             sum: membersArray[i].reduce((acc, current) => {
//                 return acc += current.age;
//             }, 0),
//             regNos: membersArray[i].map(student => {
//                 return Number(student.regNo);
//             }).sort((a, b) => {
//                 return a - b;
//             })
//         }
//     }
//     return output
//   }
  
//   export default classifier;
