var express = require('express');
var mysql = require('mysql');
var app = express();

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'departement'
});

app.configure(function(){

   app.use(express.bodyParser());
   app.set('views',__dirname + '/views');
   app.set('view engine', 'ejs');
   app.use(express.static(__dirname + '/public'));
   app.use(express.cookieParser());
   app.use(app.router);

});

app.get('/', function (req, res)
{
    res.render('index.ejs');
});

app.post('/getautocomp', function (req, res)
{
    var data = req.body.field1;
    var result = [];

    if (data != "")
    {

        var requete = "SELECT nom from dpts where nom like '" + data + "%'";
        connection.query(requete, function (err, resultats, fields)
        {

            if (err)
            {
                console.log('GetData Error: ' + err.message);
            }
            if (resultats.length > 0)
            {
                for (var i = 0, c = resultats.length; i < c; i++)
                {
                    result.push(resultats[i]['nom']);
                }
                res.send(result);
            }
        });
    } else 
    {
        res.send(result);
    }
});

app.listen(process.env.PORT || 8081);