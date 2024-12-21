import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { use } from "react";

const App = () => {
  const [storedData, setStoredData] = useState([]);
  const [cart, setCart] = useState([]);
  const [cartVisibility, setcartVisibility] = useState(false)



  const getData = async () => {
    const response = await axios.get("https://fakestoreapi.com/products");
    setStoredData(response.data);
  };


  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  useEffect(() => {
    getData();
  }, []);

  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const visibility = () => {
    setcartVisibility(!cartVisibility)
  }




  return (
    <div className="w-full h-screen bg-white">
      <nav className="flex justify-between items-center w-full h-20 text-white px-4 bg-slate-800 shadow-md shadow-black">
        <h1 className="md:text-3xl  font-semibold">SHOPEEZ</h1>
        <div className="md:display-initial hidden md:flex gap-[80px]">
          <a href="#">Home</a>
          <a href="#">Products</a>
          <a href="#">About</a>
          <a href="#">Contact</a>
        </div>
        <button onClick={visibility} className="bg-slate-600 text-white px-10 py-2 rounded-xl">
          CART
        </button>
      </nav>
      <h1 className="text-[10px] font-semibold mt-4 text-center md:hidden  text-red-700 animate-pulse ">*Click on Cart And Scroll Down to View Your Cart</h1>
      <div className="md:flex md:flex-row flex-col">
        <div className="flex flex-wrap justify-center md:gap-10 gap-2">
          {storedData.map((item) => (
            <div
              key={item.id}
              className="shad flex flex-col justify-center md:w-[300px] w-[200px] bg-white mt-6"
            >
              <img
                className="md:w-[200px] md:h-[200px] w-[100px] h-[100px]  object-contain mx-auto"
                src={item.image}
                alt={item.title}
              />
              <h1 className="text-[13px] font-semilight mt-3 ml-2">{item.title}</h1>
              <h1 className="text-[20px] font-semibold mt-3 ml-2">${item.price}</h1>
              <button
                onClick={() => addToCart(item)} 
                className="bg-black w-full text-white px-4 py-2 rounded my-5 hover:bg-slate-200 hover:text-black transition-all ease-in-out"
              >
                ADD TO CART
              </button>
            </div>
          ))}
        </div>

        {cartVisibility && (
          <div className="shadow-lg bg-white md:w-[1500px] p-4 mt-6">
            <h2 className="text-xl text-center font-semibold mb-4">Your Cart</h2>
            {cart.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              cart.map((item, index) => (
                <div key={index} className="flex justify-between mb-2 p-2 border-b">
                  <div className="flex flex-col">
                    <h3 className="text-md font-medium">{item.title}</h3>
                    <p className="text-sm text-gray-500">${item.price}</p>
                    <button
                      onClick={() => removeFromCart(index)}
                      className="bg-black text-white text-[7px] py-2 mt-2 w-[40px] rounded-xl hover:bg-slate-600 hover:text-white transition-all ease-in-out"
                    >
                      Remove
                    </button>
                  </div>
                  <img className="w-[50px] h-[50px] object-contain" src={item.image} alt={item.title} />
                </div>
              ))
            )}

            {cart.length > 0 && (
              <button className="bg-black w-full text-white px-4 py-2 rounded-xl hover:bg-slate-800 hover:text-white transition-all ease-in-out">
                CHECKOUT ${cart.reduce((total, item) => total + item.price, 0)}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
