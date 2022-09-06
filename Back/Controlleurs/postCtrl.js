// Imports
var models   = require('../models');
var asyncLib = require('async');
var jwtUtils = require('../Utils/jwtUtils');


// Constants
//const TITLE_LIMIT   = 2;
const CONTENT_LIMIT = 4;
const ITEMS_LIMIT   = 50;

// Routes
module.exports = {
  CreatePublication: (req, res) => {
  // Getting auth header
  var headerAuth   = req.headers['authorization'];
  console.log('-------HEADER--------', req.User)
  //decrypt token and get user id
  var userId  = jwtUtils.getUserId(headerAuth);
   
console.log('---------------', userId)
  // Params
  //var idComment   = req.body.idCommentaire;
  var texte = req.body.texte;
  var attachement=req.body.attachement
  
  asyncLib.waterfall([
    
    (done) => {
        models.Post.create({
          texte: texte,
          attachement: attachement,
          userId : userId,

        })
        .then((newPublication) => {
          done(newPublication);
        });
      } 
  ], (newPublication) => {
    if (newPublication) {
      return res.status(200).json({success: 'Publication successfuly posted', newPublication});
    } else {
      return res.status(500).json({ error: 'cannot post publication ' });
    }
  });
 },


 /* deletePublication: (req, res) => {
        
    var headerAuth   = req.headers['authorization']
    
    let userId      = jwtUtils.getUserId(headerAuth);

    asyncLib.waterfall([
        (done) => {
            models.Post.destroy({
                where: { id: userId }
            })
            .then((userFound) => {
                done(userFound)
            })
            .catch((err) => {
                return res.status(400).json({ 'error': 'An error occurred' });
            });
        }],
        (userFound) => {
            if (userFound) {
                console.log(userFound)
                return res.status(200).json({'success':`Publication successfuly deleted`})
            }
            else {

                return res.status(404).json({ 'error': 'Publication was not found' });
            }
        });
},*/

deletePost: function (req, res) {
  let headerAuth = req.headers["authorization"];
  let userId = jwtUtils.getUserId(headerAuth);

  let postId = req.params.id;

  models.User.findOne({
    where: { id: userId },
  })
    .then(function (userFound) {
      if (userFound) {
        models.Post
          .findOne({
            attributes: ["id", "userId", "texte", "attachement"],
            where: { id: postId },
          })
          .then(function (PostFound) {
            if (userFound.id == PostFound.dataValues.userId) {
              models.Post.destroy({
                where: { id: postId },
              });
              return res
                .status(200)
                .json({ success: "Your post has been deleted" });
            } else {
              return res
                .status(403)
                .json({
                  error: "you don't have the rights to delete this post",
                });
            }
          })
          .catch(function (error) {
            return res.status(404).json({ error: "post not found" });
          });
      } else {
        return res.status(403).json({ error: "invalid user" });
      }
    })
    .catch(function (error) {
      return res.status(500).json({ error: "unable to verify user" });
    });
},

    PutPublication: ( req, res) => {
      var headerAuth   = req.headers['authorization']
      let userId = jwtUtils.getUserId(headerAuth);
      
      let texte = req.body.texte;
      

    asyncLib.waterfall([
      (done) => {
          models.Post.findOne({
              attributes: [ 'id','texte'],
              where :{ id: userId}
          })
          .then((userFound)=> {
              done(null,userFound);
          })
          .catch((err) => {
              return res.status(400).json({ 'error': 'Unable to verify publication' });
          });
      },
      (userFound, done) => {
          if(userFound) {
            userFound.update({
                texte: (texte ? texte : userFound.texte),
                
            })
            .then((userFound) => {
                done(userFound);
            })
            .catch((err) => {
                res.status(500).json({ 'error': 'cannot update publication' });
            });
          }
          else {
            res.status(404).json({ 'error': 'An error occurred' });
          }
        },
      ], 
      (userFound) => {
        if (userFound) {
            res.status(200).json({'success': 'Publication successfuly modified'})
        } 
        else {
          return res.status(500).json({ 'error': 'cannot update publication profile' });
        }
      });
    },

    getPost: (req, res) => {
      var userId = req.params.id;
      
      models.Post.findOne({
          attributes: ['id', 'texte'],
          where: {id: userId}
      })
      .then((user) => {
          if(user){
              res.status(201).json(user)   
          }
          else {
              res.status(404).json({'error': 'Publication not found'})
          }
      })
      .catch((err) =>  {
        console.log(err)
          res.status(500).json({'error': 'Cannot fetch Publication'});
      })
  },

    getAllPosts: (req, res) => {
          models.Post.findAll({
              attributes: [ 'id', 'userId','texte','attachement']
          })
          .then((posts) => {
              res.status(200).json({success:posts})
              //res.render('home', {data : posts})
          })
          .catch((err) => {
              console.log(err);
              res.status(400).json({ error: 'An error occurred' });
          });
    }
}
