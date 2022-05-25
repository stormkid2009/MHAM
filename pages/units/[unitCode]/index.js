import { connectToDatabase } from "../../../lib/mongodb";
import Layout from "../../../components/layout";
import parse from "html-react-parser";
import Image from "next/image";

export async function getStaticPaths() {
  const { db } = await connectToDatabase();
  const data = await db.collection("units").find({}).toArray();
  const units = await JSON.parse(JSON.stringify(data));

  const paths = units.map((unit) => {
    return {
      params: { unitCode: unit.code },
    };
  });
  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps(context) {
  let { params } = context;
  let { db } = await connectToDatabase();
  let data = await db.collection("units").findOne({ code: params.unitCode });
  const unit = JSON.parse(JSON.stringify(data));

  return {
    props: {
      unit,
    },
    revalidate: 10,
  };
}

export default function Review({ unit }) {
    const {media} = unit;
    //url string for sharing images length is 64 this to avoid empty strings
    const filteredMedia = media.filter(el => el.length === 64);
    //console.log(filteredMedia);
    
  return (
    <Layout>
      <div className="flex flex-col m-2">
        <div className="w-full">
         <div className="flex flex-wrap">
         {filteredMedia && filteredMedia.map((el,index)=>{
              return (<div key={index} className="border-2 border-sky-400 m-1">
                    <Image src={el} width={500} height={300} alt="image"/>
              </div>)
            })} 
           </div>    
        </div>
        <div className="m-2 text-xl">
          <div className="flex justify-around">

          <span>{unit.category} |</span>
          <span>{unit.status} |</span>
          <span>{unit.zone}  |</span>
          <span>{parseFloat(unit.price).toLocaleString("en")} EGP  </span>
          </div>
          <div>
            <p className="text-right">
              {unit.description}
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
