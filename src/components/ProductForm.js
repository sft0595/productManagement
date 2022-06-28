import React from "react";
function ProductForm() {
   const [featuresData, setFeaturesData] = React.useState([])
   const [formData, setFormData] = React.useState({
      prodName: "",
      prodDesc: "",
      prodBrand: "",
      prodCat: "",
      prodSubcat: "",
      features: "",
   })


   // features input handling and assigning it to formData
   const handleFeatures = (index, event) => {
      const { name, value } = event.target
      const newData = [...featuresData]
      newData[index][name] = value
      setFeaturesData(newData)
      setFormData(prevData => ({ ...prevData, features: featuresData }))
   }

   // assigning form inputs excluding features
   const handleChange = (event) => {
      const { name, value } = event.target
      setFormData(prevData => {
         return {
            ...prevData,
            [name]: value,
         }
      }
      )
   }

   // feature input field adding and removing
   const addFeatureField = () => {
      setFeaturesData([...featuresData, { feature: "", featureDesc: "" }])
   }

   const delFeatureField = (event, index) => {
      event.preventDefault();
      const values = [...featuresData]
      values.splice(index, 1)
      setFeaturesData(values)
   }

   // creating feature field elements
   const featureElems = featuresData.map((oldfields, index) =>
   (
      <div key={index}>
         <input type='text'
            name="feature"
            value={oldfields.feature}
            onChange={event => handleFeatures(index, event)}
            placeholder="Feature" className="shadow appearance-none border rounded w-4/12 my-2 py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline" />

         <input type='text'
            name="featureDesc"
            value={oldfields.featureDesc}
            onChange={event => handleFeatures(index, event)}
            placeholder="Description" className="shadow appearance-none border rounded w-7/12 my-2 py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline" />

         <input
            value="-"
            type="button"
            className="w-1/12 bg-gray-200 hover:bg-gray-300 font-semibold text-gray-500 py-2 px-3 shadow appearance-none border rounded focus:outline-none"
            onClick={event => delFeatureField(event, index)}
         />
      </div>
   )
   )


   // form submission handle
   const handleSubmit = (event) => {
      event.preventDefault();
      console.log(formData)
   }


   return (
      <div className="w-full flex justify-center justify-items-center">
         <form className="bg-white shadow-md rounded px-5 pt-6 pb-8 mb-4 max-w-2xl">
            <h1 className="text-xl text-gray-700 mb-6 font-semibold">Add New Product</h1>
            <label>Product Name</label>
            <input type="text"
               placeholder="Product Name"
               name="prodName"
               className="shadow appearance-none border rounded w-full my-2 py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
               value={formData.prodName}
               onChange={handleChange} />


            <label>Product Description</label>
            <textarea
               placeholder="Product Description"
               name="prodDesc"
               className="shadow appearance-none border rounded w-full my-2 py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
               value={formData.prodDesc}
               onChange={handleChange}
               rows="10"
            />

            <select
               name="prodCat"
               className="w-6/12 shadow appearance-none border rounded my-2 py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
               value={formData.prodCat}
               onChange={handleChange}
            >
               <option value="">-- Choose Category --</option>
               <option value="Apparels">Apparels</option>
               <option value="Accessories">Accessories</option>
               <option value="Electronics">Electronics</option>
               <option value="Computer Components">Computer Components</option>
            </select>

            <select
               name="prodSubcat"
               className="shadow appearance-none border rounded w-6/12 my-2 py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
               value={formData.prodSubcat}
               onChange={handleChange}
            >
               <option value="">-- Choose Category --</option>
               <option value="Apparels">Apparels</option>
               <option value="Accessories">Accessories</option>
               <option value="Electronics">Accessories</option>
               <option value="Computer Components">Accessories</option>
            </select>

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

            {featureElems}
            <button type="button"
               className="block float-left bg-gray-200 hover:bg-gray-300 text-gray-500 text-center py-2 px-3 rounded focus:outline-none focus:shadow-outline cursor-pointer transition duration-150 ease-in-out"
               data-bs-toggle="modal" data-bs-target="#staticBackdrop">
               + New Input
            </button>

            <div className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
               id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1"
               aria-labelledby="staticBackdropLabel" aria-hidden="true">
               <div className="modal-dialog relative w-auto pointer-events-none">
                  <div
                     className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">

                     <div className="modal-body relative flex p-4">
                        <div className="m-2 bg-gray-200 hover:bg-gray-300 text-gray-500 text-center py-2 px-3 rounded focus:outline-none focus:shadow-outline cursor-pointer"
                           data-bs-dismiss="modal"
                           onClick={(event) => addFeatureField(event)}>Feature
                        </div>
                        <div className="m-2 bg-gray-200 hover:bg-gray-300 text-gray-500 text-center py-2 px-3 rounded focus:outline-none focus:shadow-outline cursor-pointer"
                           data-bs-dismiss="modal"
                           onClick={(event) => addFeatureField(event)}>Feature
                        </div>
                     </div>
                     <div
                        className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
                        <button type="button"
                           className="inline-block px-6 py-2.5 bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
                           data-bs-dismiss="modal">Close</button>
                        <button type="button"
                           className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-1">Understood</button>
                     </div>
                  </div>
               </div>
            </div>




            <button className="bg-gray-700 hover:bg-blue-600 text-white font-semibold my-10 float-right py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={event => handleSubmit(event)}>Add to list</button>
         </form >
      </div >
   );
}
export default ProductForm;