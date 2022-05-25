import { useState } from "react";
import Image from "next/image";
import Layout from "../../components/layout";
import Link from "next/link";

function List() {
  //our filtered units state which will obtain the search result
  const [filtered, setFiltered] = useState([]);
  //our search handler which will hit our api for data depends on sent query
  const search = async (event) => {
    event.preventDefault();
    const data = {
      status: event.target.status.value,
      category: event.target.category.value,
    };
    const JSONdata = JSON.stringify(data);
    const response = await fetch("/api/units/search", {
      // Body of the request is the JSON data we created above.
      body: JSONdata,

      // Tell the server we're sending JSON.
      headers: {
        "Content-Type": "application/json",
      },
      // The method is POST because we are sending data.
      method: "POST",
    });
    const result = await response.json();
    setFiltered(result);
  };

  return (
    <Layout>
      <div className="flex-grow h-full bg-blue-500">
        <form onSubmit={search}>
          <div className="flex justify-between  h-40">
            <div className="p-2 ">
              <label className="pr-2 text-white">
                <span>Status</span>
              </label>
              <select id="status" name="status" required
              className="text-white bg-slate-500">
                <option value=""> .........</option>
                <option value="Rent">Rent</option>
                <option value="Sale">Sale</option>
              </select>
            </div>
            <div className="p-2">
              <label className="pr-2 text-white">
                <span>Category</span>
              </label>
              <select id="category" name="category" required
              className="text-white bg-slate-500">
                <option value="">..........</option>
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
            <div>
              <button
                type="submit"
                className=" border-2 rounded-lg border-white text-white p-2 hover:bg-slate-500"
              >
                search
              </button>
            </div>
          </div>
        </form>
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
                      src={unit.media[0]}
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

export default List;
