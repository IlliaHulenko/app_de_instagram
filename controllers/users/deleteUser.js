const removeUser = require("../../repositiries/users/removeUser");
const selectUserById = require("../../repositiries/users/selectUserById");
const generateError = require("../../helpers/generateError");

const deleteUser = async (req, res, next) => {
    try {

        const { idUser } = req.params;

        const userDB = await selectUserById(idUser);

        if(!userDB){
            generateError("User does not exists", 404)        
       } 

       const userId = req.auth.id;
       
       if(userDB.id !== userId){
            generateError("It is not imposible delete user", 400);          
       }

        await removeUser(idUser);  

        res.status(200).send({ status: "ok", message: "User deleted"});

    } catch (error) {
        next(error);
    }
}

module.exports = deleteUser;