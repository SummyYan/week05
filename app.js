let express = require('express');
let app = express();
let bodyParser= require('body-parser');//
let morgan =require('morgan');

app.engine('html', require('ejs').renderFile);//adding ejs renderFile feature on server, applying templates to html files
// let ejs= require('ejs');
app.set('view engine', 'html');

app.use(morgan('tiny'));

app.use(express.static('images'));
app.use(express.static('css'));

let taskDb=[];

// app.use(function(res,req,next){


//     next();
// });

app.use(bodyParser.urlencoded({// /?name=...&age=.. url encoded: check
    extended:false,//value to be a string or array
}));
app.use(bodyParser.json());// data useing json format : check

app.get('/',function(req,res){
    res.sendFile(__dirname+'/index.html');
});

app.get('/newtask',function(req,res){
    res.sendFile(__dirname+'/newtask.html');
});
app.post('/addnewtask',function(req,res){
    
    // taskDb.push({
    //     taskName: req.body.taskName,
    //     taskDue: req.body.taskDue,
    //     taskDesc: req.body.taskDesc
    // });
    
    taskDb.push(req.body);
    console.log(req.body);
    console.log('I have '+ taskDb.length+' record');
    res.sendFile(__dirname+'/newtask.html');
});

app.get('/listtasks',function(req,res){
    res.render('listtasks.html',{taskDb: taskDb});
});
app.listen(8000);
console.log('server running at http://localhost:8000/');

//dynamic files: get the data at run time -- using view engine