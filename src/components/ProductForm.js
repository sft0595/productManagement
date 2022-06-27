import React from "react";
function ProductForm() {
   const [formData, setFormData] = React.useState({
      prodName:"", 
      prodDesc:"",
      prodBrand:"",
   })

   const handleChange = (event) =>{
      setFormData(prevData => {
            return {
               ...prevData, 
               [event.target.name] : event.target.value
            }
         }
      )
   }
   console.log(formData)
   return (
      <div className="w-full flex justify-center justify-items-center">
         <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-6/12">
            <h1 className="text-lg text-gray-700 mb-6 font-semibold">Add New Product</h1>
            <label>Product Name</label>
            <input type="text" 
            placeholder="Product Name"
            name="prodName"
            className="shadow appearance-none border rounded w-full my-2 py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline" 
            value={formData.prodName}
            onChange={handleChange}/>


            <label>Product Description</label>
            <textarea
            placeholder="Product Description" 
            name="prodDesc"
            className="shadow appearance-none border rounded w-full my-2 py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline" 
            value={formData.prodDesc}
            onChange={handleChange}
            />

            <label>Select Brand</label>
            <select 
            name="prodBrand"
            className="shadow appearance-none border rounded w-full my-2 py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline" 
            value={formData.prodBrand}
            onChange={handleChange}
            >
               <option value="">-- Choose Brand --</option>
               <option value="AMD">AMD</option>
               <option value="Intel">Intel</option>
            </select>

            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold my-10 float-right py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">Add list</button>
         </form>
      </div>
   );
 }
export default ProductForm;