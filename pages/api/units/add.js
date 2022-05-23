// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const { connectToDatabase } = require('../../../lib/mongodb');
const ObjectId = require('mongodb').ObjectId;
//import {connectToDatabase} from '../../../lib/mongodb'
import { getSession } from "next-auth/react"

const handler = async(req, res)=> {
    //securing api route
    const session = await getSession({ req });
    if(!session){
        res.status(401).json({msg:"no permission to access this route!"})
    }
    // Get data submitted in request's body.
    const {status,category,owner,ownerPhone,type,price,area,location,address,media,zone,rooms,description} = req.body
  
    // Guard clause checks for first and last name,
    // and returns early if they are not found
    if (!status || !category || !owner || !price || !ownerPhone || !type || !area || !location || !address || !media || !zone || !rooms || !description) {
      // Sends a HTTP bad request error code
      return res.status(400).json({ data: 'you must fill up all inputs' })
    }
  
    // Found the name.
    // Sends a HTTP success code
    if(req.method === 'POST'){
        return addUnit(req,res);
    }
  }


  async function addUnit(req, res) {
    try {
        let { db } = await connectToDatabase();
        await db.collection('units').insertOne(req.body);
        return res.status(201).json({
            message: 'Unit added successfully',
            success: true,
        });
    } catch (error) {
        return res.json({
            message: new Error(error).message,
            success: false,
        });
    }
}


export default handler;