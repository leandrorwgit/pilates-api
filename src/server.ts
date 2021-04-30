import express from 'express';
import { usuarioRouter } from "./routes/usuario.route";

const app = express();
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use('/', usuarioRouter);

const port = process.env.PORT || 3000;
var server = app.listen(port, () => {
    console.log("App listening at %s", port)
});