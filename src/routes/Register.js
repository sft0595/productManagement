import React from "react";
function ProductForm() {
   const [formData, setFormData] = React.useState({
      FirstName: "",
      LastName: "",
      UserEmail: "",
      UserPassword: "",
      ConfirmPassword: "",
      UserPhone: "",
      UserAddress: "",
   })

   // assigning form inputs
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

   // form submission handle
   const handleSubmit = (event) => {
      event.preventDefault();
      console.log(formData)
   }


   return (
      <div className="w-full bg-white dark:bg-slate-500  justify-center justify-items-center">
         <form className="bg-white shadow-md rounded px-5 py-6 my-4 mx-auto max-w-2xl">
            <h1 className="text-xl text-gray-700 mb-6 font-semibold">Sign Up</h1>
            <fieldset>

               <label>First Name</label>
               <input type="text"
                  placeholder="First Name"
                  name="FirstName"
                  className="shadow appearance-none border rounded w-full my-2 py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                  value={formData.FirstName}
                  onChange={handleChange} />

               <label>Last Name</label>
               <input type="text"
                  placeholder="Last Name"
                  name="LastName"
                  className="shadow appearance-none border rounded w-full my-2 py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                  value={formData.LastName}
                  onChange={handleChange} />

               <label>Email</label>
               <input type="email"
                  placeholder="Email Address"
                  name="UserEmail"
                  className="shadow appearance-none border rounded w-full my-2 py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                  value={formData.UserEmail}
                  onChange={handleChange} />

               <label>Password</label>
               <input type="password"
                  placeholder="Preferred Password"
                  name="UserPassword"
                  className="shadow appearance-none border rounded w-full my-2 py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                  value={formData.UserPassword}
                  onChange={handleChange} />

               <label>Confirm Password</label>
               <input type="password"
                  placeholder="Confirm Password"
                  name="ConfirmPassword"
                  className="shadow appearance-none border rounded w-full my-2 py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                  value={formData.ConfirmPassword}
                  onChange={handleChange} />

               <label>Address</label>
               <input type="text"
                  placeholder="Enter your address"
                  name="UserAddress"
                  className="shadow appearance-none border rounded w-full my-2 py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                  value={formData.UserAddress}
                  onChange={handleChange} />


               <label>Phone Number</label>
               <input type="text"
                  placeholder="Enter your contact number"
                  name="UserPhone"
                  className="shadow appearance-none border rounded w-full my-2 py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                  value={formData.UserPhone}
                  onChange={handleChange} />


               <button className="bg-gray-700 hover:bg-blue-600 text-white font-semibold my-10 float-right py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={event => handleSubmit(event)}>Add to list</button>
            </fieldset>
         </form >
      </div >
   );
}
export default ProductForm;