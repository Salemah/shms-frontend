import React, { useState } from 'react';

import axios from 'axios';

import { Link, NavLink } from 'react-router-dom';

import './AddInstructor.css';

import { useHistory } from 'react-router-dom';

import swal from 'sweetalert';

const AddInstructor = () => {
     const [doctordata, setdDoctorData] = useState({
          instuctor_name: '',
          instructor_phonenum: '',
          course_time: '',
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
          console.log(data);
          axios.post('http://localhost:8000/api/instructor/add', data)
               .then(response => {
                    console.log(response);
                    if (response.data.validation_errors) {

                         setdDoctorData({ ...doctordata, errors: response.data.validation_errors });

                         swal("Warning", "Instructor Add Error!", "error");

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

                         <NavLink to={`/dashboard/instructorlist`}>

                              <span style={{color:"white",TextDecoration:"none"}}>Back </span>

                         </NavLink>

                    </button>

                    <div class="subtitle">Add Instructor!</div>

                    <form onSubmit={handleonSubmit}>

                         <div class="input-container ic1">

                              <input id="instructor_name" name='instructor_name' class="input" type="text" placeholder=" "  onBlur={handleOnChange}/>

                              <div class="cut"></div>

                              <label for="instructor_name" class="placeholder">name</label>

                         </div>

                         <div class="input-container ic2">

                              <input id="instructor_phonenum" name='instructor_phonenum' class="input" type="text" placeholder=" " onBlur={handleOnChange} />

                              <div class="cut"></div>

                              <label for="instuctor_phonenum" class="placeholder">Phone Number</label>

                         </div>

                         <div class="input-container ic2">

                              <input id="course_time" name='course_time' class="input" type="text" placeholder=" " onBlur={handleOnChange} />

                              <div class="cut"></div>

                              <label for="course_time" class="placeholder">Course Time</label>

                         </div>

                         <button type="submit" class="submit">submit</button>

                    </form>

               </div>    

               

          </div>

     );

};



export default AddInstructor;