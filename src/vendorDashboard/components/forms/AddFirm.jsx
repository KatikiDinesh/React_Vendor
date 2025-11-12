import React,{useState} from 'react';
import { API_URL } from '../../helpers/ApiPath';

const AddFirm = () => {
  const[firmName,setFirmName]=useState("");
  const[area,SetArea]=useState("");
  const[category,setCategory]=useState([]);
  const[region,setRegion]=useState([]);
  const[offer,setOffer]=useState("");
  const[file,setFile]=useState(null);

  const handleCategoryChange=(event)=>{
    const value=event.target.value;
    if(category.includes(value)){
      setCategory(category.filter((item)=>item!==value));
    }
    else{
      setCategory([...category,value])
    }
  }

  const handleRegionChange=(event)=>{
    const value=event.target.value;
    if(region.includes(value)){
      setRegion(region.filter((item)=>item!==value));
    }
    else{
      setRegion([...region,value])
    }
  }

  const handleImageUpload=(event)=>{
    const selectedImage=event.target.files[0];
    setFile(selectedImage)
  }
  const handleFirmSubmit=async(e)=>{
    e.preventDefault();
    try {
      const loginToken=localStorage.getItem('loginToken')
      if(!loginToken){
        console.error("USER NOT AUTHENTICATED");
      }
      const formData=new FormData();
      formData.append('firmName',firmName);
      formData.append('area',area);
      formData.append('offer',offer);
      formData.append('file',file)

      category.forEach((value)=>{
        formData.append('category',value)
      });
      region.forEach((value)=>{
        formData.append('region',value)
      })

      const response =await fetch(`${API_URL}/firm/add-firm`,{
        method:'POST',
        headers:{
          'token':`${loginToken}`
        },
        body:formData
      });
      const data=await response.json()
      if(response.ok){
        console.log(data);
        
        setFirmName("");
        SetArea("");
        setCategory([]);
        setRegion([]);
        setOffer("");
        setFile(null);
        alert("firm added successfully ")
      }else if(data.message === "vendor can only have one firm"){
        alert("firm exits .Only one firm can added")

      }
      else{
        alert('failed to add firm')
      }

      const firmId=data.firmId;
      localStorage.setItem('firmId',firmId)

      
    } catch (error) {
      console.error("failer to add Firm")
      
    }
  }


  return (
    <div className="firmSection">
        <form className="tableForm" onSubmit={handleFirmSubmit}>
            <h2>Add Firm</h2>
            <label >Firm Name</label>
            <input type="text" name='firmName' value={firmName} onChange={(e)=>setFirmName(e.target.value)}/>
             <label >Area</label>
            <input type="text" name='area' value={area} onChange={(e)=>SetArea(e.target.value)}/>
             
            <div className="check-imp">
              <label>Category</label>
              <div className="inputsContainer" >
                <div className="checkboxContainer">
                <label>Veg</label>
                <input type="checkbox" checked={category.includes('veg')} value ="veg" onChange={handleCategoryChange}/>
              </div>
              <div className="checkboxContainer">
                <label>Non-Veg</label>
                <input type="checkbox" checked={category.includes('non-veg')} value ="non-veg" onChange={handleCategoryChange}/>
              </div>
              </div>
            </div>

             <div className="check-imp">
              <label>Region</label>
              <div className="inputsContainer">
                <div className="checkboxContainer">
                <label>South-Indian</label>
                <input type="checkbox" checked={region.includes('south-indian')} value ="south-indian"
                onChange={handleRegionChange}/>
              </div>
              <div className="checkboxContainer">
                <label>North-Indian</label>
                <input type="checkbox" checked={region.includes('north-indian')} value ="north-indian"
                onChange={handleRegionChange}/>
              </div>
              <div className="checkboxContainer">
                <label>chinese</label>
                <input type="checkbox" checked={region.includes('chinese')} value ="chinese"
                onChange={handleRegionChange}/>
              </div>
              <div className="checkboxContainer">
                <label>Bakery</label>
                <input type="checkbox" checked={region.includes('bakery')} value ="bakery"
               onChange={handleRegionChange} />
              </div>
              
              </div>
            </div>
             <label >Offer</label>
            <input type="text" name='offer' value={offer} onChange={(e)=>setOffer(e.target.value)}/>
             <label >Firm Image</label>
            <input type="file"  onChange={handleImageUpload} />
            <br/>
        
        <div className="btnSubmit">
          <button type='submit'>Submit</button>
          </div>
        </form>
        
    </div>
  )
}

export default AddFirm
