const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

/*database variable not used now... */
const database = {
    users:[
        {
            id: '1',
            name: 'john',
            email: 'john@gmail.com',
            password : 'cookies',
            entries: 0,
            joined: new Date()
        },
        {
            id: '2',
            name: 'sally',
            email: 'sally@gmail.com',
            password : 'jar',
            entries: 0,
            joined: new Date()
        }
    ]
}

app.get('/', (req,res)=>{
    res.send("you are calling a working server")
})

app.post('/recognizedFaces', (req,res) => {
    let data = req.body;
    res.json(data.length);
}) 

/* signin service not used... in front end */
app.post('/signin', (req,res) => {
    if(req.body.email === database.users[0].email && req.body.password === database.users[0].password){
        res.json('success');
    } else {
        res.status(400).json('error logging in');
    }
    
})

/* register service not used... in front end */
app.post('/register', (req, res) => {
    const {email, name, password} = req.body;
    database.users.push({
        id:'3',
        name:name,
        email:email,
        password: password,
        entries:0,
        joined: new Date()
    })
    res.json(database.users[database.users.length-1])
})

/* profile/:id service not used... in front end */
app.get('/profile/:id',(req,res) => {
    const { id } = req.params;
    let found = false;
    database.users.forEach(user => {
        if(user.id === id){
            found = true;
           return res.json(user);
        } 
    })
    if(!found){
        res.status(400).json("user not found");
    }
})

/* updatingEntries service not used... in front end */
app.put('/updateEntry',(req,res)=>{
    const { id } = req.body;
    let found = false;
    database.users.forEach(user => {
        if(user.id === id){
            found = true;
            user.entries++
           return res.json(user.entries);
        } 
    })
    if(!found){
        res.status(400).json("user not found");
    }
})

app.listen(3000, ()=>{
    console.log("listening...")
})

/*
/ --> res = root route
/signin --> success when password and email is correct
/register --> add new user
/profile/:userId --> Get = user
/image --> put --> user
/recognizedFaces --> returns count of recognized faces
*/