import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import { GlobalContext } from '../context/GlobalContext';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const CrudForm = () => {
  const { state, handleFunctions } = useContext(GlobalContext);
  const { Id } = useParams();

  const {
    input,
    setInput,
    setCurrentId,
  } = state;

  const {
    handleSubmit,
    handleInput,
    handlePlatformChange,
  } = handleFunctions;

  useEffect(() => {
    if (Id !== undefined) {
      axios
        .get(`https://backendexample.sanbercloud.com/api/mobile-apps/${Id}`)
        .then((res) => {
          let data = res.data;
          setInput({
            name: data.name,
            description: data.description,
            category: data.category,
            release_year: data.release_year,
            size: data.size,
            price: data.price,
            rating: data.rating,
            image_url: data.image_url,
            is_android_app: data.is_android_app,
            is_ios_app: data.is_ios_app,
          });
          setCurrentId(data.id);
        });
    }
  }, [Id, setInput, setCurrentId]);

  return (
    <>
    <div className='flex justify-center items-center bg-[#F05423] m-10 pt-2 rounded-lg'>
    </div>
      <div className="pt-6 px-10 pb-20 bg-white w-auto sm:w-auto md:w-auto border-2 border-[#F05423] m-10 rounded-lg">
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Name
            </label>
            <input
              onChange={handleInput}
              value={input.name}
              name="name"
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#F05423] focus:border-[#F05423] block w-full p-2.5"
              placeholder="Name"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Description
            </label>
            <textarea
              onChange={handleInput}
              value={input.description}
              name="description"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#F05423] focus:border-[#F05423] block w-full p-2.5"
              placeholder="Description"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Category
            </label>
            <input
              onChange={handleInput}
              value={input.category}
              name="category"
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#F05423] focus:border-[#F05423] block w-full p-2.5"
              placeholder="Category"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Release Year
            </label>
            <input
              onChange={handleInput}
              value={input.release_year}
              name="release_year"
              type="number"
              min="2007"
              max="2023"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#F05423] focus:border-[#F05423] block w-full p-2.5"
              placeholder="2007"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Size (MB)
            </label>
            <input
              onChange={handleInput}
              value={input.size}
              name="size"
              type="number"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#F05423] focus:border-[#F05423] block w-full p-2.5"
              placeholder="Size"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Price
            </label>
            <input
              onChange={handleInput}
              value={input.price}
              name="price"
              type="number"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#F05423] focus:border-[#F05423] block w-full p-2.5"
              placeholder="Price"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Rating (0-5)
            </label>
            <input
              onChange={handleInput}
              value={input.rating}
              name="rating"
              type="number"
              min="0"
              max="5"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#F05423] focus:border-[#F05423] block w-full p-2.5"
              placeholder="Rating"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Image URL
            </label>
            <input
              onChange={handleInput}
              value={input.image_url}
              name="image_url"
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#F05423] focus:border-[#F05423] block w-full p-2.5"
              placeholder="Image URL"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Platform
            </label>
            <div className="flex">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="is_android_app"
                  checked={input.is_android_app === 1}
                  onChange={handlePlatformChange}
                  className="form-checkbox text-[#F05423] rounded"
                />
                <span>Android</span>
              </label>
              <label className="flex items-center space-x-2">
                <br/><input
                  type="checkbox"
                  name="is_ios_app"
                  checked={input.is_ios_app === 1}
                  onChange={handlePlatformChange}
                  className="form-checkbox text-[#F05423] rounded"
                />
                <span>iOS</span>
              </label>
            </div>
          </div>
          <button type={'submit'} className="text-white bg-[#F05423] hover:bg-[#213053] focus:ring-4 focus:ring-[#213053] font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">Submit</button>
  <button type="button" className="focus:outline-none text-white bg-[#213053] hover:bg-[#F05423] focus:ring-4 focus:ring-[#F05423] font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"> <Link reloadDocument to="/manage-data"> Back </Link></button>
        </form>
      </div>
    </>
  );
};

export default CrudForm;