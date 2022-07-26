import React from "react";
import { FaHome, FaListAlt, FaPlusSquare, FaChartLine } from "react-icons/fa";
let navOpts = [
   {
      tab: "Home",
      icon: <FaHome className=" mr-2 pointer-events-none" />
   },

   {
      tab: "Graph",
      icon: <FaChartLine className="mr-2 pointer-events-none" />,
      subTab: true,
      subtabList: [
         { title: "Project 1", id: "pr1", active: false },
         { title: "Project 2", id: "pr2", active: false },
         { title: "Project 3", id: "pr3", active: false }
      ]

   },
   {
      tab: "Product List",
      subTab: true,
      subtabList: [
         { title: "Apparel", active: false },
         { title: "Electronics", active: false },
         { title: "Accessories", active: false }
      ],
      icon: <FaListAlt className=" mr-2 pointer-events-none" />,
   },
   {
      tab: "ProductForm",
      icon: <FaPlusSquare className=" mr-2 pointer-events-none" />,
   }
]

export function Navmenu() {
   return navOpts;
}