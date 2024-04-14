import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { PORT, mongoDBURL } from "./config.js";
import Connection from "./models/connection.js";

const app = express();
app.use(cors(
    {
        origin: ["https://text-share-app.vercel.app","http://localhost:3000"],
        methods: ["POST" , "GET" , "PATCH" , "DELETE" ],
        credentials: true
    }
));
app.use(express.json());

app.get('/',(req,res)=>{
    return res.status(200).send('hello guys ...');
})

app.get('/connections',async(req,res)=>{
    try {
        const connections = await Connection.find({});
        return res.status(200).send(connections);
    } catch (error) {
        return res.status(500).send(error);
    }
})

app.get('/connections/:id',async(req,res)=>{
    try {
        const {id} = req.params;
        const connection = await Connection.findById(id);
        if(connection){
            return res.status(200).send(connection);
        }
        return res.status(404).send(false);
    } catch (error) {
        return res.status(500).send(error.message);
    }
})

app.post('/connections',async(req,res)=>{
    try {
        if(req.body.id===''){
            return res.status(400).send('enter the id');
        }
        const connection = {
            _id: req.body.id,
            content: req.body.content
        }
        const result = await Connection.create(connection);
        if(result){
            return res.status(201).send('posted successfully');
        }
        return res.status(500).send('some error occured while making post request');
    } catch (error) {
        return res.status(500).send(error);
    }
});

app.patch('/connections/:id',async(req,res)=>{
    try {
        const {id} = req.params;
        const content = req.body.content;
        const result = await Connection.findByIdAndUpdate(id,{content});
        if(result) {
            return res.status(200).send('updated successfully');
        }
        return res.status(404).send(false);
    } catch (error) {
        return res.status(500).send(error);
    }
});

app.delete('/connections/:id',async(req,res)=>{
    try {
        const {id} = req.params;
        const result = await Connection.findByIdAndDelete(id);
        if(result){
            return res.status(200).send('deleted successfully');
        }
        return res.status(404).send('no such connection found');
    } catch (error) {
        return res.status(500).send(error);
    }
})

mongoose
    .connect(mongoDBURL)
    .then(()=>{
        
        app.listen(PORT,()=>{
            console.log(`server is listening to port ${PORT}`);
        })
    })

