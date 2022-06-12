const removeUser = require("../../repositiries/users/removeUser");
const selectUserById = require("../../repositiries/users/selectUserById");

const deleteUser = async (req, res, next) => {
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
            const error = new Error("It is not imposible delete user");
            error.statusCode = 400;
            throw error;  
       }

        await removeUser(idUser);  

        res.status(200).send({ status: "ok", message: "User deleted"});

    } catch (error) {
        next(error);
    }
}

module.exports = deleteUser;