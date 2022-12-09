import React, { useState } from 'react';
import axios from 'axios';
import { Link, NavLink } from 'react-router-dom';
import './AddDoctor.css';

import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';
const AddDoctor = () => {
     const [doctordata, setdDoctorData] = useState({
          doctor_name: '',
          doctor_phonenum: '',
          specialist_at: '',
          available_time: '',
          errors: []
     });
     const history = useHistory();
     const [regsuccess, setRegsuccess] = useState(false);
     const handleOnChange = e => {
          const feild = e.target.name;
          const value = e.target.value;
          const newData = { ...doctordata };
          newData[feild] = value;
          setdDoctorData(newData);


     }
     const handleonSubmit = e => {
          const data = {
               ...doctordata
          }
          console.log(doctordata);

          axios.post('http://localhost:8000/api/doctor/add', data)
               .then(response => {
                    console.log(response.data);
                    if (response.data.validation_errors) {
                         setdDoctorData({ ...doctordata, errors: response.data.validation_errors });
                         swal("Warning", "Doctor Add Error!", "error");
                    } else {
                         swal("Success", response.data.status, "success");
                         history.push("/dashboard/doctorlist");
                    }
               });
          e.preventDefault();
     }
     return (
          <div id='add-doctor-form'>
              
               <div class="form">
                   <button className=' ms-3 btn btn-sm btn-primary my-2'>
                         <NavLink to={`/dashboard/doctorlist`}>
                              <span style={{color:"white",TextDecoration:"none"}}>Back </span>
                         </NavLink>
                    </button>
                    <div class="subtitle">Add Doctor!</div>
                    <form onSubmit={handleonSubmit}>
                         <div class="input-container ic1">
                              <input id="doctor_name" name='doctor_name' class="input" type="text" placeholder=" "  onBlur={handleOnChange}/>
                              <div class="cut"></div>
                              <label for="doctor_name" class="placeholder">name</label>
                         </div>
                         <div class="input-container ic2">
                              <input id="doctor_phonenum" name='doctor_phonenum' class="input" type="text" placeholder=" " onBlur={handleOnChange} />
                              <div class="cut"></div>
                              <label for="doctor_phonenum" class="placeholder">Phone Number</label>
                         </div>
                         <div class="input-container ic2">
                              <input id="specialist_at" name='specialist_at' class="input" type="text" placeholder=" " onBlur={handleOnChange} />
                              <div class="cut"></div>
                              <label for="specialist_at" class="placeholder">Specialist At</label>
                         </div>
                         <div class="input-container ic2"> 
                              <input id="available_time" name='available_time' class="input" type="text" placeholder=" " onBlur={handleOnChange} />
                              <div class="cut"></div>
                              <label for="available_time" class="placeholder">Available Time</label>
                         </div>
                         <button type="submit" class="submit">submit</button>
                    </form>
               </div>    
               
          </div>
     );
};

export default AddDoctor;