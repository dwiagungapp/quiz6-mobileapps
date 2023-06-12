import React from "react";
import Card from "./Card";

const Home = () => {
    return (
      <section className="bg-gray-200 p-5 pb-20">
        <div className="container mx-auto mt-6 mb-10 bg-white p-10 rounded-lg">
          <h1 className="text-xl font-bold ">Find your data that you need!</h1>
        </div>

        <Card/>
      </section>
    );
  };

  export default Home