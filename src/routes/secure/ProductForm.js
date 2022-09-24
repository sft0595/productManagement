import React from "react";
import axios from "axios";
function ProductForm() {
   const [categoriesData, setCategoriesData] = React.useState([])
   const [categoryCrumbs] = React.useState([])
   const [attributesData, setAttributesData] = React.useState([{ attribute: "", values: [] }])
   const [featuresData, setFeaturesData] = React.useState([{ feature: "", featureDesc: "" }])
   const [isVendor, setIsVendor] = React.useState(false)
   const [vendorData, setVendorData] = React.useState([])
   const [formData, setFormData] = React.useState({
      name: "",
      meta_description: "",
      brand: "",
      category: "",
      attrvalues: "",
      features: "",
      vendorDetails: "",
      quantityScale: "",
      totalQuantity: "",
   })

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

   const handleVendorInput = (event) => {
      setIsVendor(!isVendor)
   }

   const createCrumbs = (event) => {
      let element = [...categoryCrumbs]
      element = event.target.options[event.target.selectedIndex].text
      categoryCrumbs.push(element);
   }

   // getting the categories from the api
   React.useEffect(() => {
      axios.get("http://127.0.0.1:8000/api/categories")
         .then((response) => {
            setCategoriesData(response.data);
         })
         .catch(console.log)
   }, [])

   // getting subcategeories on category change
   React.useEffect(() => {
      if (formData.category.length > 0) {
         axios.get(`http://127.0.0.1:8000/api/category_desc/${formData.category}`)
            .then((response) => {
               setCategoriesData(response.data);
            })
            .catch(console.log)
      }
   }, [formData.category])

   // setting attribute values for each attributes
   const attrValuePush = (index, event) => {
      const { name, value } = event.target
      const newData = [...attributesData]
      if (event.key === 'enter' || event.keyCode === 13) {
         if (!newData[index][name].includes(value.toLowerCase())) {
            newData[index][name].push(value.toLowerCase())
         }
         event.target.value = ''
      }
      setAttributesData(newData)
   }

   // attribute assigning for variations
   const handleAttributeValueDel = (idx, index) => {
      let name = "values"
      const newData = [...attributesData]
      newData[index][name].splice(idx, 1)
      setAttributesData(newData)
   }
   const handleAttributesChange = (index, event) => {
      const { name, value } = event.target
      const newData = [...attributesData]
      newData[index][name] = value
      setAttributesData(newData)
      setFormData(prevData => ({ ...prevData, attrvalues: attributesData }))
   }

   // features input handling and assigning it to formData
   const handleFeaturesChange = (index, event) => {
      const { name, value } = event.target
      const newData = [...featuresData]
      newData[index][name] = value
      setFeaturesData(newData)
      setFormData(prevData => ({ ...prevData, features: featuresData }))
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

   // for custom user included fields for the product
   const customInputs = () => {
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


   // add and delete attributes fields 
   const addAttributeField = () => {
      setAttributesData([...attributesData, { attribute: "", values: [] }])
   }
   const delFeatureField = (event, index) => {
      event.preventDefault();
      const values = [...featuresData]
      values.splice(index, 1)
      setFeaturesData(values)
      setFormData(prevData => ({ ...prevData, features: values }))
   }
   // add and delete feature field increment
   const addFeatureField = () => {
      setFeaturesData([...featuresData, { feature: "", featureDesc: "" }])
   }
   const delAttributeField = (event, index) => {
      event.preventDefault();
      const values = [...attributesData]
      values.splice(index, 1)
      setAttributesData(values)
      setFormData(prevData => ({ ...prevData, attrvalues: values }))
   }

   // creating attribute field elements
   const attributeElems = attributesData.map((oldfields, index) =>
   (
      <div key={index}>
         <div className=" bg-slate-200">
            <h3 className=" font-semibold px-2">{`${oldfields.attribute} `}</h3>
            {oldfields.values.map((tag, idx) =>
               <label key={idx} className=" inline-block px-2 m-1 bg-slate-300">{` ${tag} `}
                  <span className="color-red cursor-pointer" onClick={event => handleAttributeValueDel(event, idx, index)}>✖</span></label>)}
         </div>
         <input type='text'
            name="attribute"
            value={oldfields.attribute}
            onChange={event => handleAttributesChange(index, event)}
            placeholder="Eg. Color" className="shadow appearance-none border rounded w-4/12 mb-2 py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline" />

         <input type='text'
            name="values"
            onKeyDown={event => attrValuePush(index, event)}
            // onChange={event => attrValueAddjust(index, event)}
            placeholder="Eg. red green white black" className="shadow appearance-none border rounded w-7/12 mb-2 py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline" />

         {index === 0 && <input
            value="+"
            type="button"
            className="w-1/12 bg-gray-100 hover:bg-gray-300 text-gray-500 py-2 px-3 shadow appearance-none border rounded focus:outline-none"
            onClick={event => addAttributeField(event, index)}
         />}
         {index > 0 && <input
            value="-"
            type="button"
            className="w-1/12 bg-gray-100 hover:bg-gray-300 text-gray-500 py-2 px-3 shadow appearance-none border rounded focus:outline-none"
            onClick={event => delAttributeField(event, index)}
         />}
         <br></br>
      </div>
   )
   )

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

         {index === 0 && <input
            value="+"
            type="button"
            className="w-1/12 bg-gray-100 hover:bg-gray-300 text-gray-500 py-2 px-3 shadow appearance-none border rounded focus:outline-none"
            onClick={event => addFeatureField(event, index)}
         />}
         {index > 0 && <input
            value="-"
            type="button"
            className="w-1/12 bg-gray-100 hover:bg-gray-300 text-gray-500 py-2 px-3 shadow appearance-none border rounded focus:outline-none"
            onClick={event => delFeatureField(event, index)}
         />}
      </div>
   )
   )
   // creating vendor field elems
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

   // main for starts from here..........
   return (
      < div className="w-full bg-white dark:bg-slate-500  justify-center justify-items-center" >
         <form className="bg-white shadow-md rounded px-5 py-6 my-4 mx-auto max-w-2xl">
            <h1 className="text-xl text-gray-700 mb-6 font-semibold">Add New Product</h1>
            <label>Product Name</label>
            <input type="text"
               placeholder="Product Name"
               name="name"
               className="shadow appearance-none border rounded w-full my-2 py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
               value={formData.name}
               onChange={handleChange} />


            <label>Product Description</label>
            <textarea
               placeholder="Product Description"
               name="meta_description"
               className="shadow appearance-none border rounded w-full my-2 py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
               value={formData.meta_description}
               onChange={handleChange}
               rows="10"
            />
            {categoryCrumbs.length > 0 && <><b>Adding product to: </b><br></br></>}
            {categoryCrumbs.map((crumb, index) =>
               <li key={index} className="inline-flex items-center">
                  <div className="flex items-center text-gray-400">
                     <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"></path></svg>
                     {crumb}
                  </div>
               </li>)}
            <br></br>
            {categoriesData.length > 0 &&
               <select
                  name="category"
                  className="w-full shadow appearance-none border rounded my-2 py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                  value={formData.category}
                  onChange={(event) => { handleChange(event); createCrumbs(event) }}
               >
                  <option>{formData.category.length === 0 ? "--Category--" : "--Subcategory--"} </option>
                  {categoriesData.map(root => <option key={root.id} value={root.id}>{root.title}</option>)}
               </select>
            }
            <a href="cc.cp" className=" link-primary">Add new category</a><br></br>
            <hr></hr>
            <br></br>

            <label>Select brand</label>
            <select
               name="brand"
               className="shadow appearance-none border rounded w-full my-2 py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
               value={formData.brand}
               onChange={handleChange}
            >
               <option value="">-- Choose brand --</option>
               <option value="AMD">AMD</option>
               <option value="Intel">Intel</option>
               <option value="Dastoor">Dastoor</option>
            </select>

            {

               attributeElems.length > 0 && <fieldset className="mt-5 py-4 border-b-2 border-gray-100">
                  <legend>Attribute: <small>(Product variations depend on multiple attribute)</small></legend>
                  {attributeElems}
               </fieldset>
            }
            {
               featureElems.length > 0 && <fieldset className="mt-5 py-4 border-b-2 border-gray-100">
                  <legend>Product Feature</legend>
                  {featureElems}
               </fieldset>
            }

            {
               vendorElems.length > 0 &&
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
                              <input type="checkbox" name="addVendorInput" id="addVendorInput" onChange={event => handleVendorInput(event)} checked={isVendor} />
                              <label htmlFor="addVendorInput" className="cursor-pointer"> Vendor</label>
                           </div>
                        </div>

                        <h2 className="m-2 mb-0 font-bold text-gray-500 w-full">Multiple Realated Input</h2>

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

            < fieldset >
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
                  placeholder={`Cost / ${formData.quantityScale}`}
               />
               <input type="text"
                  name="sellPrice"
                  className="w-6/12 shadow appearance-none border rounded my-2 py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                  value={formData.sellPrice}
                  onChange={handleChange}
                  placeholder={`Price / ${formData.quantityScale}`}
               />
               <button className="bg-gray-700 hover:bg-blue-600 text-white font-semibold my-10 float-right py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={event => handleSubmit(event)}>Add to list</button>
            </fieldset>
         </form >
      </div >
   );
}
export default ProductForm;
