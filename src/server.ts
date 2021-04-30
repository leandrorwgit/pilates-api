import dotenv from "dotenv";
import express from 'express';

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.get('/', (req, res) => {
    return res.json({message: 'Hello World'});
});

const port = process.env.PORT || 3000;
var server = app.listen(port, () => {
    console.log("App listening at %s", port)
});