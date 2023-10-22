import "dotenv/config"
import env from "./util/validateEnv"
import mongoose from "mongoose";
import app from "./app";



const port = env.PORT

mongoose.connect(env.MONGO_CONNECTIONS_STRING)
      .then(() => {
        console.log("Mongose connected")
        app.listen(port, () => {
         console.log("Server running on port: " + port)
         })
      })
      .catch(console.error)


