import mongoose from "mongoose";

// windows is available in browser
// like windows we have global variable in node env

global.mongoose = {
  conn: null,
  promise: null,
};

async function dbConnect() {
  const user = process.env.MONGODB_USER;
  const password = process.env.MONGODB_PASSWORD;
  const database = process.env.MONGODB_DATABASE;
  const connectionLink = `mongodb+srv://${user}:${password}@cluster0.ef9wars.mongodb.net/${database}?retryWrites=true&w=majority`;

  if (global.mongoose && global.mongoose.conn) {
    return global.mongoose.conn;
  }

  const promise = mongoose
    .connect(connectionLink, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: true,
    })
    .then((mongoose) => mongoose);

  global.mongoose = {
    conn: await promise,
    promise,
  };
}

export default dbConnect;
