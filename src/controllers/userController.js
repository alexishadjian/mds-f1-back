const User = require('../models/userModel');
const UserTimer = require('../models/userTimerModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.userRegister = async (req,res) => {

    try {
        let newUser = new User(req.body);
        let user = await newUser.save();
        res.status(201).json({message: `Utilisateur crée: ${user.email}`})
    } catch (error) {
        console.log(error);
        res.status(401).json({message: "Requête invalide"});
    }

}

exports.userLogin = async (req,res) => {
    try {
        const user = await User.findOne({email: req.body.email});

        if (!user) {
            res.status(500).json({message: "Utilisateur non trouvé"});
            return;
        }

        const password = await bcrypt.compare(req.body.password, user.password);

        if (user.email === req.body.email && password) {
            const userData = {
                id: user._id,
                email: user.email,
                role: user.role,
            }
            const token = await jwt.sign(userData, process.env.JWT_KEY, {expiresIn: "10h"})
            res.status(200).json({token});

        } else {
            res.status(401).json({message: "Email ou mot de passe incorrect"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Une erreur s'est produite lors du traitement"})
    }
}

exports.userUpdate = async (req,res) => {

    try {
        const user = await User.findByIdAndUpdate(req.params.user_id, req.body, {new: true});
        res.status(200);
        res.json(user);
    } catch (error) {
        res.status(500);
        console.log(error);
        res.json({message: 'erreur serveur'});
    }

}

exports.userDelete = async (req, res) => {
    
    try {
        await User.findByIdAndDelete(req.params.user_id);
        res.status(200);
        res.json({message: 'Utilisateur supprimé'});

    } catch {
        res.status(500);
        console.log(error);
        res.json({message: 'erreur serveur'});
    }

}

exports.userTimer = async (req, res) => {
    
    try {
        await User.findById(req.params.user_id);
        const newTimer = new UserTimer({...req.body, user_id: req.params.user_id});

        try {
            const timer = await newTimer.save();
            res.status(201);
            res.json(timer);
        } catch (error) {
            res.status(500);
            console.log(error);
            res.json({message: 'Erreur serveur (db)'})
        }

    } catch (error) {
        res.status(500);
        console.log(error);
        res.json({message: 'Erreur serveur (user inexistant)'})
    }

}

exports.getAllUserTime = async (req, res) => {
    
    try {
        const userTimes = await UserTimer.find({ user_id: req.params.user_id });
        res.status(200);
        res.json(userTimes);
    } catch (error) {
        res.status(500);
        console.log(error);
        res.json({message: 'Erreur serveur'})
    }
}

exports.getUserTimeAvg = async (req, res) => {
    
    try {
        const userTimes = await UserTimer.find({ user_id: req.params.user_id });

        let totalTime = 0;
        let i = 0;
        
        for ( i; i < userTimes.length; i++ ) totalTime += userTimes[i].time;
        const avgTime = totalTime / i; 

        res.status(200);
        res.json(avgTime);
    } catch (error) {
        res.status(500);
        console.log(error);
        res.json({message: 'Erreur serveur'})
    }
}