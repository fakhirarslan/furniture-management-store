const router = require('express').Router();
const multer = require('multer');
const path = require("path");

let User = require('../Models/schema');
let Item = require('../Models/itemSchema');

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

const storage = multer.diskStorage({
   destination: "./public/uploads/",
   filename: function (req, file, cb) {
      cb(null, "IMAGE-" + Date.now() + path.extname(file.originalname));
   }
});
const upload = multer({
   storage: storage,
});

router.post("/image", upload.single('myImage'), function (req, res, next) {
   res.json({ req: req.file });
});

router.post("/", function (req, res, next) {
   const title = req.body.item.title;
   const quantity = req.body.item.quantity;
   const price = req.body.item.price;
   const image = req.body.item.image;

   const itemData = {
      title: title,
      quantity: quantity,
      price: price,
      image: image,
   };

   Item.create(itemData)
      .then(item => {
         res.json({
            item: item
         });
      })
      .catch(err => {
         res.send('error: ' + err);
      });
});

router.get('/itemList', function (req, res) {
   let items = Item.find({}, function (err, items) {
      if (err) {
         console.log(err);
      }
      else {
         res.json(items);
      }
   });
})

router.get('/userList', function (req, res) {
   let users = User.find({}, function (err, users) {
      if (err) {
         console.log(err);
      }
      else {
         res.json(users);
      }
   });
})

router.delete('/userDelete/:id', function (req, res) {
   User.findByIdAndRemove(req.params.id, function (err, user) {
      if (err) {
         res.json({success: false});
      }
      else {
         res.json({success: true});
      }
   });
})

router.delete('/itemDelete/:id', function (req, res) {
   Item.findByIdAndRemove(req.params.id, function (err, item) {
      if (err) {
         res.json({success: false});
      }
      else {
         res.json({success: true});
      }
   });
})

module.exports = router;
