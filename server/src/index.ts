import express from "express";
import {connectToDb} from "./db";
import cors from "cors";
import bodyParser from "body-parser";
import {User} from "./models/User";
import { Sequelize } from "sequelize";


const app = express();
const port = 8080; // default port to listen

const db:Sequelize = null;

connectToDb()

app.use(cors());

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// define a route handler for the default home page
app.get( "/", ( req, res ) => {
    res.send( "Hello world!" );
} );

app.post( "/login", async ( req, res ) => {
  const {username, password} = req.body;

  const user = await User.findOne({where: {username, password}});

  if(user) {
    res.status(200).send({message: "ok"})
  } else {
    res.status(409).send({message: "The credentials are not correct"})
  }
} );

app.get( "/item", ( req, res ) => {
  fetch(`http://127.0.0.1:8000/?url=${req.query.url}`)
      .then(async (response) => {
        const body = await response.text();
        res.send(body);
      })
      .catch(error => {
        console.log(error)
        // res.status(500).send(error)
      });

} );

// start the Express server
app.listen( port, () => {
    // tslint:disable-next-line:no-console
    console.log( `server started at http://localhost:${ port }` );
} );
