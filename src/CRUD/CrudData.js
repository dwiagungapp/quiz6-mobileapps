import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import { GlobalContext } from '../context/GlobalContext';
import { Link } from 'react-router-dom';

const CrudData = () => {
  const { state, handleFunctions } = useContext(GlobalContext);
  const {
    data,
    setData,
    fetchStatus,
    setFetchStatus,
  } = state;

  const {
    handleEdit,
    handleDelete,
  } = handleFunctions;

  const handleText = (text, max) => {
    if(text === null){
      return ""
    } else if (text.length > 10) {
      return text.slice(0, max) + "..."
    } else {
      return text
    }
  }

  useEffect(() => {
    // Fetch data
    if (fetchStatus) {
      axios
        .get('https://backendexample.sanbercloud.com/api/mobile-apps')
        .then((res) => {
          setData([...res.data]);
        })
        .catch((error) => {
          console.error(error);
        });
      setFetchStatus(false);
    }
  }, [fetchStatus, setFetchStatus, setData]);

  return (
    <>
      <div className="px-10 pt-10">
        <button className="text-white bg-[#F05423] hover:bg-[#213053] focus:ring-4 focus:outline-none focus:ring-[#213053] font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
          <Link to="/manage-data/create">Create Data</Link>
        </button>
      </div>
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg m-10">
        <table className="w-full text-sm text-left text-white-500">
          <thead className="text-green-50 uppercase bg-[#F05423]">
            <tr>
              <th scope="col" className="py-3 px-6">
                NO
              </th>
              <th scope="col" className="py-3 px-6">
                NAME
              </th>
              <th scope="col" className="py-3 px-6">
                DESCRIPTION
              </th>
              <th scope="col" className="py-3 px-6">
                CATEGORY
              </th>
              <th scope="col" className="py-3 px-6">
                RELEASE YEAR
              </th>
              <th scope="col" className="py-3 px-6">
                SIZE (MB)
              </th>
              <th scope="col" className="py-3 px-6">
                PRICE
              </th>
              <th scope="col" className="py-3 px-6">
                RATING
              </th>
              <th scope="col" className="py-3 px-6">
                ANDROID APP
              </th>
              <th scope="col" className="py-3 px-6">
                IOS APP
              </th>
              <th scope="col" className="py-3 px-6">
                ACTION
              </th>
            </tr>
          </thead>
          <tbody>
            {data !== null &&
              data.map((app, index) => (
                <tr
                  key={app.id}
                  className="bg-white border-b bg-gray-50 border-gray-200 hover:bg-gray-100 text-gray-600"
                >
                  <td className="py-4 px-6 font-medium text-gray-600 whitespace-nowrap">
                    {index + 1}
                  </td>
                  <td className="py-4 px-6">{app.name}</td>
                  <td className="py-4 px-6">{handleText(app.description, 10) }</td>
                  <td className="py-4 px-6">{app.category}</td>
                  <td className="py-4 px-6">{app.release_year}</td>
                  <td className="py-4 px-6">{app.size} MB</td>
                  <td className="py-4 px-6">Rp {app.price}</td>
                  <td className="py-4 px-6">{app.rating}</td>
                  <td className="py-4 px-6">
                    {app.is_android_app === 1 ? 'Yes' : 'No'}
                  </td>
                  <td className="py-4 px-6">
                    {app.is_ios_app === 1 ? 'Yes' : 'No'}
                  </td>
                  <td className="py-4 px-6">
                  <button
                        onClick={handleEdit}
                        value={app.id}
                        type="button"
                        className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                      >
                        Edit
                      </button>
                    <button
                        onClick={handleDelete}
                        value={app.id}
                        type="button"
                        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                      >
                        Delete
                      </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {data === null && (
        <div className="flex justify-center items-center h-72">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
            <span className="absolute -m-px h-px w-px overflow-hidden whitespace-nowrap border-0 p-0 clip-rect(0, 0, 0, 0)">Loading...</span>
          </div>
        </div>
      )}
    </>
  );
};

export default CrudData;