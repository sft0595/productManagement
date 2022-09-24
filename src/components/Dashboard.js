import React from "react";
import { NavLink } from "react-router-dom";
import { FaArrowLeft, FaEllipsisV } from "react-icons/fa";
import { Navmenu } from "./Navmenu"
let navOpts = Navmenu()

function Dashboard() {
   const [isCollapse, setIsCollapse] = React.useState(false)

   const handleSubmenu = (event) => {
      event.stopPropagation()
      event.preventDefault()
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


   return (
      <>
         <div className=" bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
            <div className={`${isCollapse ? " w-20" : " w-60"} duration-500 min-h-screen border-r border-r-white`}>
               <button className="bg-none p-2 w-full flex justify-center" onClick={() => setIsCollapse(!isCollapse)}>
                  <FaArrowLeft className={`${isCollapse ? " rotate-180" : ""} duration-500`} />
               </button>

               <ul className="text-center">
                  {navOpts.map((tablist, index) =>
                  (
                     <div key={index}>
                        <NavLink to={tablist.tab} className="block hover:bg-slate-200 dark:hover:bg-slate-600">
                           <li
                              data-target={tablist.tab}
                              className={`p-2 cursor-pointer flex justify-items-center items-baseline  
                              ${isCollapse ? " justify-center" : ""}`}
                              onClick={tablist.subTab ? event => handleSubmenu(event) : () => { }} >
                              {tablist.icon} {isCollapse ? "" : ` ${tablist.tab}`}
                              {!isCollapse ? tablist.subTab ? <FaEllipsisV className=" ml-auto pointer-events-none" /> : "" : ""}
                           </li>
                        </NavLink>
                        {tablist.subTab ? <ul id={tablist.tab} className={isCollapse ? "hidden" : ""} key="ul21">
                           {tablist.subtabList.map((subList, subIdx) =>
                              <NavLink to={""} key={`sublist${subIdx}`} className="block">
                                 <li className="p-2 cursor-pointer items-baseline">{subList.title}</li>
                              </NavLink>
                           )}
                        </ul> : ""}

                     </div>
                  )
                  )}
               </ul>
            </div>
         </div >
      </>
   )
}
export default Dashboard;