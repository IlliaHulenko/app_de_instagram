require("dotenv").config();
const express = require("express");

const app = express();

const { SERVER_PORT } = process.env;

const getUsers = require("./controllers/users/getUsers");
const getUserById = require("./controllers/users/getUserById");
const createUser = require("./controllers/users/createUser");

app.use(express.json());

app.get("/users", getUsers);
app.get("/users/:userId", getUserById);
app.post("/users", createUser);



app.use((req, res, next) => {
    res.status(404).send({ status: "error", message: "Not found" });
})

app.use((error, req, res, next) => {
    console.error(error);

    res.statusCode = error.statusCode || 500;
    res.send({ status: "error", message: error.message });
})