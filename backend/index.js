import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { PORT, mongoDBURL } from "./config.js";
import Connection from "./models/connection.js";

const app = express();
app.use(cors(
    {
        origin: ["https://share-text-api.vercel.app"],
        methods: ["POST" , "GET" , "PATCH" , "DELETE" ],
        credentials: true
    }
));
app.use(express.json());

app.get('/',(req,res)=>{
    res.send('hello guys ...');
})

app.get('/connections',async(req,res)=>{
    const connections = await Connection.find({});
    res.send(connections);
})

app.get('/connections/:id',async(req,res)=>{
    const {id} = req.params;
    const connection = await Connection.findById(id);
    if(connection){
        return res.send(connection);
    }
    return res.send(false);
})

app.post('/connections',async(req,res)=>{
    if(req.body.id===''){
        return res.send('enter the id');
    }
    const connection = {
        _id: req.body.id,
        content: req.body.content
    }
    const result = await Connection.create(connection);
    if(result){
        return res.send('posted successfully');
    }
    return res.send('some error occured');
});

app.patch('/connections/:id',async(req,res)=>{
    const {id} = req.params;
    const content = req.body.content;
    const result = await Connection.findByIdAndUpdate(id,{content});
    if(result) {
        return res.send('updated successfully');
    }
    res.send(false);
});

app.delete('/connections/:id',async(req,res)=>{
    const {id} = req.params;
    const result = await Connection.findByIdAndDelete(id);
    if(result){
        return res.send('deleted successfully');
    }
    return res.send('no such connection found');
})

mongoose
    .connect(mongoDBURL)
    .then(()=>{
        
        app.listen(PORT,()=>{
            console.log(`server is listening to port ${PORT}`);
        })
    })

