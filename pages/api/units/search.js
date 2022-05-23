// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const { connectToDatabase } = require('../../../lib/mongodb');

//import {connectToDatabase} from '../../../lib/mongodb'

const handler = async (req, res)=> {
    const {status,category} = req.body;
    if(req.method === 'POST'){
        try {
            const { db } = await connectToDatabase();
            const data = await db.collection('units').find({status:status,category:category}).toArray();
            return res.status(200).json(data);
        } catch (error) {
            return res.json({
                message: new Error(error).message,
                success: false,
            });
        }
    }
    
    
    
  }


  export default handler;

  