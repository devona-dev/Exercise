const express = require('express');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const router = express.Router();
const {  User } = require('../models/user');
const _= require('lodash');
const auth = require('../middleware/auth')

router.get('/me', auth ,async (req, res)=>{
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
})

router.post('/', async (req, res) => {
    const schema = Joi.object({
        name: Joi.string().required().min(3).max(50),
        email: Joi.string().min(5).max(50).required() ,
        password: Joi.string().min(5).max(50).required(),
        isAdmin: Joi.boolean().required()
   })

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    let user = await User.findOne({ email: req.params.email });
        if(user)
            return res.status(400).send('Bunaqa email mavjud');

        user = new User (_.pick(req.body, ['name', 'email', 'password', 'isAdmin']));
        const salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(user.password, salt);
        user = await user.save();

        res.send(_.pick(user, ['_id','name', 'email', 'isAdmin']));
});

module.exports = router;