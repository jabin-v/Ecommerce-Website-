const { createServer } = require("http");
require("dotenv").config();
const { Server } = require("socket.io");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middlewares/errorHandler");
const AppError = require("./util/appError");
const PORT = process.env.PORT || 3500;
const connectDB = require("./config/mongoConnection");
const fileUpload = require("express-fileupload");
const path = require("path");

//Connect to mongodb
connectDB();

const registerRoute = require("./routes/register");
const authRoute = require("./routes/auth");
const refreshRouter = require("./routes/refresh-routes");
const logoutRouter = require("./routes/logout-routes");
const employeesRouter = require("./routes/api/employee");
const userRouter = require("./routes/api/user");
//=====================================================//
const categoryRouter = require("./routes/api/category");
const productRouter = require("./routes/api/product");
const cartRouter = require("./routes/api/cart");
const reviewRouter = require("./routes/api/review");
const uploadImageRouter = require("./routes/api/uploadImage");
const orderRouter = require("./routes/api/order");
const stripeRouter = require("./routes/api/stripe");

const corsOptions = require("./config/corsOptions");
const credentials = require("./middlewares/credentials");
const globalErrorHandler = require("./controllers/errorController");
const allowedOrigins = require("./config/allowedOrigins");

// cross origin resource sharing
app.use(cors(corsOptions));
//Hanlde optiond credentials check -before CORS
//and fetch cookies credential requirement
app.use(credentials);

const httpServer = createServer(app);

global.io = new Server(httpServer, {
  cors: {
    origin: allowedOrigins,
  },
});

app.use(bodyParser.json({ limit: "50mb" }));

//handle form data

app.use(express.urlencoded({ extended: false }));

//file upload

app.use(
  fileUpload({
    useTempFiles: true,
  })
);

//handle json

app.use(express.json());

//cookies

app.use(cookieParser());



// ================listening to client messages=====================

const admins = [];
let activeChats = [];

const get_random = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};
io.on("connection", (socket) => {
  //@@@@@@@@@listening admin connected

  socket.on("admin connected with the server", (adminName) => {
    admins.push({ id: socket.id, admin: adminName });
  });

  //@@@@@@@@@@@listeing for client message@@@@@@@@@@@@@

  socket.on("client sends message", (msg) => {
    if (admins.length === 0) {
      socket.emit("no admin", "");
    } else {
      let client = activeChats.find((client) => client.clientId === socket.id);
      let targetAdmin;

      if (client) {
        targetAdmin = client.adminId;
      } else {
        let admin = get_random(admins);

        activeChats.push({ clientId: socket.id, adminId: admin.id });
        targetAdmin = admin.id;
      }

      socket.broadcast.emit("server sends message from client to admin", {
        user: socket.id,
        message: msg,
      });
    }
  });

  // @@@@@@@@@@@@@@ listening ==admin to client message @@@@@@@@@@@@@@@//

  socket.on("admin sends message to client", ({ user, message }) => {
    socket.broadcast
      .to(user)
      .emit("server sends message from admin to client", {
        message,
      });
  });

  socket.on("disconnect", (reason) => {
    const removeIndex = admins.findIndex((item) => item.id === socket.id);

    if (removeIndex !== -1) {
      admins.splice(removeIndex, 1);
    }

    //client disconnected

    activeChats = activeChats.filter((item) => item.adminId !== socket.id);

    const removeIndexClient = activeChats.findIndex(
      (item) => item.id === socket.id
    );

    if (removeIndexClient !== -1) {
      activeChats.splice(removeIndex, 1);
    }

    socket.broadcast.emit("disconnected", {
      reason: reason,
      socketId: socket.id,
    });
  });
});

app.use("/api/register", registerRoute);
app.use("/api/auth", authRoute);
app.use("/api/refresh", refreshRouter);
app.use("/api/logout", logoutRouter);
app.use("/api/products", productRouter);
app.use("/api/category", categoryRouter);
app.use("/api/cart", cartRouter);
app.use("/api/users", userRouter);
app.use("/api/upload", uploadImageRouter);
app.use("/api/order", orderRouter);
app.use("/api/stripe", stripeRouter);
app.use("/api/reviews", reviewRouter);

app.use(express.static(path.join(__dirname, "../client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build/index.html"));
});

app.all("*", (req, res, next) => {
  next(new AppError(`can't find ${req.originalUrl}`, 404));
});



// =========global error handling=======

app.use(globalErrorHandler);

mongoose.connection.once("open", () => {
  httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

// oLyKANI2tGAUeIaO
