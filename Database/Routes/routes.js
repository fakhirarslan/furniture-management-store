const router = require('express').Router();
let User = require('../Models/schema');

router.route('/login').post((req, res) => {
   User.findOne({ email: req.body.email, password: req.body.password })
      .then(user => {
         if (user) {
            res.json({
               email: user.email,
               password: user.password,
               name: user.name,
               phone: user.phone,
               isAdmin: user.isAdmin,
               status: "User Exists!"
            });
         } else {
            res.json({
                status: "No User"
            });
         }
      })
});

router.route('/register').post((req, res) => {
   const email = req.body.email;
   const password = req.body.password;
   const name = req.body.name;
   const phone = req.body.phone;
   const isAdmin = req.body.isAdmin;

   const userData = {
      email: email,
      password: password,
      name: name,
      phone: phone,
      isAdmin: isAdmin
   };

   User.findOne({ email: email })
      .then(user => {
         if (!user) {
            User.create(userData)
               .then(user => {
                  res.json({ status: user.email + ' User Registered!' });
               })
               .catch(err => {
                  res.send('error: ' + err)
               })
         } else {
            res.json({ error: 'User Already Exists!' });
         }
      })
});

module.exports = router;