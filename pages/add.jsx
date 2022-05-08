
import { useRouter } from "next/router";
import Layout from "../components/layout";
import { useSession,getSession } from "next-auth/react";

export async function getServerSideProps(context) {
  return {
    props: {
      session: await getSession(context),
    },
  }
}
export default function AddUnitForm() {
  const { data: session } = useSession();
  const router = useRouter();
  //if (typeof window === "undefined") return null;
  if (!session) {
    router.push("/accessDenied");
  }
  

  // Handle the submit event on form submit.
  const handleSubmit = async (event) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault();

    // Get data from the form.
    const data = {
      author:session.user.email,
      status: event.target.status.value,
      category: event.target.category.value,
      type: event.target.type.value,
      zone: event.target.zone.value,
      area: event.target.area.value,
      price: event.target.price.value,
      rooms: event.target.rooms.value,
      location: event.target.location.value,
      address: event.target.address.value,
      owner: event.target.owner.value,
      ownerPhone: event.target.ownerPhone.value,
      description: event.target.description.value,
      media: event.target.media.value,
      createDate: new Date(),
    };
    console.log(typeof data.price);
    const JSONdata = JSON.stringify(data);
    console.log(JSONdata);

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
    console.log(result);
    router.push("/");
  };
  return (
    <Layout>
      <div className="flex m-6">
        <form onSubmit={handleSubmit} >
          <div className="flex flex-col ">
            <div className=" flex-1 flex justify-left">
              <label
                htmlFor="status"
                className="block m-2 text-lg font-medium text-gray-900 "
              >
                For Rent/Sale
              </label>
              <input
                type="text"
                id="status"
                name="status"
                required
                className="block p-2 w-1/3 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="m-2 flex-1 flex justify-left">
              <label
                htmlFor="category"
                className="block m-2 text-lg font-medium text-gray-900 "
              >
                Category
              </label>
              <input
                type="text"
                id="category"
                name="category"
                required
                className="block p-2 w-1/3 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500"
              />
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
                className="block p-2 w-1/3 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="m-2 flex-1 flex justify-left">
              <label
                htmlFor="type"
                className="block m-1 pr-1 text-lg font-medium text-gray-900 "
              >
                Type
              </label>
              <input
                type="text"
                id="type"
                name="type"
                required
                className="block w-1/3 p-2  text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div className="flex">
            <div className="m-2 flex-1 flex justify-left">
              <label
                htmlFor="owner"
                className="block m-1  text-lg font-medium text-gray-900 "
              >
                Owner Name
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
                Owner Phone
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
            <input
              type="text"
              id="zone"
              name="zone"
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/3 p-2 "
            />
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
              type="text"
              id="area"
              name="area"
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/3 p-2 "
            />
            <span><strong>m2</strong></span>
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
              htmlFor="media"
              className="block m-2 text-lg font-medium text-gray-900 "
            >
              Media
            </label>
            <input
              type="text"
              id="media"
              name="media"
              required
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
