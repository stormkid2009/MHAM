import { useRouter } from "next/router";
import Layout from "../../../components/layout";
import { useSession, getSession } from "next-auth/react";




export default function AddUnitForm() {
  //securing page client side
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <p>Loading...</p>;
  }
  if (status === "unauthenticated") {
    router.push("/accessDenied");
  }

  // Handle the submit event on form submit.
  const handleSubmit = async (event) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault();
    const pictures = [
      event.target.img1.value,
      event.target.img2.value,
      event.target.img3.value,
      event.target.img4.value
    ];
    let images = pictures.map((image)=>{
      return image.replace(/open/g, "uc");
    });
    // Get data from the form.
    const data = {
      author: session.user.email,
      code: "MH" + Date.now(),
      status: event.target.status.value,
      category: event.target.category.value,
      type: event.target.type.value,
      zone: event.target.zone.value,
      area: parseInt(event.target.area.value),
      price: parseInt(event.target.price.value),
      rooms: parseInt(event.target.rooms.value),
      location: event.target.location.value,
      address: event.target.address.value,
      owner: event.target.owner.value,
      ownerPhone: event.target.ownerPhone.value,
      description: event.target.description.value,
      media: images,
      createDate: new Date(),
    };
    
    const JSONdata = JSON.stringify(data);
    
    // Send the form data to our API and get a response.
    const response = await fetch("/api/units/add", {
      // Body of the request is the JSON data we created above.
      body: JSONdata,

      // Tell the server we're sending JSON.
      headers: {
        "Content-Type": "application/json",
      },
      // The method is POST because we are sending data.
      method: "POST",
    });

    // Get the response data from server as JSON.
    // If server returns the name submitted, that means the form works.
    const result = await response.json();
    //alert(`Are you sure to create this unit : ${result.data}`)
    //console.log(result);
    router.push("/");
  };
  return (
    <Layout>
      <div className="flex m-4">
        <form onSubmit={handleSubmit} className="w-full my-6">
          <div className="flex text-lg">
            <div className=" flex-1 flex justify-left ">
              <label
                htmlFor="status"
                className="block m-2  font-medium text-gray-900 "
              >
                Status
              </label>
              <select
                id="status"
                name="status"
                required
                className="block p-2 w-1/3  text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="" className="text-base">
                  .........
                </option>
                <option value="Sale" className="text-base">
                  Sale
                </option>
                <option value="Rent" className="text-base">
                  Rent
                </option>
              </select>
            </div>
            <div className=" flex-1 flex justify-left">
              <label
                htmlFor="category"
                className="block m-2 text-lg font-medium text-gray-900 "
              >
                Category
              </label>
              <select
                id="category"
                name="category"
                required
                className="block p-2 w-1/3  text-black bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="" className="text-base">
                  ........
                </option>
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
          </div>

          <div className="flex">
            <div className="m-2 flex-1 flex justify-left">
              <label
                htmlFor="price"
                className="block m-1 pr-1 text-lg font-medium text-gray-900 "
              >
                Price
              </label>
              <input
                type="number"
                id="price"
                name="price"
                required
                className="block p-2 w-2/3 text-black bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500"
              />
              <span>EGP</span>
            </div>
            <div className="m-2 flex-1 flex justify-left">
              <label
                htmlFor="type"
                className="block m-1 pr-1 text-lg font-medium text-gray-900 "
              >
                Type
              </label>
              <select
                id="type"
                name="type"
                required
                className="block w-2/3 p-2   text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="" className="text-base">
                  ...............
                </option>

                <option value="Administrative" className="text-base">
                  Administrative
                </option>
                <option value="Commercial" className="text-base">
                  Commercial
                </option>
                <option value="Medical" className="text-base">
                  Medical
                </option>
                <option value="Residential" className="text-base">
                  Residential
                </option>
              </select>
            </div>
          </div>
          <div className="flex">
            <div className="m-2 flex-1 flex justify-left">
              <label
                htmlFor="owner"
                className="block m-1  text-md font-medium text-gray-900 "
              >
                Name
              </label>
              <input
                type="text"
                id="owner"
                name="owner"
                required
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3  "
              />
            </div>
            <div className="m-2 flex-1 flex justify-left">
              <label
                htmlFor="ownerPhone"
                className="block m-1 pr-1 text-lg font-medium text-gray-900 dark:text-gray-300"
              >
                Phone
              </label>
              <input
                type="text"
                id="ownerPhone"
                name="ownerPhone"
                required
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3  "
              />
            </div>
          </div>
          <div className="m-2 flex-1 flex justify-left">
            <label
              htmlFor="zone"
              className="block m-1 pr-1 text-lg font-medium text-gray-900 "
            >
              Zone
            </label>
            {/* <input
              type="text"
              id="zone"
              name="zone"
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2 "
            /> */}
            <select
              id="zone"
              name="zone"
              required
              className="block w-2/3 p-2   text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">...........</option>
              <option value="6 October" className="text-base">
                6 October
              </option>
              <option value="Agouza" className="text-base">
                Agouza
              </option>
              <option value="Dokki" className="text-base">
                Dokki
              </option>
              <option value="El Sherouk" className="text-base">
                El Sherouk
              </option>
              <option value="Helwan" className="text-base">
                Helwan
              </option>
              <option value="Maadi" className="text-base">
                Maadi
              </option>
              <option value="Madinty" className="text-base">
                Madinty
              </option>
              <option value="Mohandessin" className="text-base">
                Mohandessin
              </option>
              <option value="Nasr City" className="text-base">
                Nasr City
              </option>
              <option value="New Capital" className="text-base">
                New Capital
              </option>
              <option value="Sheikh Zayed City" className="text-base">
                Sheikh Zayed City
              </option>
              <option value="The 5th Settlement" className="text-base">
                The 5th Settlement
              </option>
              <option value="Zamalek" className="text-base">
                Zamalek
              </option>
              <option value="Other" className="text-base">
                Other
              </option>
            </select>
          </div>
          <div className="flex">
            <div className="m-2 flex-1 flex justify-left">
              <label
                htmlFor="area"
                className="block m-1  text-lg font-medium text-gray-900 dark:text-gray-300"
              >
                Area
              </label>
              <input
                type="number"
                id="area"
                name="area"
                required
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/3 p-2 "
              />
              <span>
                <strong>
                  m<sup>2</sup>
                </strong>
              </span>
            </div>
            <div className="m-2 flex-1 flex justify-left">
              <label
                htmlFor="rooms"
                className="block m-1 pr-1 text-lg font-medium text-gray-900 dark:text-gray-300"
              >
                Rooms
              </label>
              <input
                type="number"
                id="rooms"
                name="rooms"
                required
                className="block p-2 w-1/3 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="m-2 flex justify-left">
            <label
              htmlFor="description"
              className="block m-2 text-lg font-medium text-gray-900 dark:text-gray-300"
            >
              Description
            </label>
            <input
              type="text"
              id="description"
              name="description"
              required
              className="block p-4 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="m-2 flex justify-left">
            <label
              htmlFor="address"
              className="block m-2 text-lg font-medium text-gray-900 dark:text-gray-300"
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              required
              className="block p-4 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="m-2 flex justify-left">
            <label
              htmlFor="location"
              className="block m-2 text-lg font-medium text-gray-900 "
            >
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>
          <div className="m-2 flex justify-left">
            <label
              htmlFor="img1"
              className="block m-2 text-lg font-medium text-gray-900 "
            >
              Image
            </label>
            <input
              type="text"
              id="img1"
              name="img1"
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>
          <div className="m-2 flex justify-left">
            <label
              htmlFor="img2"
              className="block m-2 text-lg font-medium text-gray-900 "
            >
              Image
            </label>
            <input
              type="text"
              id="img2"
              name="img2"
              
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>
          <div className="m-2 flex justify-left">
            <label
              htmlFor="img3"
              className="block m-2 text-lg font-medium text-gray-900 "
            >
              Image
            </label>
            <input
              type="text"
              id="img3"
              name="img3"
              
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>
          <div className="m-2 flex justify-left">
            <label
              htmlFor="img4"
              className="block m-2 text-lg font-medium text-gray-900 "
            >
              Image
            </label>
            <input
              type="text"
              id="img4"
              name="img4"
              
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>
          <div className="m-2 text-center">
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
