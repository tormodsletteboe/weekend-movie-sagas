const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.get('/', (req, res) => {
  // Add query to get all genres
  const sqlText =`
    SELECT * FROM genres;
  `;
  pool.query(sqlText)
  .then((dbRes)=>{
    res.send(dbRes.rows);
  })
  .catch((err)=>{
    console.error('Error in genre router /api/genre GET',err);
    res.sendStatus(500)
  });
  
});

// get all genres associated with the movie /:id
router.get('/:id', (req, res) => {

  const query = `
                  SELECT json_agg("genres") AS genres FROM "movies"
                  LEFT JOIN "movies_genres" ON "movies_genres".movie_id = "movies".id
                  LEFT JOIN "genres" ON "genres".id = "movies_genres".genre_id
                  WHERE "movies".id = $1
                  GROUP BY "movies".id;
  `;
  //get all the genres for a movie with id of req.params.id
  pool.query(query, [req.params.id])
    .then(result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: Get all genres for selected movie', err);
      res.sendStatus(500)
    })

});

module.exports = router;