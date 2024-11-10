const mongodb = require('../utils/mongodb');
var ObjectId = require('mongodb').ObjectId;
const axios = require('axios');

const getById = async (req, res) => {
    try {
        const userId = new ObjectId(req.params.id);
        const result = await mongodb.getDb().db('warrantywise').collection('users').find({ _id: userId });
        result.toArray().then((lists) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists[0]);
        });

    }
    catch {
        throw Error('Something happened while trying to get user by Id');
    }
};


const createOrUpdate = async (req, res) => {
    try {
        const access_token = req.params.access_token;
        const opts = { headers: { accept: 'application/json', authorization: `Bearer ${access_token}` } };

        axios.get('https://api.github.com/user', opts)
        .then((_res) => { _res.login, _res.avatar_url, _res.id})
        .then(async (userDetails) => {
            console.log(userDetails);
            const user = {
                username: userDetails.login,
                profileImage: userDetails.avatar_url,
                githubId: userDetails.id,
                githubToken: access_token
            }
            var response = null;
            const existingUser = await mongodb.get().db('warrantywise').collection('users').findOne({ githubId: userDetails.id});
            if (existingUser) {
                response = await mongodb.getDb().db('warrantywise').collection('users').replaceOne({ githubId: userDetails.id }, user);
            } else {
                response = await mongodb.getDb().db('warrantywise').collection('users').insertOne(user);
            } 
        
            res.status(201).json(response);
        });    
    }
    catch {
     throw Error(response.error || 'Some error occurred while creating the user.');
    }
     
 };

module.exports = {
    getById,
    createOrUpdate
}