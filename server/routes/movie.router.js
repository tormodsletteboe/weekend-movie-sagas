const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')


//get all movies from database
router.get('/', (req, res) => {

  const query = `SELECT * FROM movies ORDER BY "title" ASC`;
  pool.query(query)
    .then(result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: Get all movies', err);
      res.sendStatus(500)
    })

});



//get a specific movie
router.get('/:id', (req, res) => {

  const query = `
                 SELECT * FROM "movies"
                 WHERE "id" =$1; 
  `;
  //get the movie data for movie with id of req.params.id
  pool.query(query, [req.params.id])
    .then(result => {
      //                  👇 always just send the 0th row, which is an {} obj
      res.send(result.rows[0]);
    })
    .catch(err => {
      console.log('ERROR: Get a movie for /:id', err);
      res.sendStatus(500)
    })

});


// add a new movie to the tables, junction and movie tables
router.post('/', (req, res) => {
  console.log(req.body);
  // RETURNING "id" will give us back the id of the created movie
  const insertMovieQuery = `
  INSERT INTO "movies" ("title", "poster", "description")
  VALUES ($1, $2, $3)
  RETURNING "id";`

  // FIRST QUERY MAKES MOVIE
  pool.query(insertMovieQuery, [req.body.title, req.body.poster, req.body.description])
    .then(result => {
      console.log('New Movie Id:', result.rows[0].id); //ID IS HERE!

      const createdMovieId = result.rows[0].id

      // Now handle the genre reference
      const insertMovieGenreQuery = `
      INSERT INTO "movies_genres" ("movie_id", "genre_id")
      VALUES  ($1, $2);
      `
      // SECOND QUERY ADDS GENRE FOR THAT NEW MOVIE
      pool.query(insertMovieGenreQuery, [createdMovieId, req.body.genre_id]).then(result => {
        //Now that both are done, send back success!
        res.sendStatus(201);
      }).catch(err => {
        // catch for second query
        console.log(err);
        res.sendStatus(500)
      })

      // Catch for first query
    }).catch(err => {
      console.log(err);
      res.sendStatus(500)
    })
});


//delete data related to the movie with id, ie delete records in the junction table and the movies table
router.delete('/:id', (req, res) => {
  const queryTextForJunctionTable = `
    DELETE FROM "movies_genres"
    WHERE "movies_genres".movie_id = $1;
  `;
  pool.query(queryTextForJunctionTable, [req.params.id])
    .then((dbResJunc) => {
      const queryText = `
        DELETE FROM "movies"
        WHERE "id"=$1;
      `;
      pool.query(queryText, [req.params.id])
        .then(dbResMov => {
          res.send(200);
        })
        .catch((err) => {
          console.log('ERROR: Delete a movie from movies table', err);
          res.sendStatus(500)
        });

    })
    .catch((err) => {
      console.log('ERROR: Delete a movie from junction table', err);
      res.sendStatus(500)
    });
});

//get all movies from database
router.put('/', (req, res) => {

  const query = `
    UPDATE "movies"
    SET "title" = $1, "description"=$2, "poster" = $3
    WHERE "id"=$4;
  `;
  pool.query(query, [req.body.title,req.body.description,req.body.poster,req.body.id])
    .then(result => {
      res.send(200);
    })
    .catch(err => {
      console.log('ERROR: Put a movie', err);
      res.sendStatus(500)
    })

});

module.exports = router;