import React from "react";
import Home from "./Home";
import Graph from "./Graph";
import ProductList from "./ProductList";
import ProductForm from "./ProductForm";
import { FaHome, FaListAlt, FaPlusSquare } from "react-icons/fa";


function Dashboard() {

   const [isHome, setIsHome] = React.useState(true)
   const [isGraph, setIsGraph] = React.useState(false)
   const [isProductList, setIsProductlist] = React.useState(false)
   const [isProductForm, setIsProductForm] = React.useState(false)
   const [isCollapse, setIsCollapse] = React.useState(false)

   const toggleHome = () => {
      setIsHome(true)
      setIsGraph(false)
      setIsProductlist(false)
      setIsProductForm(false)
   }

   const toggleGraph = () => {
      setIsHome(false)
      setIsGraph(true)
      setIsProductlist(false)
      setIsProductForm(false)
   }

   const toggleProductList = () => {
      setIsHome(false)
      setIsGraph(false)
      setIsProductlist(true)
      setIsProductForm(false)
   }

   const toggleNewProduct = () => {
      setIsHome(false)
      setIsGraph(false)
      setIsProductlist(false)
      setIsProductForm(true)
   }

   const navOpts = [
      {
         tab: "Home",
         active: isHome,
         toggler: toggleHome,
         icon: <FaHome />
      },
      {
         tab: "Graph",
         active: isGraph,
         toggler: toggleGraph,
         icon: <FaListAlt />,
         subTab: true,
         subtabList: {
            opt1: "option 1",
            opt2: "option 2",
            opt3: "option 3"
         }
      },
      {
         tab: "Product List",
         active: isProductList,
         toggler: toggleProductList,
         icon: <FaListAlt />,
      },
      {
         tab: "Add Product",
         active: isProductForm,
         toggler: toggleNewProduct,
         icon: <FaPlusSquare />,
      }
   ]

   return (
      <div className="w-full flex">
         <div className={`${isCollapse ? " w-20" : "w-60"} duration-500 min-h-screen bg-slate-100  border-r-2 border-r-white overflow-hidden`}>
            <button className={` bg-none p-2 w-full ${isCollapse ? "rotate-180" : ""} duration-500`} onClick={() => setIsCollapse(!isCollapse)}>←</button>
            <ul className="text-center">
               {/* <li className={` ${isHome ? "bg-slate-200" : "bg-slate-100 hover:bg-slate-200"} p-2 cursor-pointer`} onClick={e => toggleHome(e)}>
                  <FaHome /><span>Home</span>
               </li>
               <li className={` ${isGraph ? "bg-slate-200" : "bg-slate-100 hover:bg-slate-200"} p-2 cursor-pointer`} onClick={e => toggleGraph(e)}>
                  <FaListAlt /><span>Graph</span>
               </li>
               <li className={` ${isProductList ? "bg-slate-200" : "bg-slate-100 hover:bg-slate-200"} p-2 cursor-pointer`} onClick={e => toggleProductList(e)}>
                  <FaListAlt /><span>Product List</span>
               </li>
               <li className={` ${isProductForm ? "bg-slate-200" : "bg-slate-100 hover:bg-slate-200"} p-2 cursor-pointer`} onClick={e => toggleNewProduct(e)}>
                  <FaPlusSquare /><span>Add Product</span>
               </li> */
               }
               {navOpts.map((tablist, index) =>
               (<li key={index} className={`${tablist.active ? "bg-slate-200" : "bg-slate-100 hover:bg-slate-200"} 
               p-3 cursor-pointer flex align-middle w-full ${isCollapse ? " justify-center" : ""}`}
                  onClick={tablist.toggler}><span>{tablist.icon}</span><span className=" mx-1.5">{isCollapse ? "" : tablist.tab}</span></li>)
               )}
            </ul>
         </div>

         <div className="w-full bg-slate-100">
            <div className="bg-slate-200 w-full flex justify-between items-center">
               <div className="p-2">
                  <input name="siteSearch" className="outline-none px-3 py-1 rounded-full" placeholder="search the site" />
               </div>
               <div className="p-2 flex items-center">
                  <div className="m-2 w-10 h-10 rounded-full bg-slate-500"></div>
                  <p>username</p>
                  <a href="#dropDown" className="p-4">↓</a>
               </div>
            </div>
            <div className="p-12">
               {isHome ? <Home /> : isGraph ? <Graph /> : isProductList ? <ProductList /> : isProductForm ? <ProductForm /> : ""}
            </div>
         </div>
      </div >
   )
}
export default Dashboard;