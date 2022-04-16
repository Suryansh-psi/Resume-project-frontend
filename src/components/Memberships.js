import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaArrowRight } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import './Memberships.css'

function Memberships() {

  const { register, handleSubmit } = useForm();
  const [data, setData] = useState("");

  const customFunction = (d) => {
    sessionStorage.setItem("achievements", JSON.stringify(d))
    const data = JSON.parse(sessionStorage.getItem('achievements'))
    console.log(sessionStorage.key(0))
    console.log(data)
  }
  return (
    <>
      <form onSubmit={handleSubmit((data) => customFunction(data))}>
      <div className="buttons">
        <button className="button2">Cancel</button>
        <input type="submit" name="aboutme" value="Save" />
        <button className="button1"><FaArrowRight /></button>
      </div>
      <div className="membership">
        <label>
          Membership No.
          <input className="membership-name"{...register("name")}  name="name" placeholder="Enter Membership No." id="name" />
        </label>
        <label>
          Membership Type
          <input className="membership-type" {...register('type')} name="type" placeholder="Write type" id="desc" /> 
        </label>
          
        <label>
           Membership Since
         <input className="start"{...register("startdate")} type="date" name="startdate[]" />
        </label>
        <label>
           Expiry/Renewal Date
           <input className="end"{...register("enddate")} type="date" name="enddate[]" />
        </label>
        

    </div>
    <div className="footer">
        <span className="plus"><FaPlus /></span><input className="element" {...register('addMembership')} type="text" name="addMembership[]" placeholder='Add Membership' value="Add Membership" />
    </div>
        
        
      </form>
    </>
  );
}

export default Memberships