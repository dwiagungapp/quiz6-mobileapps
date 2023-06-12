import React, { useContext, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import axios from 'axios';

const Card = () => {
  const { state, handleFunctions } = useContext(GlobalContext);

  const { data, setData, fetchStatus, setFetchStatus } = state;

  const {
    convertSize,
    formatRupiah,
    renderStars,
    handleText,
  } = handleFunctions;

  useEffect(() => {
    if (fetchStatus === true) {
      axios
        .get('https://backendexample.sanbercloud.com/api/mobile-apps')
        .then((res) => {
          setData(res.data);
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setFetchStatus(false);
        });
    }
  }, [fetchStatus, setFetchStatus, setData]);

  return (
    <>
     <div className="p-2 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 gap-5 ">
     {data !== null &&
        data.map((app, index) => (
          <div key={app.id} className=" flex flex-col rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] md:max-w-xl md:flex-row ">
          <img
    className="h-96 w-full rounded-t-lg object-cover md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
    src={app.image_url}
    alt={app.name} />
          
          <div className="bg-white w-full rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal ">
            <div className="mb-8">
              <p className="text-sm text-gray-600 flex items-center">
  <svg className="fill-current text-gray-500 w-3 h-3 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
  <path fill="#000000" fillRule="evenodd" d="M107,154.006845 C107,153.45078 107.449949,153 108.006845,153 L119.993155,153 C120.54922,153 121,153.449949 121,154.006845 L121,165.993155 C121,166.54922 120.550051,167 119.993155,167 L108.006845,167 C107.45078,167 107,166.550051 107,165.993155 L107,154.006845 Z M108,157 L120,157 L120,166 L108,166 L108,157 Z M116.5,163.5 L116.5,159.5 L115.757485,159.5 L114.5,160.765367 L114.98503,161.275112 L115.649701,160.597451 L115.649701,163.5 L116.5,163.5 Z M112.5,163.5 C113.412548,163.5 114,163.029753 114,162.362119 C114,161.781567 113.498099,161.473875 113.110266,161.433237 C113.532319,161.357765 113.942966,161.038462 113.942966,160.550798 C113.942966,159.906386 113.395437,159.5 112.505703,159.5 C111.838403,159.5 111.359316,159.761248 111.051331,160.115385 L111.456274,160.632075 C111.724335,160.370827 112.055133,160.231495 112.425856,160.231495 C112.819392,160.231495 113.13308,160.382438 113.13308,160.690131 C113.13308,160.974601 112.847909,161.102322 112.425856,161.102322 C112.28327,161.102322 112.020913,161.102322 111.952471,161.096517 L111.952471,161.839623 C112.009506,161.833817 112.26616,161.828012 112.425856,161.828012 C112.956274,161.828012 113.190114,161.967344 113.190114,162.275036 C113.190114,162.565312 112.93346,162.768505 112.471483,162.768505 C112.10076,162.768505 111.684411,162.605951 111.427757,162.327286 L111,162.87881 C111.279468,163.227141 111.804183,163.5 112.5,163.5 Z M110,152.5 C110,152.223858 110.214035,152 110.504684,152 L111.495316,152 C111.774045,152 112,152.231934 112,152.5 L112,153 L110,153 L110,152.5 Z M116,152.5 C116,152.223858 116.214035,152 116.504684,152 L117.495316,152 C117.774045,152 118,152.231934 118,152.5 L118,153 L116,153 L116,152.5 Z" transform="translate(-107 -152)"/>
                </svg>
                {app.release_year}
              </p>
              <div className="text-gray-900 font-bold text-xl mb-2">{app.name}</div>
              <p className="text-xs text-neutral-500 mb-5">
    <span>Category: {app.category}, </span>
                <span>Size: {convertSize(app.size)}</span>
                <span>, {app.is_android_app === 1 ? 'Android' : ''} </span>
                <span>{app.is_ios_app === 1 ? ' iOS' : ''}</span>
    </p>
              <p className="text-gray-700 text-base">{handleText(app.description, 150)}</p>
            </div>
    <div className="flex items-center justify-between">
    {app.price !== 0 ? (
             <h1 className="text-gray-700 font-bold text-xl">Rp{formatRupiah(app?.price + '')}</h1>
                ) : (
            <h1 className="text-gray-700 font-bold text-xl">Free</h1>
                )}
              <div className="flex items-center border-2 border-gray-800 bg-gray-800">
                  <span className="mr-1 text-yellow-500">Rating {renderStars(app.rating)}</span>
                </div>
            </div>
          </div>
        </div>        

))}
    {data === null && (
        <div className="flex justify-center items-center h-72">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
            <span className="absolute -m-px h-px w-px overflow-hidden whitespace-nowrap border-0 p-0 clip-rect(0, 0, 0, 0)">Loading...</span>
          </div>
        </div>
      )}
</div>
</>
  );
};

export default Card;