// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const { connectToDatabase } = require("../../../lib/mongodb");

//import {connectToDatabase} from '../../../lib/mongodb'

const handler = async (req, res) => {
  const { code } = req.body;
  if (req.method === "DELETE") {
    try {
      const { db } = await connectToDatabase();
      await db.collection("units").deleteOne({ code: code });
      return res
        .status(200)
        .json({ msg: "unit has been deleted succussfully" });
    } catch (error) {
      return res.json({
        message: new Error(error).message,
        success: false,
      });
    }
  }
};

export default handler;
