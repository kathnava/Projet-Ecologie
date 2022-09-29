const bcrypt = require('bcrypt');
const jwtUtils = require('../Utils/jwtUtils');
const models = require('../models');
const asyncLib = require('async');
const cookieParser = require('cookie-parser');
require('dotenv').config();
//const { nextTick } = require('process');

// constants
const EMAIL_REGEX = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
const PASSWORD_REGEX = /^.{4,8}$/;
//mot de passe de 4 à 8 caracteres 

// deleteUserByAdmin:(req, res)=> {

//     let headerAuth = req.headers['authorization'];
//     let userId = jwtUtils.getUserId(headerAuth);
//     // let userId = req.params.id;

//     console.log('-------userId ', userId);

//     asyncLib.waterfall([
       
//         (done) => {
//             console.log('-------kath', isAdmin)
//             if (isAdmin === 0) {
//             models.User.destroy({
//             attributes: ['id', 'nom','prenom','email','password','isAdmin'],
//             where: { id: userId }
//         })
//         .then((userFound) => {

//           console.log('-------userFound ', userFound);

//             done(userFound)
//         })
//         .catch((err) => {
//             return res.status(400).json({ 'error': 'An error occurred'+ err });
//         });
//       }
//     }
//     ],
//     (userFound) => {
//         if (userFound) {
//             return res.status(200).json({'success':`User successfuly deleted`})
//         }
//         else {
//             return res.status(404).json({ 'error': 'User was not found' });
//         }
//     });
// },
// }


module.exports = {
    deleteUserByAdmin: function (req, res) {

    let headerAuth = req.headers["authorization"];
    let userConnectedId = jwtUtils.getUserId(headerAuth);
    let userId = req.params.id;
    console.log("ici ", userId);
    
    models.User.findOne({
      where: { id: userConnectedId },
    })
      .then(function (useConnectedrFound) {
        console.log("ici CONNECTED USER ", useConnectedrFound.dataValues.isAdmin);

              if (useConnectedrFound.dataValues.isAdmin == true) {
                models.User.destroy({
                  where: { id: userId },
                });
                return res
                  .status(200)
                  .json({ success: "Your account has been deleted" });
              } else {
                return res.status(403).json({
                  error: "you don't have the rights to delete this account",
                });
              }
      })
      .catch(function (error) {
        return res.status(500).json({ error: "unable to verify user" });
      });
    }
}
