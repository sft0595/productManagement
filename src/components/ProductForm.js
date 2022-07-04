import React from "react";
function ProductForm() {
   const [featuresData, setFeaturesData] = React.useState([])
   const [sizesData, setSizesData] = React.useState([])
   const [isSize, setIsSize] = React.useState(false)
   const [vendorData, setVendorData] = React.useState([])
   const [isQuantity, setIsQuantity] = React.useState(false)
   const [isColor, setIsColor] = React.useState(false)
   const [isFeature, setIsFeature] = React.useState(false)
   const [isVendor, setIsVendor] = React.useState(false)

   const [formData, setFormData] = React.useState({
      prodName: "",
      prodDesc: "",
      prodBrand: "",
      prodCat: "",
      prodSubcat: "",
      features: "",
      sizes: [],
      vendorDetails: "",
      quantityScale: "",
      totalQuantity: "",
      costPrice: "",
      sellPrice: ""
   })

   const sizeOptions = [
      {
         label: "-- Add Size -- ",
         value: "",
      },
      {
         label: "XXL",
         value: "xxl",
      },
      {
         label: "XL",
         value: "xl",
      },
      {
         label: "L",
         value: "l",
      },
      {
         label: "M",
         value: "m",
      },
      {
         label: "S",
         value: "s",
      },
   ];

   const quantityScale = [
      {
         label: "Peices",
         value: "peice",
      },
      {
         label: "Boxes",
         value: "box",
      },
      {
         label: "Dozens",
         value: "dozen",
      },
   ];

   //addinf input fields
   const handleSizeInput = (event) => {
      setIsSize(!isSize)
      setSizesData([])
   }

   const handleQuantityInput = (event) => {
      setIsQuantity(!isQuantity)
      setSizesData([])
   }

   const handleColorInput = (event) => {
      setIsColor(!isColor)
      setSizesData([])
   }

   const handleFeatureInput = (event) => {
      setIsFeature(!isFeature)
      setFeaturesData([])
   }

   const handleVendorInput = () => {
      setIsVendor(!isVendor)
      setVendorData([])
   }

   // features input handling and assigning it to formData
   const handleFeaturesChange = (index, event) => {
      const { name, value } = event.target
      const newData = [...featuresData]
      newData[index][name] = value
      setFeaturesData(newData)
      setFormData(prevData => ({ ...prevData, features: featuresData }))
   }

   // sizes input handling and assigning it to formData
   const handleSizesChange = (index, event) => {
      const { name, value } = event.target
      const newData = [...sizesData]
      newData[index][name] = value
      setSizesData(newData)
      setFormData(prevData => ({ ...prevData, sizes: sizesData }))
   }


   // vendor input handling and assigning it to formData
   const handleVendorChange = (index, event) => {
      const { name, value } = event.target
      const newData = [...vendorData]
      newData[index][name] = value
      setIsVendor(newData)
      setFormData(prevData => ({ ...prevData, vendorDetails: vendorData }))
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



   const customInputs = () => {
      if (!isSize && isQuantity && isColor) {
         if (sizesData.length !== 0) {
            if (sizesData.map(prevData => 'sizeNumber' in prevData && 'sizeColor' in prevData))
               setSizesData(sizesData.map(prevData => prevData))
         } else {
            setSizesData([...sizesData, { sizeNumber: "", sizeColor: "" }])
         }
      }
      else if (!isQuantity && isSize && isColor) {
         if (sizesData.length !== 0) {
            if (sizesData.map(prevData => 'sizeLabel' in prevData && 'sizeColor' in prevData))
               setSizesData(sizesData.map(prevData => prevData))
         } else {
            setSizesData([...sizesData, { sizeLabel: "", sizeColor: "" }])
         }
      }
      else if (!isColor && isSize && isQuantity) {
         if (sizesData.length !== 0) {
            if (sizesData.map(prevData => 'sizeLabel' in prevData && 'sizeNumber' in prevData))
               setSizesData(sizesData.map(prevData => prevData))
         } else {
            setSizesData([...sizesData, { sizeLabel: "", sizeNumber: "" }])
         }
      }
      else if (isSize && isQuantity && isColor) {
         if (sizesData.length !== 0) {
            setSizesData(sizesData.map(prevData => prevData))
         } else {
            setSizesData([...sizesData, { sizeLabel: "", sizeNumber: "", sizeColor: "" }])
         }
      } else {
         setSizesData([])
      }

      if (isFeature) {
         if (featuresData.length !== 0) {
            setFeaturesData(featuresData.map(prevData => prevData))
         } else {
            setFeaturesData([...featuresData, { feature: "", featureDesc: "" }])
         }
      } else {
         setFeaturesData([])
      }

      if (isVendor) {
         if (vendorData.length !== 0) {
            setVendorData(vendorData.map(prevData => prevData))
         } else {
            setVendorData([...vendorData, { vendorName: "", vendorContact: "", vendorLocation: "" }])
         }
      } else {
         setVendorData([])
      }
   }




   // feature field increment
   const addFeatureField = () => {
      if (isFeature)
         setFeaturesData([...featuresData, { feature: "", featureDesc: "" }])
      else
         setFeaturesData([])
   }
   // size, quantity, color field increment 
   const addSizeField = () => {
      if (!isSize && isQuantity && isColor) {
         setSizesData([...sizesData, { sizeNumber: "", sizeColor: "" }])
      }
      else if (!isQuantity && isSize && isColor) {
         setSizesData([...sizesData, { sizeLabel: "", sizeColor: "" }])
      }
      else if (!isColor && isSize && isQuantity) {
         setSizesData([...sizesData, { sizeLabel: "", sizeNumber: "" }])
      }
      else if (isSize && isQuantity && isColor) {
         setSizesData([...sizesData, { sizeLabel: "", sizeNumber: "", sizeColor: "" }])
      } else {
         setSizesData([])
      }
   }

   const delFeatureField = (event, index) => {
      event.preventDefault();
      const values = [...featuresData]
      values.splice(index, 1)
      setFeaturesData(values)
      setFormData(prevData => ({ ...prevData, features: values }))
   }

   const delSizeField = (event, index) => {
      event.preventDefault();
      const values = [...sizesData]
      values.splice(index, 1)
      setSizesData(values)
      setFormData(prevData => ({ ...prevData, sizes: values }))

   }

   // creating feature field elements
   const featureElems = featuresData.map((oldfields, index) =>
   (
      <div key={index}>
         <input type='text'
            name="feature"
            value={oldfields.feature}
            onChange={event => handleFeaturesChange(index, event)}
            placeholder="Feature" className="shadow appearance-none border rounded w-4/12 mb-2 py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline" />

         <input type='text'
            name="featureDesc"
            value={oldfields.featureDesc}
            onChange={event => handleFeaturesChange(index, event)}
            placeholder="Description" className="shadow appearance-none border rounded w-7/12 mb-2 py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline" />

         <input
            value="-"
            type="button"
            className="w-1/12 bg-gray-100 hover:bg-gray-300 text-gray-500 py-2 px-3 shadow appearance-none border rounded focus:outline-none"
            onClick={event => delFeatureField(event, index)}
         />
      </div>
   )
   )


   // creating size field elements
   const sizeElems = sizesData.map((oldsizes, index) =>
   (
      <div key={index}>
         {isSize ? <select
            name="sizeLabel"
            className="w-3/12 shadow appearance-none border rounded mb-2 py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
            value={oldsizes.sizeLabel}
            onChange={event => handleSizesChange(index, event)}
         >

            {sizeOptions.map((option, index) => (
               <option value={option.value} key={index} disabled={formData.sizes.map(x => x.sizeLabel).includes(option.value)}>{option.label}</option>
            ))}
         </select> : ""}

         {isQuantity ? <input type='text'
            name="sizeNumber"
            value={oldsizes.sizeNumber}
            onChange={event => handleSizesChange(index, event)}
            placeholder="Quantity" className="shadow appearance-none border rounded w-4/12 mb-2 py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline" /> : ""}

         {isColor ? <input type='text'
            name="sizeColor"
            value={oldsizes.sizeColor}
            onChange={event => handleSizesChange(index, event)}
            placeholder="Color" className="shadow appearance-none border rounded w-4/12 mb-2 py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline" /> : ""}
         <input
            value="-"
            type="button"
            className="w-1/12 bg-gray-100 hover:bg-gray-300 text-gray-500 py-2 px-3 shadow appearance-none border rounded focus:outline-none"
            onClick={event => delSizeField(event, index)}
         />
      </div >
   )
   )

   // creating feature field elements
   const vendorElems = vendorData.map((oldfields, index) =>
   (
      <div key={index}>
         <input type='text'
            name="vendorName"
            value={oldfields.vendorName}
            onChange={event => handleVendorChange(index, event)}
            placeholder="Vendor Name" className="shadow appearance-none border rounded w-6/12 mb-2 py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline" />
         <input type='text'
            name="vendorContact"
            value={oldfields.vendorContact}
            onChange={event => handleVendorChange(index, event)}
            placeholder="Vendor Contact" className="shadow appearance-none border rounded w-6/12 mb-2 py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline" />
         <input type='text'
            name="vendorLocation"
            value={oldfields.vendorLocation}
            onChange={event => handleVendorChange(index, event)}
            placeholder="Vendor Location" className="shadow appearance-none border rounded w-full mb-2 py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline" />
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
         <form className="bg-white shadow-md rounded px-5 py-6 mb-4 max-w-2xl">
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
               <option value="Dastoor">Dastoor</option>
            </select>

            {featureElems.length > 0 && <fieldset className="mt-5 py-4 border-b-2 border-gray-100">
               <legend>Product Feature</legend>
               {featureElems}
               <input
                  value="Add More"
                  type="button"
                  className="float-right text-sm bg-gray-100 hover:bg-gray-300 text-gray-500 py-2 px-3 shadow appearance-none border rounded focus:outline-none"
                  onClick={(event) => addFeatureField(event)}
               />
            </fieldset>}

            {sizeElems.length > 0 &&
               <fieldset className="mt-5 py-4 border-b-2 border-gray-100">
                  <legend>Product {isSize ? "Sizes |" : ""} {isQuantity ? "Quantities |" : ""} {isColor ? "Colors |" : ""}</legend>
                  {sizeElems}
                  <input
                     value="Add More"
                     type="button"
                     className="float-right text-sm bg-gray-100 hover:bg-gray-300 text-gray-500 py-2 px-3 shadow appearance-none border rounded focus:outline-none"
                     onClick={(event) => addSizeField(event)}
                  />
               </fieldset>}

            {vendorElems.length > 0 &&
               <fieldset className="mt-5 py-4 border-b-2 border-gray-100">
                  <legend>Vendor Details</legend>
                  {vendorElems}
               </fieldset>
            }
            {/* modal button for adding new input field starts here */}
            <button type="button"
               className="block mx-auto mb-5 bg-blue-400 hover:bg-blue-500 text-white text-center my-3 py-2 px-3 rounded focus:outline-none focus:shadow-outline cursor-pointer transition duration-150 ease-in-out"
               data-bs-toggle="modal" data-bs-target="#inputFieldList">
               + Add New Field
            </button>

            {/* modal body starts here */}
            <div className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
               id="inputFieldList" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1"
               aria-labelledby="staticBackdropLabel" aria-hidden="true">
               <div className="modal-dialog relative w-auto pointer-events-none">
                  <div
                     className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
                     <div className="modal-body relative p-4">
                        <h2 className="m-2  mb-0 font-bold text-gray-500 w-full">Single input</h2>
                        <div className="flex w-full">
                           <div className="p-2">
                              <input type="checkbox" name="addFeatureInput" id="addFeatureInput" onChange={event => handleFeatureInput(event)} checked={isFeature} />
                              <label htmlFor="addFeatureInput" className="cursor-pointer"> Feature</label>
                           </div>
                           <div className="p-2">
                              <input type="checkbox" name="addVendorInput" id="addVendorInput" onChange={event => handleVendorInput(event)} checked={isVendor} />
                              <label htmlFor="addVendorInput" className="cursor-pointer"> Vendor</label>
                           </div>
                        </div>

                        <h2 className="m-2 mb-0 font-bold text-gray-500 w-full">Multiple Realated Input</h2>
                        <div className="flex w-full">
                           <div className="p-2">
                              <input type="checkbox" name="addSizeInput" id="addSizeInput" onChange={event => handleSizeInput(event)} checked={isSize} />
                              <label htmlFor="addSizeInput" className="cursor-pointer"> Size</label>
                           </div>

                           <div className="p-2">
                              <input type="checkbox" name="addQuantityInput" id="addQuantityInput" onChange={event => handleQuantityInput(event)} checked={isQuantity} />
                              <label htmlFor="addQuantityInput" className="cursor-pointer"> Quantity</label>
                           </div>
                           <div className="p-2">
                              <input type="checkbox" name="addColorInput" id="addColorInput" onChange={event => handleColorInput(event)} checked={isColor} />
                              <label htmlFor="addColorInput" className="cursor-pointer" > Color</label>
                           </div>
                        </div>
                     </div>
                     <div
                        className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">


                        <button type="button"
                           className="m-2 inline-block px-3 py-2 bg-teal-300 text-white leading-tight rounded shadow-md hover:bg-teal-400 hover:shadow-lg focus:bg-teal-400 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-teal-400 active:shadow-lg transition duration-150 ease-in-out"
                           data-bs-dismiss="modal" onClick={customInputs}>Apply</button>

                        <button type="button"
                           className="m-2 inline-block px-3 py-2 bg-orange-300 text-white leading-tight rounded shadow-md hover:bg-orange-400 hover:shadow-lg focus:bg-orange-400 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-orange-400 active:shadow-lg transition duration-150 ease-in-out"
                           data-bs-dismiss="modal">Close</button>
                     </div>
                  </div>
               </div>
            </div>
            {/* modal end */}

            <fieldset>
               <legend>Quantity Details</legend>
               <input type="text"
                  placeholder="Total Quantity"
                  name="totalQuantity"
                  className="shadow appearance-none border rounded w-6/12 my-2 py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline
                   transition-all"
                  value={formData.totalQuantity}
                  onChange={handleChange} />
               <select
                  name="quantityScale"
                  className="w-6/12 shadow appearance-none border rounded my-2 py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                  value={formData.Quantity}
                  onChange={handleChange}
               >
                  {quantityScale.map((option, index) => (
                     <option value={option.value} key={index}>{option.label}</option>
                  ))}
               </select>
            </fieldset>

            <fieldset className="">
               <legend>Pricing Details</legend>
               <input type="text"
                  name="costPrice"
                  className="w-6/12 shadow appearance-none border rounded my-2 py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                  value={formData.costPrice}
                  onChange={handleChange}
                  placeholder={`Cost/${formData.quantityScale}`}
               />
               <input type="text"
                  name="sellPrice"
                  className="w-6/12 shadow appearance-none border rounded my-2 py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                  value={formData.sellPrice}
                  onChange={handleChange}
                  placeholder={`Price/${formData.quantityScale}`}
               />
            </fieldset>
            <button className="bg-gray-700 hover:bg-blue-600 text-white font-semibold my-10 float-right py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={event => handleSubmit(event)}>Add to list</button>
         </form >
      </div >
   );
}
export default ProductForm;