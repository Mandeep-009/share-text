import express from "express";
import cors from "cors";
import { PORT, mongoDBURL } from "./config.js";
import Connection from "./models/connection.js";

const app = express();
app.use(cors(
    {
        origin: ["https://text-share-app.vercel.app","https://text.mandeep.space","http://localhost:3000"],
        methods: ["POST" , "GET" , "PATCH" , "DELETE" ],
        credentials: true
    }
));
app.use(express.json());

let connections = [];

app.get('/',(req,res)=>{
    return res.status(200).send('hello guys ...');
})

app.get('/connections',async(req,res)=>{
    try {
        // const connections = await Connection.find({});
        return res.status(200).send(connections);
    } catch (error) {
        return res.status(500).send(error);
    }
})

app.get('/connections/:id',async(req,res)=>{
    try {
        const {id} = req.params;
        // const connection = await Connection.findById(id);
        // if(connection){
        //     return res.status(200).send(connection);
        // }

        const existingConnection = connections.find((connection)=>connection.id===id);
        if(existingConnection && new Date() < existingConnection.expiresAt){
            return res.status(200).send(existingConnection);
        }

        return res.status(404).send('No such channel exists');
    } catch (error) {
        return res.status(500).send(error);
    }
})

app.post('/connections',async(req,res)=>{
    try {
        if(req.body.id===''){
            return res.status(400).send('enter the id');
        }

        const newConnection = {createdAt: new Date(), expiresAt: new Date(Date.now() + 5*60000), id: req.body.id, content: req.body.content};
        //find if some connection with same id exists
        let existingConnection = connections.find((connection)=>connection.id===req.body.id);
        if(existingConnection){
            //check if current time is more than expiry time
            if(new Date() >= existingConnection.expiresAt){
                //update existing connection by the new connection
                existingConnection.createdAt = newConnection.createdAt;
                existingConnection.expiresAt = newConnection.expiresAt;
                existingConnection.content = newConnection.content;
                return res.status(201).send('posted successfully');
            } else{
                return res.status(400).send('connection with this id already exists');
            }
        }
        
        connections.push(newConnection);
        return res.status(201).send('posted successfully');
    } catch (error) {
        return res.status(500).send(error);
    }
});

app.patch('/connections/:id',async(req,res)=>{
    try {
        const {id} = req.params;
        const content = req.body.content;
        // const result = await Connection.findByIdAndUpdate(id,{content});

        const existingConnection = connections.find((connection)=>connection.id===id);
        if(existingConnection && new Date() < existingConnection.expiresAt){
            existingConnection.content = content;
            return res.status(200).send('updated successfully');
        }
        return res.status(404).send('This connection token has expired');
    } catch (error) {
        return res.status(500).send(error);
    }
});

// app.delete('/connections/:id',async(req,res)=>{
//     try {
//         const {id} = req.params;
//         const result = await Connection.findByIdAndDelete(id);
//         if(result){
//             return res.status(200).send('deleted successfully');
//         }
//         return res.status(404).send('no such connection found');
//     } catch (error) {
//         return res.status(500).send(error);
//     }
// })

app.listen(PORT,()=>{
    console.log(`server is listening to port ${PORT}`);
})