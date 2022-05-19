// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const { connectToDatabase } = require('../../../lib/mongodb');

//import {connectToDatabase} from '../../../lib/mongodb'

const handler = async (req, res)=> {
    
    const {code}=req.body;
    console.log(req.body);
    if(req.method === 'POST'){
        try {
            let { db } = await connectToDatabase();
            const unit = await db.collection('units').find({code:code}).toArray();
            return res.status(200).json(unit);
        } catch (error) {
            return res.json({
                message: new Error(error).message,
                success: false,
            });
        }
    }
    
    
    
  }


  export default handler;

  