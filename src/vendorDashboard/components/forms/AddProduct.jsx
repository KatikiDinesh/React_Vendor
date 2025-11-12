import React,{use, useState} from 'react'
import { API_URL } from '../../helpers/ApiPath';

const AddProduct = () => {
  const[productName,setProductName]=useState("");
  const[price,setPrice]=useState("");
  const[category,setCategory]=useState([]);
  const[bestseller,setBestseller]=useState(false);
  const[description,setDescription]=useState("");
  const[file,SetFile]=useState(null);

  const handleCategoryChange=(event)=>{
    const value=event.target.value;
    if(category.includes(value)){
      setCategory(category.filter((item)=>item!==value));
    }
    else{
      setCategory([...category,value])
    }
  }

  const handleBestSeller=(event)=>{
    const value=event.target.value==='true'
    setBestseller(value)


  }
  const handleImageUpload=(event)=>{
    const selectedImage=event.target.files[0];
    SetFile(selectedImage)
  }


 const handleAddProduct = async (e) => {
  e.preventDefault();

  try {
    const loginToken = localStorage.getItem("loginToken");
    const firmId = localStorage.getItem("firmId");

    if (!loginToken || !firmId) {
      console.error("User not authorised");
      return;
    }

    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("price", price);
    formData.append("bestseller", bestseller);
    formData.append("image", file);
    formData.append("description", description);   // ✅ NOW ADDED

    category.forEach((value) => {
      formData.append("category", value);
    });

    const response = await fetch(`${API_URL}/product/add-product/${firmId}`, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    console.log("Created product:", data);

    if (response.ok) {
      alert("✅ Product Added Successfully");
    } else {
      alert("Failed to add product");
    }

    // Reset fields
    setProductName("");
    setPrice("");
    setCategory([]);
    setBestseller(false);
    SetFile(null);
    setDescription("");

  } catch (error) {
    console.error("Error:", error);   // ✅ FIXED
    alert("Failed to add product");
  }
};






  return (
     <div className="firmSection">
        <form className="tableForm" onSubmit={handleAddProduct}>
            <h2>Add Product</h2>
            <label >Product Name</label>
            <input type="text" value={productName} onChange={(e)=>setProductName(e.target.value)}/>
             <label >Price</label>
            <input type="text"value={price} onChange={(e)=>setPrice(e.target.value)}/>
             <label >Category </label>
             <div className='inputsContainer'>
              <div className='checkboxContainer'>
                <label>veg</label>
                <input type='checkbox' value="veg" checked={category.includes('veg')} onChange={handleCategoryChange}/>

              </div>
              <div className='checkboxContainer'>
                <label>non-veg</label>
                <input type ='checkbox' value='non-veg' checked={category.includes('non-veg')} onChange={handleCategoryChange}/>

              </div>
              

             </div>
            
            <div className='checkImp'>
             <label >Bestseller</label>
             <div className='inputsContainer'>
              <div className='checkboxContainer'>
                <label>Yes</label>
                <input type="radio" checked={bestseller===true} value ="true" onChange={handleBestSeller}/>

              </div>
              <div className='checkboxContainer'>
                <label>No</label>
                <input type="radio" checked={bestseller===false} value="false" onChange={handleBestSeller}/>

              </div>

             </div>
            
            </div>
             <label >Description</label>
            <input type="text" value={description} onChange={(e)=>setDescription(e.target.value)}/>
             <label >Firm Image</label>
            <input type="file" onChange={handleImageUpload}/>
            <br/>
        
        <div className="btnSubmit">
          <button type='submit'>Submit</button>
          </div>
        </form>
        
    </div>
  )
}

export default AddProduct
