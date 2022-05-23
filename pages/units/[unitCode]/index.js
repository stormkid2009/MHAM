import {connectToDatabase} from '../../../lib/mongodb';
import Layout from '../../../components/layout';
import parse from 'html-react-parser';

export async function getStaticPaths(){
    
    const {db} = await connectToDatabase();
    const data = await db.collection('units').find({}).toArray();
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

export async function getStaticProps(context){
    let {params} = context
    let {db} = await connectToDatabase();
    let data = await db.collection('units').findOne({code:params.unitCode});
    const unit = JSON.parse(JSON.stringify(data));

    return {
        props:{
            unit,
        },
        revalidate: 10,
    }
}

export default function Review({unit}) {
    return(
        <Layout>
            <div>
                <div>
                    {parse(unit.location)}
                </div>
            <h1>{unit.status}</h1>
            <h1>{unit.price}</h1>
            <h1>{unit.category}</h1>
            <h1>{unit.code}</h1>
        </div>
        </Layout>
    )
}

