import { useState } from "react";
import { connectToDatabase } from "../../lib/mongodb";
import Image from "next/image";
import Layout from "../../components/layout";
import Link from "next/link";


function List({ units }) {
  //our filtered units state which will obtain the search result
  const [filtered, setFiltered] = useState([]);
  //first param to filtering our units
  const [status, setStatus] = useState("");
  //second param to filtering our units
  const [category, setCategory] = useState("");

 

  const statusHandler = (e) => {
    e.preventDefault();
    setStatus(e.target.value);
  };

  const categoryHandler = (e) => {
    e.preventDefault();
    setCategory(e.target.value);
  };

  const search = (e) => {
    e.preventDefault();
    let list = units.filter(
      (unit) =>  unit.status === status && unit.category === category
    );
    setFiltered(list);
    
  };

  return (
    <Layout>
      <div className="flex-grow h-full bg-blue-500">
        <div className="flex justify-between  h-25">
          <div className="p-2 ">
            <select
              name="status"
              onChange={statusHandler}
              required
            >
              <option value=""> Status</option>
              <option value="Rent">Rent</option>
              <option value="Sale">Sale</option>
            </select>
          </div>
          <div className="p-2">
            <select
              name="category"
              onChange={categoryHandler}
              required
            >
              <option value="">Category</option>
              <option value="Apartment" className="text-base">
                  Apartment
                </option>
                <option value="Chalet" className="text-base">
                  Chalet
                </option>
                <option value="Clinic" className="text-base">
                  Clinic
                </option>
                <option value="Coffee Shop" className="text-base">
                  Coffee shop
                </option>
                <option value="Duplex" className="text-base">
                  Duplex
                </option>
                <option value="Garage" className="text-base">
                  Garage
                </option>
                <option value="Hospital" className="text-base">
                  Hospital
                </option>
                <option value="Hotel" className="text-base">
                  Hotel
                </option>
                <option value="House" className="text-base">
                  House
                </option>
                <option value="Mall" className="text-base">
                  Mall
                </option>
                <option value="Office" className="text-base">
                  Office
                </option>
                <option value="Pharmacy" className="text-base">
                  Pharmacy
                </option>
                <option value="Restaurant" className="text-base">
                  Restaurant
                </option>
                <option value="Shop" className="text-base">
                  Shop
                </option>
                <option vlaue="Studio" className="text-base">
                  Studio
                </option>
                <option value="Villa" className="text-base">
                  Villa
                </option>
                <option value="Warehouse" className="text-base">
                  Warehouse
                </option>
            </select>
          </div>
          <div className="bg-blue-700 border-2 rounded-lg border-white text-white p-2">
            <button onClick={search} className="">
              search
            </button>
          </div>
        </div>
        <div className="flex-1">
          <h1 className="text-center bg-slate-500 p-2 text-white text-xl">
            Search result : {filtered.length}
          </h1>
          {filtered &&
            filtered.map((unit) => {
              return (
                <div
                  key={unit._id}
                  className="flex  w-full bg-blue-500 text-white border-2 border-yellow-50 p-4"
                >
                  <div className="flex-1">
                    <Image
                      src={unit.media}
                      height={200}
                      width={200}
                      alt="image"
                    />
                  </div>
                  <div className="flex flex-col w-2/3">
                    <div>
                      <span className="p-2">
                        {unit.category} for {unit.status}
                      </span>
                    </div>
                    <div>
                      <span className="p-2">
                        {unit.rooms} rooms | {unit.area} m<sup>2</sup>
                      </span>
                    </div>
                    <div>
                      <span className="p-2">
                        {parseFloat(unit.price).toLocaleString("en")} EGP
                      </span>
                    </div>
                    <div>
                      <span className="p-2">{unit.zone} </span>
                    </div>
                    <div>
                      <span className="p-2">{unit.code}</span>
                    </div>

                    <div>
                      <span className="p-2">{unit.description}</span>
                    </div>
                    <div className="flex justify-end">
                      <span className="bg-slate-400 border-2 rounded-lg px-2">
                        <Link href={`/units/${unit.code}`}>
                          <a>view unit details</a>
                        </Link>
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  //connecting to our database
  let { db } = await connectToDatabase();
  //get all units from database collection 'units'
  let data = await db.collection("units").find({}).toArray();
  //avoiding problems with parsing and stringify our data
  const units = JSON.parse(JSON.stringify(data));

  return {
    props: {
      units,
    },
    revalidate: 10,
  };
}

export default List;
