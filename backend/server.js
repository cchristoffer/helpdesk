const path = require("path");
const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middlewares/errorMiddleware");
const connectDB = require("./config/db");
const PORT = process.env.PORT || 8000;

//Connect to database
connectDB();

const app = express();

//Middlewares

//Enables JSON
app.use(express.json());
//Enables url encoded bodies
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to the Help desk api" });
});

//Routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/tickets", require("./routes/ticketRoutes"));

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", function (_, res) {
  res.sendFile(
    path.join(__dirname, "../frontend/build/index.html"),
    function (err) {
      if (err) {
        res.status(500).send(err);
      }
    }
  );
});

// // Serve frontend
// if (process.env.NODE_ENV === "production") {
//   //Set build folder as static
//   app.use(express.static(path.join(__dirname, "../frontend/build")));

//   app.get("*", (req, res) =>
//     res.sendFile(__dirname, "../", "frontend", "build", "index.html")
//   );
// } else {
//   app.get("/", (req, res) => {
//     res.status(200).json({ message: "Welcome to the Help desk api" });
//   });
// }

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
