require("dotenv").config();
const express = require("express");

const app = express();

const { SERVER_PORT } = process.env;

const validateAuth = require("./middlewares/validateAuth");

const getUsers = require("./controllers/users/getUsers");
const getUserById = require("./controllers/users/getUserById");
const getUserProfile = require("./controllers/users/getUserProfile");
const createUser = require("./controllers/users/createUser");
const activateUser = require("./controllers/users/activateUser");
const loginUser = require("./controllers/users/loginUser");
const editUser = require("./controllers/users/editUser");
const deleteUser = require("./controllers/users/deleteUser");

const createPhoto = require("./controllers/photos/createPhoto");
const getPhotoById = require("./controllers/photos/getPhotoById");
const getRecentPhotos = require("./controllers/photos/getRecentPhotos");

const createLike = require("./controllers/likes/createLike");
const getLikes = require("./controllers/likes/getLikes");
const getLikeById = require("./controllers/likes/getLikeById");
const removeLikeById = require("./controllers/likes/removeLikeById");

const createComment = require("./controllers/comments/createComment");
const getComments = require("./controllers/comments/getComments");
const getCommentById = require("./controllers/comments/getCommentById");
const removeCommentById = require("./controllers/comments/removeCommentById");


app.use(express.json());

/**Users requests */
app.get("/users", getUsers);
app.get("/users/:userId", getUserById);

//Ver el perfil de un usuario con su galería de fotos
app.get("/users/profile/:userId", getUserProfile)
app.post("/users", createUser);
app.put("/users/activate/:registrationCode", activateUser);
app.post("/login", loginUser);
app.delete("/users/:idUser", validateAuth, deleteUser);
//Gestión del perfil del usuario
app.patch("/users/:idUser", validateAuth, editUser);

/**Photos requests */
app.get("/photos", getRecentPhotos);
app.get("/photos/:photoId", getPhotoById);
//Creacion de la foto
app.post("/photos", validateAuth, createPhoto); 

/**Likes requests */
app.get("/likes", getLikes);
app.get("/likes/:likeId", getLikeById);
// Hacer un “like” a una foto
app.post("/likes/:photoId",validateAuth, createLike); 
//Quitar un “like” a una foto
app.delete("/likes/:likeId",validateAuth, removeLikeById);

/**Comments requests */
app.get("/comments", getComments);
app.get("/comments/:commentId", getCommentById);
//Dejar un comment a una foto
app.post("/comments/:photoId", validateAuth, createComment);
//Quitar comment
app.delete("/comments/:commentId", validateAuth, removeCommentById);

/**Middoleweare 404 */
app.use((req, res, next) => {
    res.status(404).send({ status: "error", message: "Request not found" });
});

/**Middoleweare error */
app.use((error, req, res, next) => {
    console.error(error);

    res.statusCode = error.statusCode || 500;
    res.send({ status: "error", message: error.message });
});

app.listen(SERVER_PORT, () => {
    console.log(`server listening on http://localhost:${SERVER_PORT}`)
});