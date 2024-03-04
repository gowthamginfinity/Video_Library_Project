require("./db/conn");
const vlRouter = require("./router/videoLibraryRouter");
const express = require("express");
const app = express();
const cors = require("cors");

const port = 7140 || process.env.PORT;
app.use(cors());
app.use(express.json());    
app.use(
    express.urlencoded({
      extended: true,
    })
  );
  

app.use(vlRouter);
app.listen(port, () => {
  console.log("listening on port");
});
