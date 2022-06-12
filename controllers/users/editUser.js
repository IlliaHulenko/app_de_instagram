const updateUserById = require("../../repositiries/users/updateUserById");
const selectUserById = require("../../repositiries/users/selectUserById");
const generateError = require("../../helpers/generateError");

const editUser = async (req, res, next) => {
    try {

       const { idUser } = req.params;

       const userDB = await selectUserById(idUser);

       if(!userDB){
            generateError("User does not exists", 404);
       } 

       const userId = req.auth.id;
       
       if(userDB.id !== userId){
            generateError("It is not imposible update data", 400);
       }

       await updateUserById({ ...userDB, ...req.body });

       res.status(200).send({ status: "ok", message: "User updated"});

    } catch (error) {
        next(error);
    }
}

module.exports = editUser;