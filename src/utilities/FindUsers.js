const findUser= ((users,userId)=>{
    const userIndex= users.findIndex(user=> user._id===userId);
    if(userIndex==-1) return {};
    return users[userIndex];
   })

   export default findUser;