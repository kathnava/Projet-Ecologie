const fetch = require('node-fetch');
const LocalStorage = require('node-localstorage').LocalStorage;

var localStorage = new LocalStorage('./scratch');
//var jwtUtils = require('../../ProjetBack/jwtUtils');



exports.addPost= async (req, res) => {
    console.log('----------body----',req.body)
    fetch("http://localhost:8080/api/new", {
        
        // Adding method type
        method: "POST",
        headers: {
            Authorization: localStorage.getItem('token'),// Token à récupérer 
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        // Adding body or contents to sen
        body: JSON.stringify({
            texte : req.body.texte,
            attachement:req.body.attachement,
        }),
    })

// Converting to JSON
.then(response => response.json())
// Displaying results to console
.then(json => { 

  // res.render('home',json)
   res.redirect('/')
})
}

exports.getPostAll = async (req,res) => {
    const posts = await fetch('http://localhost:8080/api/getAllPosts',{
        headers: {
            Authorization: localStorage.getItem('token'),// Token à récupérer
        },

    })
    const userPost = await posts.json()
    
    const response = await fetch(`http://localhost:8080/api/me/${req.params.id}`, {
        headers: {
            'Authorization': localStorage.getItem('token')// Token à récupérer
        }
         });

    const myUser = await response.json();


    if(userPost){
        console.log(userPost)
        res.render('home', userPost)
    }
    
}


exports.getUserByToken = async (req, res, next) => {

    console.log('jy suis ');
    
    // const response = await fetch('http://localhost:3500/api/me',{
    //     headers: {
    //         'Authorization':  localStorage.getItem('token')// Token à récupérer 
    //     }
    //  });
    // const myJson = await response.json();
    // req.user = myJson;
    // console.log('User Info', req.user);
    // return next();
    
}

/*
exports.getUserById = async (req, res) => {
    
       fetch('http://localhost:3500/api/me',{

    method:'GET',

    headers: {
        "Content-type": "application/json; charset=UTF-8"
    })

    .then(response => response.json())
    // Displaying results to console
    .then(json => {
        console.log(json)
        if(req.headers['authorization'])
            res.redirect('/');
        else  
            next();
    })
    
}*/