const express = require('express');
const LocalStorage = require('node-localstorage').LocalStorage;
var localStorage = new LocalStorage('./scratch');
const route = express.Router();
const userCtrlFront = require('../Controlleurs/userCtrlFront');
const postCtrlFront = require('../Controlleurs/postCtrlFront');
const likeCtrlFront = require('../Controlleurs/likeCtrlFront');
const multer = require ('multer');
const path = require('path');
//const appRouter = express.Router();

    
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
           callback(null, 'public/img/');
       },
       filename: function(req, file, callback)  {
           callback(null, file.originalname);
       }
    })

var upload = multer({ storage: storage });

route.post('/new',upload.single('attachement') ,postCtrlFront.addPost);
route.post('/new', postCtrlFront.addPost);
route.get('/',postCtrlFront.getPostAll);

const token = localStorage.getItem('token');
//console.log('HELLLLO TOKEN ', token);

//LOGIN
route.get('/login', (req ,res) => {

   /* if (token) {
        res.redirect('/')
    }
    else {
        res.redirect('/login')
    }*/
    res.render('../views/index')
});
route.post('/login', userCtrlFront.logUser)


//RIGISTER
route.get('/register',(req,res) => {
res.render('../views/register')
});
route.post('/register', userCtrlFront.addUser);



//HOME
route.get('/', userCtrlFront.getUserByToken, postCtrlFront.getPostAll);

//Profil
route.get('/profil', userCtrlFront.getUserByToken, postCtrlFront.getmyPostFront);

//route.post('/profil', userCtrlFront.updateUser);
route.get('/logout', userCtrlFront.logOut);

route.post('/profil', userCtrlFront.getUserByToken, userCtrlFront.updateUser);
route.route('/profil/:id').post(userCtrlFront.getUserByToken, postCtrlFront.deletePostFront);

route.route('/profil/put/:id').post(userCtrlFront.getUserByToken, postCtrlFront.UpdatePostFront);

/*route.get('/', (req, res) => {
    res.render('home');
  })*/



/*route.get('/profil', (req,res) => {
    res.render('/../viewS/profil')});*/



//POST LIKE
//appRouter.route("/new/:id").post(likeCtrlFront.newLike)
//appRouter.route("/new/unlike/:id").post(likeCtrlFront.unLike)





//route.get('/pagetext', (req,res) => {
    //res.redirect ('/pagetext')});

module.exports = route;


