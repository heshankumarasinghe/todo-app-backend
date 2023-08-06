const app = require("./app");
const connectDb = require("./utils/DB");

connectDb(true);

const PORT = process.env.PORT || 80;

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
