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

module.exports = router;