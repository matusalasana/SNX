import { app } from "./app";
import { connectMongoDB } from "./config/db";
import { PORT } from "./config/env";

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
  connectMongoDB();
})