import express from "express";
import {connectToDb} from "./queries";
import cors from "cors";

const app = express();
const port = 8080; // default port to listen

// connectToDb()

app.use(cors());

// define a route handler for the default home page
app.get( "/", ( req, res ) => {
    res.send( "Hello world!" );
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
