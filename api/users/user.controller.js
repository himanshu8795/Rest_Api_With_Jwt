const { create , getUserById ,getUsers , updateUsers, deleteUsers ,getUserByUserEmail} = require("./user.service");
//const { request } = require("express");
const { genSaltSync , hashSync , compareSync} = require("bcrypt")
const { sign } = require('jsonwebtoken');

module.exports={
    createUser : (req,res) => {
        const body =req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        create(body , (err,results) =>{
            if(err){
                console.log(err);
                return res.status(500).json({
                    success :0,
                    message : "Database Connection Error"
                });
            }
            return res.status(200).json({
                success : 1,
                data : results
            });

        });
    },
    getUserById: (req,res) => {
        const id = req.params.id;
        getUserById(id, (err,results)=>{
           if(err){
               console.log(err);
           } 
           if(!results){
               return res.json({
                   success : 0,
                   message : "record not found"
               });
           }
           return res.json({
               success : 1,
               data: results
           });
        });
    },
    getUsers: (req,res) => {
        getUsers((err,results) =>{
            if (err){
                console.log(err);
                return;
            }
            return res.json({
                success : 1,
                data : results
            });
        });
    },
    updateUsers: (req,res) =>{
        const body =req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        updateUsers(body , (err,results) =>{
            if(err){
                console.log(err);
                return ;
            }
            return res.json({
                success : 1,
                message : "Update Succesfully.."
            });

        });
    },  
    deleteUsers: (req,res) => {
        const data = req.body;
        deleteUsers(data, (err,results)=>{
           if(err){
               console.log(err);
               return;
           } 
           if(!results){
               return res.json({
                   success : 0,
                   message : "record not found"
               });
           }
           return res.json({
               success : 1,
               data: "User Deleted Succesfully"
           });
        });
    },
    login: (req,res) => {
        const body = req.body;
        getUserByUserEmail(body.email,(err,results)=>{
            if(err){
                console.log(err);
            }
            if(!results){
                return res.json({
                    success: 0,
                    message: "Invalid Email or Password"
                });
            }
            const result = compareSync(body.password, results.password);
            if(result){
                results.password = undefined;
                const jsontoken = sign({result: results},"qwe1234",{
                    expiresIn: "1h"
                });
                return res.json({
                    success: 1,
                    message : 'Login Succesfully',
                    token: jsontoken
                });
            }else{
                return res.json({
                    success:0,
                    data:"Invalid Email or Password"
                })
            }
        });
    }
};