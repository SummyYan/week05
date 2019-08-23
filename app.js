let express = require('express');
let app = express();
let bodyParser= require('body-parser');
let morgan =require('morgan');

app.engine('html', require('ejs').renderFile);//?
app.set('view engine', 'html');//?

app.use(morgan('tiny'));

app.use(express.static('images'));
app.use(express.static('css'));

let taskDb=[];

app.use(bodyParser.urlencoded({//?
    extended:false,
}));
app.use(bodyParser.json());//?

app.get('/',function(req,res){
    res.sendFile(__dirname+'/index.html');
});

app.get('/newtask',function(req,res){
    res.sendFile(__dirname+'/newtask.html');
});
app.post('/newtask',function(req,res){
    
    taskDb.push({
        taskName: req.body.taskName,
        taskDue: req.body.taskDue,
        taskDesc: req.body.taskDesc
    });
    res.sendFile(__dirname+'/newtask.html');
});

app.get('/listtasks',function(req,res){
    res.render('listtasks.html',{taskDb: taskDb});
});
app.listen(8000);
console.log('server running at http://127.0.0.1:8000/');