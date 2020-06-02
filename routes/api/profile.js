const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const auth = require('../../middleware/auth');
require('../../models/Profile');
const Profile = mongoose.model('Profile');
const request = require('request');
const config = require('config');
const User = mongoose.model('User');
const {
    check,
    validationResult
} = require('express-validator/check');
// @route         get api/Profile/user:user_id
// @desc          Get profile by userId
// @access        Public
router.get('/user/:user_id', async (req, res) => {
    try {
        const profile = await Profile.findOne({
            _id: req.params.user_id
        }).populate('user', ['name', 'avatar']);
        if (!profile) return res.status(400).json({
            msg: 'Profile not found'
        });
        res.json(profile);
    } catch (error) {
        console.error(error);
        if (error.kind === 'ObjectId') return res.status(400).json({
            msg: 'profile not found'
        });
        res.status(500).send('error en el servidor');
    }
});
// @route         get api/Profile/user:user_id
// @desc          Get profile by userId
// @access        Public
router.get('/user/:user_id', async (req, res) => {
    try {
        // el id de cada profile es unico y no tiene nada que ver con la relacion usuario
        // para sacar el profile a partir del usuario debo meter el id del cliente
        // a la propiedad profile.user, en profile.user es donde esta la relacion a los usuarios con los profiles
        const profile = await Profile.findOne({
            user: req.params.user_id
        }).populate('user', ['name', 'avatar']);
        if (!profile) return res.status(400).json({
            msg: 'Profile not found'
        });
        res.json(profile);
    } catch (error) {
        console.error(error);
        if (error.kind === 'ObjectId') return res.status(400).json({
            msg: 'profile not found'
        });
        res.status(500).send('error en el servidor');
    }
});
// @route         get api/Profile
// @desc          Get all profile
// @access        Private
router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name', 'avatar']);
        if (profiles) res.json(profiles);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('error en el servidor');
    }
});
// @route         get api/Profile/me
// @desc          Get current users profile
// @access        Private
router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({
            user: req.user.id
        }).populate('User', ['name', 'avatar']);
        if (!profile) return res.status(400).json({
            msg: 'No hay ningun profile para este usuario'
        });

        return res.status(200).json(profile)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('error en el servidor');
    }
});
// @route         post api/Profile/me
// @desc          Post profiles in logged in users
// @access        Private
router.post('/', [
    check('status', 'Status is required').not().isEmpty(),
    check('skills', 'Skills are required').not().isEmpty(),
], auth, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }
    const {
        company,
        website,
        location,
        bio,
        status,
        gitusername,
        skills,
        youtube,
        facebook,
        twitter,
        instagram,
        linkedin
    } = req.body;
    // build profile object     
    const profileField = {};
    profileField.user = req.user.id;
    if (company) profileField.company = company;
    if (website) profileField.website = website;
    if (location) profileField.location = location;
    if (bio) profileField.bio = bio;
    if (status) profileField.status = status;
    if (gitusername) profileField.gitusername = gitusername;
    let skillss = [];
    // from {a,  ,b, c,  d}} to [a,b,c,d]
    if (skills) {
        profileField.skills = skills.split(',').map(
            (skill) => {
                return skill.trim()
            }
        );
    }
    // Build social object  
    profileField.social = {};
    if (youtube) profileField.social.youtube = youtube;
    if (facebook) profileField.social.facebook = facebook;
    if (twitter) profileField.social.twitter = twitter;
    if (instagram) profileField.social.instagram = instagram;
    if (linkedin) profileField.social.linkedin = linkedin;
    try {
        let profile = await Profile.findOne({
            user: req.user.id
        });

        if (profile) {
            console.log('perfil encontrado');
            profile = await Profile.findOneAndUpdate({
                user: req.user.id
            }, {
                //actualiza automaticamente todo solo poniendo el objeto
                // detecta los campos iguales y solo cambia los diferentes wow
                $set: profileField
            }, {
                // retorna el documento actualizado para mostrarlo al frontend
                new: true
            });
            return res.status(200).json(profile);
        }
        // si no esta el documento lo actualiza de una vez
        if (!profile) console.log('perfil no encontrado voy a crear y a salvar');
        profile = new Profile(profileField)
        await profile.save();
        res.json(profile);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('error en el servidor');
    }
});
// @route         Delete api/Profile/
// @desc          Delete profile , user & postTODO
// @access        Private
router.delete('/', auth, async (req, res) => {
    try {
        // @todo - remove user post
        // remove profile
        await Profile.findOneAndRemove({
            user: req.user.id
        });
        await User.findOneAndRemove({
            _id: req.user.id
        });
        res.json({
            msg: 'User and Product deleted'
        })
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            msg: 'server error'
        });
    }
});
// @route         Put api/Profile/education
// @desc          Add profile education
// @access        Private
router.put('/education', [auth, [
    check('school', 'school is required').not().isEmpty(),
    check('degree', 'degree is required').not().isEmpty(),
    check('fieldofstudy', 'fieldofstudy date is required').not().isEmpty(),
    check('from', 'from date is required').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({
        errors: errors.array()
    });
    const {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    } = req.body;
    const newExp = {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    };
    try {
        const profile = await Profile.findOne({
            user: req.user.id
        });
        console.log('peticion put a api/profile/education');
        console.log('imprimiendo profile');
        console.log(profile);
        profile.education.unshift(newExp);
        console.log('ahora profile es ');
        console.log(profile);
        await profile.save();
        res.status(200).json(profile);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('error server');
    }
});
// @route         Delete api/profile/educatuib/:edu_id
// @desc          Delete User's education by id
// @access        Private
router.delete('/education/:edu_id', auth, async (req, res) => {

    try {
        // mongo db query
        const profileUser = await Profile.findOne({
            user: req.user.id
        });
        // get the index of my object to delete solo obtiene un numero        
        const removeIndex = profileUser.education.map(item => item.id).indexOf(req.params.edu_id);
        // delete the experience list inside mongo object-model Profile
        profileUser.education.splice(removeIndex, 1);
        // async save
        await profileUser.save();
        res.status(200).json(profileUser);
    } catch (error) {
        console.error(error);
        res.status(500).send('server error');

    }

});

// everything is done 
// updating education exp array inside profile schema

// @route         Put api/Profile/experience
// @desc          Add profile experience
// @access        Private
router.put('/experience', [auth, [
    check('title', 'title is required').not().isEmpty(),
    check('company', 'company is required').not().isEmpty(),
    check('from', 'from date is required').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({
        errors: errors.array()
    });
    const {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    } = req.body;
    const newExp = {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    };
    try {
        const profile = await Profile.findOne({
            user: req.user.id
        });
        console.log('peticion put a api/profile/experience');
        console.log('imprimiendo profile');
        console.log(profile);
        profile.experience.unshift(newExp);
        console.log('ahora profile es ');
        console.log(profile);
        await profile.save();
        res.status(200).json(profile);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('error server');
    }
});
// @route         Delete api/profile/experience/:exp_id
// @desc          Delete User's experience by id
// @access        Private
router.delete('/experience/:exp_id', auth, async (req, res) => {

    try {
        // mongo db query
        const profileUser = await Profile.findOne({
            user: req.user.id
        });
        // get the index of my object to delete solo obtiene un numero        
        const removeIndex = profileUser.experience.map(item => item.id).indexOf(req.params.exp_id);
        // delete the experience list inside mongo object-model Profile
        profileUser.experience.splice(removeIndex, 1);
        // async save
        await profileUser.save();
        res.status(200).json(profileUser);
    } catch (error) {
        console.error(error);
        res.status(500).send('server error');
    }
});

// @route         GET api/profile/github/:username
// @desc          GET User's experience by id
// @access        Public

router.get('/github/:username', async (req,res)=>{
    try {
        const options = {
            uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${process.env.githubClientId}&client_secret=${process.env.githubClientSecret}`,
            method: 'GET',
            headers: { 'User-Agent':'node.js' }
        }
        request(options,(error,response,body)=>{
            if (error) console.error('Error happened heyyy -> '+error);
            if (response.statusCode !== 200){
               res.status(404).json({msg:'No github profile found damn, create one'});
                }
            res.json(JSON.parse(body));
        });
    } catch (error) {
        console.error(error.message);        
    }
})

module.exports = router;