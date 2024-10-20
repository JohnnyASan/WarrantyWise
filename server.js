const express = require('express');
const app = express();
const mongoDb = require('./src/utils/mongodb');

const port = 3000;


app.use(express.json());
app.use('/', require('./src/routes'));

mongoDb.initDb((err, mongodb ) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(process.env.PORT || port);   
        console.log('Web Server is listening at port ' + (process.env.PORT || port));
    }
});
