import { useEffect } from "react";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCompany } from "../../redux/features/companySlice";
import { toast } from "react-toastify";
import { useState } from "react";

const initialState = {
    companyName : '',
    email : '',
    address : '',
    description : '',
  }
  // pay : '',
  // domaine : '',
  // phone : '',
  // image : ''

export default function AddCompany(){
const [companyData , setCompanyData] = useState(initialState)
const [open , setOpen] =useState(false)
const [file , setFile] =useState(null)
const dispatch = useDispatch()
const {loading , error} = useSelector((state)=>({...state.Company}))
const {companyName , email , address , description } = companyData
// ,image, pay , domaine , phone

const handleSubmit = e =>{
    e.preventDefault()
    if(companyName && email && address && description )
    dispatch(createCompany())
}

    const onInputChange = (e) =>{
        let {name , value}= e.target
        setCompanyData({...companyData , [name]:value})
    }

    useEffect(()=>{
        error && toast.error(error)
    },[error])

    
    // if (loading) {
    //   return (
    //     <div className="flex items-center justify-center p-8">
    //       <svg
    //         class="w-12 h-12 animate-spin text-gray-600"
    //         fill="none"
    //         stroke="currentColor"
    //         viewBox="0 0 24 24"
    //         xmlns="http://www.w3.org/2000/svg"
    //       >
    //         <path
    //           stroke-linecap="round"
    //           stroke-linejoin="round"
    //           stroke-width="2"
    //           d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
    //         ></path>
    //       </svg>
    //     </div>
    //   );
    // }

return (
<div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          <input
            type="file"
            id="file"
            // onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <div className="addProductItem">
          <label>Title</label>
          <input
            name="title"
            type="text"
            value={companyName}
            placeholder="Apple Airpods"
            onChange={onInputChange}
          />
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input
            name="desc"
            type="text"
            value={description}
            placeholder="description..."
            onChange={onInputChange}
          />
        </div>
        <div className="addProductItem">
          <label>Price</label>
          <input
            name="price"
            type="number"
            value={email}
            placeholder="100"
            onChange={onInputChange}
          />
        </div>
        <div className="addProductItem">
          <label>Categories</label>
          <input type="text" placeholder="jeans,skirts" 
          value={address}
          onChange={onInputChange} />
        </div>
        <div className="addProductItem">
          <label>Stock</label>
          <select name="inStock" onChange={onInputChange}>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <button onClick={handleSubmit} className="addProductButton">
          Create
        </button>
      </form>
    </div>)
}

