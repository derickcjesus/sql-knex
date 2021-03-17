const express = require('express');
const routes = require('./routes')

const app = express();

app.use(express.json())
app.use(routes)

//catch all
app.use( (error, req, res, next) => {
    res.status(error.status || 500)
    res.json({error: error.message})
})

app.listen(3331, () => console.log("server is runnig"));