import React from "react";
import Home from "./Home";
import Graph from "./Graph";
import ProductList from "./ProductList";
import ProductForm from "./ProductForm";
import { FaHome, FaListAlt, FaPlusSquare, FaArrowLeft, FaChartLine, FaArrowDown, FaEllipsisV } from "react-icons/fa";


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

   const toggleActive = (event, idx) => {
      const elemId = event.target.id
      const elem = document.getElementById(elemId).parentElement.id
      const allList = document.getElementById(elem).getElementsByTagName('li');

      for (let i = 0; i < allList.length; i++) {
         const clickedElemId = allList[i].id
         allList[i].classList.remove("font-semibold")
         if (clickedElemId === elemId) {
            allList[i].classList.add("font-semibold")
         }
      }
   }

   const handleSubmenu = (event) => {
      event.stopPropagation()
      const id = event.target.getAttribute("data-target")
      const submenu = document.getElementById(id)
      if (isCollapse) {
         setIsCollapse(!isCollapse)
         submenu.classList.remove('hidden')
      } else {
         if (submenu.classList.contains('hidden'))
            submenu.classList.remove('hidden')
         else submenu.classList.add('hidden')
      }
   }


   const navOpts = [
      {
         tab: "Home",
         active: isHome,
         toggler: toggleHome,
         icon: <FaHome className=" mr-2 pointer-events-none" />
      },
      {
         tab: "Graph",
         active: isGraph,
         icon: <FaChartLine className="mr-2 pointer-events-none" />,
         subTab: true,
         subtabList: [
            { title: "Project 1", active: false },
            { title: "Project 2", active: false },
            { title: "Project 3", active: false }
         ]

      },
      {
         tab: "Product List",
         active: isProductList,
         subTab: true,
         subtabList: [
            { title: "Apparel", active: false },
            { title: "Electronics", active: false },
            { title: "Accessories", active: false }
         ],
         icon: <FaListAlt className=" mr-2 pointer-events-none" />,
      },
      {
         tab: "Add Product",
         active: isProductForm,
         toggler: toggleNewProduct,
         icon: <FaPlusSquare className=" mr-2 pointer-events-none" />,
      }
   ]

   return (
      <div className="w-full flex bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
         <div className={`${isCollapse ? " w-20" : " w-60"} duration-500 min-h-screen bg-slate-100 dark:bg-slate-800 border-r border-r-white`}>
            <button className="bg-none p-2 w-full flex justify-center" onClick={() => setIsCollapse(!isCollapse)}>
               <FaArrowLeft className={`${isCollapse ? " rotate-180" : ""} duration-500`} />
            </button>
            {navOpts.map((tablist, index) =>
            (
               <ul className="text-center" key={index}>
                  <li data-target={tablist.tab} className={`${tablist.active ? "bg-slate-200 dark:bg-slate-600" : "bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-600"} p-2 cursor-pointer flex justify-items-center items-baseline  ${isCollapse ? " justify-center" : ""}`}
                     onClick={tablist.subTab ? event => handleSubmenu(event) : tablist.toggler} >
                     {tablist.icon} {isCollapse ? "" : ` ${tablist.tab}`}
                     {!isCollapse ? tablist.subTab ? <FaEllipsisV className=" ml-auto pointer-events-none" /> : "" : ""}
                  </li>
                  <ul id={tablist.tab} className="block">
                     {tablist.subTab && !isCollapse ? tablist.subtabList.map((sublist, idx) => (
                        <li key={idx}
                           id={sublist.title}
                           className="bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-600 p-2 cursor-pointer align-middle w-full"
                           onClick={(event) => toggleActive(event, index)}>{sublist.title}</li>)) : ""}
                  </ul>
               </ul>
            )
            )}
         </div>

         <div className="w-full">
            <div className="w-full flex justify-between items-center bg-slate-200 dark:bg-slate-600">
               <div className="p-2">
                  <input name="siteSearch" className="outline-none px-3 py-1 rounded-full" placeholder="search the site" />
               </div>
               <div className="p-2 flex items-center">
                  <div className="m-2 w-10 h-10 rounded-full"></div>
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