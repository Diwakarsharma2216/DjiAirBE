const express = require("express");
const { connection } = require("./db.js")
require("dotenv").config()
const cors = require('cors')
const { userRouter } = require("./routes/user.routes.js");
const { adminRouter } = require("./routes/admin.routes.js");
const { cameraRouter } = require("./routes/camera_drone.routes.js");
const { imageRouter } = require("./routes/image.routes.js");
const { productRoute } = require("./routes/product.routes.js");
const { cartRoute } = require("./routes/cart.routes.js");
const { emailRouter } = require("./routes/send.email.routes.js");
const { Dynamic_Pages_Router } = require("./routes/dynamic.pages.routes.js");
const { paymentRouter } = require("./routes/payment.routes.js");
const app = express();
app.use(express.json());


// Enable CORS for all routes
app.use(cors());
app.use("/users", userRouter)
app.use("/camera_drones", cameraRouter)
app.use("/admin", adminRouter)
app.use('/api/images', imageRouter);
app.use('/api/all/data', productRoute);
app.use('/api/cart', cartRoute);
app.use("/api/send", emailRouter);
app.use("/api", Dynamic_Pages_Router);
app.use("/api",paymentRouter)
app.get("/", (req, res) => {
    res.status(200).json({ msg: "hello" })
})
const PORT = process.env.PORT || 8080;
const LOCAL_IP = process.env.LOCAL_IP

app.listen(PORT, async () => {
    try {
        console.log(`server is live at port :-${PORT}`)
        await connection;
        console.log("connected to mongoDB")
    } catch (error) {
        console.log(`somthing went wrong with mongo connection -------------------------------------${error}`)
    }
})

