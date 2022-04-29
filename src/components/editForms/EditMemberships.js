import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaArrowRight } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import './EditMemberships.css';
import axios from 'axios';
import { useOutletContext } from "react-router-dom";
import { BsPlusCircle } from "react-icons/bs";


const EditMemberships = () => {
  const [term, setTerm] = useOutletContext();
  const { register, handleSubmit, reset } = useForm();
  const [data, setData] = useState("");

  const [temp, setTemp] = useState(0);
  const [resumeInfo, setResumeInfo] = useState({});
  const id = sessionStorage.getItem("editIdUser");

  useEffect(() => {
    let result = async () => {
      try {
        const result2 = await axios.get(`http://localhost:8080/resume/alldetails/${id}`).then(res => {
          const response = res.data;
          setResumeInfo(response);
          console.log(response);

        })
      }
      catch (err) {
        console.log(err);
      }
    }
    result();
  }, [temp]);

  const customFunction = (d) => {

    const membershipInputs = document.querySelectorAll('.membership-input');
    let membershipList = [];
    membershipInputs.forEach((val) => {
      if (val.value !== "") {
        membershipList.push(val.value);
      }
    });

    axios.put(`http://localhost:8080/resume/membership/${id}`, {
      "membership": [...resumeInfo.membership, ...membershipList]
    }).then(res => {
      let date = new Date();
      setTerm(date.toLocaleString());
      console.log(res.data);
    })
    setResumeInfo({ ...resumeInfo, "membership": [...resumeInfo.membership, ...membershipList] });
    setTerm(7);
    reset();
  }


  const cloneFields = (name1, placeholder, classN, regis, inputClass) => {
    const inp = document.createElement("input");
    inp.setAttribute('type', 'text');
    inp.setAttribute('name', name1);
    inp.setAttribute('placeholder', placeholder);
    inp.setAttribute('class', inputClass);
    inp.setAttribute('object', `{...register(${regis})}`);
    document.querySelector(`.${classN}`).appendChild(inp);
  }

  const deletethisbubble3 = (index) => {
    setResumeInfo({
      ...resumeInfo, "membership": resumeInfo.membership.filter((ele, i) => {
        return i !== index;
      })
    })
  }

  const membershipBubbleMapping = () => {
    let result = [];
    result = resumeInfo.membership.map((data, index) => {
      return (
        <>
          <li>{data} <span onClick={() => deletethisbubble3(index)}>X</span></li>
        </>
      )
    });
    return result;
  }


  return (
    <>
      <form onSubmit={handleSubmit((data) => customFunction(data))}>
        <div className="buttons">
          <button className="button2">Cancel</button>
          <input type="submit" name="aboutme" value="Save" />
          <button className="button1"><i><FaArrowRight /></i></button>
        </div>
        <div className="membership">
          <div>
            <h3>Memberships</h3>
            <div>
              <ul>
                {(resumeInfo.membership) ? membershipBubbleMapping() : null}
              </ul>
            </div>
          </div>
          <div className="membership">
            <label className="membership-name">
              Name of Membership
              <input className="membership-input" {...register('membership')} name="membership[]" placeholder="Name of Membership" id="desc" />
              <i className="Ach" onClick={() => cloneFields("membership[]", "Name of Membership", "membership-name", "membership", "membership-input")}><BsPlusCircle /></i>
            </label>
          </div>

        </div>
        {/* <div className="footer">
        <span className="plus"><FaPlus /></span><input className="element" {...register('addMembership')} type="text" name="addMembership[]" placeholder='Add Membership' value="Add Membership" />
    </div> */}


      </form>
    </>
  );
}

export default EditMemberships;