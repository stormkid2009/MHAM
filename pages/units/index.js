import { useState, useEffect } from "react";
import { connectToDatabase } from "../../lib/mongodb";
import Image from "next/image";
import Layout from "../../components/layout";
import Link from 'next/link';

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
    revalidate:30,
  };
}
function List({ units }) {
  //our filtered units state which will obtain the search result
  const [filtered, setFiltered] = useState([]);
  //first param to filtering our units
  const [status, setStatus] = useState("");
  //second param to filtering our units
  const [category, setCategory] = useState("");

  useEffect(() => {
    console.log(`units array has been modified!!`);
  }, [filtered]);

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
    console.log(status);
    console.log(category);
    let index = units.filter(
      (unit) => unit.status === status && unit.category === category
    );
    setFiltered(index);
    console.log(filtered);
  };

  return (
    <Layout>
      <div className="flex-grow ">
        <div className="flex justify-between m-4 bg-blue-400  border-2 border-white h-25">
          <div className="p-2">
            <select
              name="status"
              value={status}
              onChange={statusHandler}
              required
            >
              <option value=""> Status</option>
              <option value="rent">Rent</option>
              <option value="sale">Sale</option>
            </select>
          </div>
          <div className="p-2">
            <select
              name="category"
              value={category}
              onChange={categoryHandler}
              required
            >
              <option value="">Category</option>
              <option value="apartment" className="text-base">
                Apartment
              </option>
              <option value="house" className="text-base">
                House
              </option>
              <option vlaue="studio" className="text-base">
                Studio
              </option>
              <option value="duplex" className="text-base">
                Duplex
              </option>
              <option value="villa" className="text-base">
                Villa
              </option>
              <option value="chalet" className="text-base">
                Chalet
              </option>
              <option value="office" className="text-base">
                Office
              </option>
              <option value="clinic" className="text-base">
                Clinic
              </option>
              <option value="hospital" className="text-base">
                Hospital
              </option>
              <option value="pharmacy" className="text-base">
                Pharmacy
              </option>
              <option value="mall" className="text-base">
                Mall
              </option>
              <option value="cafe" className="text-base">
                Cafe
              </option>
              <option value="restaurant" className="text-base">
                Restaurant
              </option>
              <option value="hotel" className="text-base">
                Hotel
              </option>
              <option value="shop" className="text-base">
                Shop
              </option>
              <option value="garage" className="text-base">
                Garage
              </option>
              <option value="warehouse" className="text-base">
                Warehouse
              </option>
            </select>
          </div>
          <div className="bg-blue-700 border-2 rounded-lg border-white text-white p-2">
            <button onClick={search}
            className="">search</button>
          </div>
        </div>
        <div className="flex-1">
          <h1 className="text-center bg-slate-500 p-2 text-white text-lg">Search result : {filtered.length}</h1>
          {filtered &&
            filtered.map((unit) => {
              return (
                <div
                  key={unit._id}
                  className="flex w-full bg-blue-500 text-white border-2 border-yellow-50 p-4"
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
                    <div className="flex justify-left">
                      <span className="p-4">
                        {unit.category} for {unit.status}
                      </span>
                      <span className="p-4">{parseFloat(unit.price).toLocaleString("en")} EGP</span>
                    </div>
                    <div>
                      <span className="p-4">{unit.zone} | code:{unit.code}</span>
                    </div>
                    <div>
                      <span className="p-4">
                        {unit.category} | {unit.rooms} rooms | {unit.area} m
                        <sup>2</sup>
                      </span>
                    </div>
                    <div>
                      <span className="p-4">{unit.description}</span>
                    </div>
                    <div>
                      <Link href={`/units/${unit.code}`}><a>view unit details</a></Link>
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

export default List;
