const express = require('express')
const app = express()
const BodyParser = require('body-parser')
const port = process.env.PORT || 3000

let users = [
    {id :1,name: "YourLab"},
    {id :2,name : "Task_1"},
    {id:3, name : "Aniket Soni"},
]
app.use(express.json())
app.use((req,res,next) =>{
    console.log(`Server is running at : ${port}`)
    next()
})
app.use(BodyParser.json())

app.get('/',(req,res)=>{
    res.status(200).send("Welcome to YourLab");
    // res.send("Welcome to YourLab...")
})
app.get('/users',(req,res) =>{
    res.status(200).send(users);
})

app.get('/users/:id', (req,res) =>{
    console.log(req.params);
    let user = users.find(user => user.id === Number( req.params.id));
    
    if(!user) res.status(404).send('User Not Found');

    res.send(user);
    
})

app.post('/users',(req,res)=>{
    const user = {
        id : users.length+1,
        name : req.body.name
    }
    users.push(user);
    res.send(user  );
})

app.put('/users/:id',(req,res)=>{
    let user = users.find(user =>user.id === Number(req.params.id));
    if(!user) res.status(404).send("Sorry We can't proceed your request...");
    
    user.name = req.body.name;
    res.status(200).send(users);
})

app.delete('/users/:id',(req,res) =>{
    let User = users.find(User =>User.id ===Number(req.params.id));
    if(!User) res.status(404).send("Sorry we did not find what you are Looking for....");
    const index = users.indexOf(User);
    users.splice(index,1);
    res.status(200).send(User);
})

app.listen(port,() =>{
    console.log(`Server is running at : ${port}`)
})
