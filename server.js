require("dotenv").config();
const express = require("express");

const app = express();

const { SERVER_PORT } = process.env;

const getUsers = require("./controllers/users/getUsers");
const getUserById = require("./controllers/users/getUserById");
const createUser = require("./controllers/users/createUser");
const activateUser = require("./controllers/users/activateUser");
const loginUser = require("./controllers/users/loginUser");
app.use(express.json());

app.get("/users", getUsers);
app.get("/users/:userId", getUserById);
app.post("/users", createUser);
app.put("/users/activate/:registrationCode", activateUser);
app.post("/login", loginUser); 


/**Middoleweare 404 */
app.use((req, res, next) => {
    res.status(404).send({ status: "error", message: "Not found" });
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