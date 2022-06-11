const updateUserById = require("../../repositiries/users/updateUserById");
const selectUserById = require("../../repositiries/users/selectUserById");

const editUser = async (req, res, next) => {
    try {

       const { idUser } = req.params;

       const userDB = await selectUserById(idUser);

       if(!userDB){
            const error = new Error("User does not exists");
            error.statusCode = 404;
            throw error;        
       } 

       const userId = req.auth.id;
       
       if(userDB.id !== userId){
            const error = new Error("It is not imposible update data");
            error.statusCode = 400;
            throw error;  
       }

       await updateUserById({ ...userDB, ...req.body });

       res.status(200).send({ status: "ok", message: "User updated"});

    } catch (error) {
        next(error);
    }
}

module.exports = editUser;