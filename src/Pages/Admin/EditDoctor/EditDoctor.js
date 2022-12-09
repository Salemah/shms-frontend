import axios from 'axios';
import React, { useState } from 'react';
import swal from 'sweetalert';
import './EditDoctor.css';

const EditDoctor = ({editprofile}) => {
     const {id,doctor_name,doctor_phonenum,specialist_at,available_time} = editprofile;
    const [updateprofile,setUpdateprofile] = useState({
     doctor_name:doctor_name,
     doctor_phonenum:doctor_phonenum,
     specialist_at:specialist_at,
     available_time:available_time,
        errors:[]});
    const handleOnChange = e => {
        const feild = e.target.name;
        const value = e.target.value;
        const newdata = { ...updateprofile };
        newdata[feild] = value;
        setUpdateprofile(newdata);
}
    const handleonSubmit = e => {
        
        const data = {
            ...updateprofile,id,
        }
     
        axios.post(`http://localhost:8000/api/PatientEditMyProfile`, data)
            .then(res => {
                
                if (res.data.validation_errors) {
                    setUpdateprofile({ ...updateprofile, errors: res.data.validation_errors });
                    swal("Warning", "No Change Your Profile", "error");
                }
                else {
                    swal("Success", res.data.success, "success");
                    
                }
            }
            
           )

     



        e.preventDefault();

    }
     return (
          <div>
        <div class="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalToggleLabel">Update Profile</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                    <form onSubmit={handleonSubmit}>
                         <div class="input-container ic1">
                              <input id="doctor_name" value={doctor_name} name='doctor_name' class="input" type="text" placeholder=" "  onBlur={handleOnChange} />
                              <div class="cut"></div>
                              <label for="doctor_name"  class="placeholder">name</label>
                         </div>
                         <div class="input-container ic2">
                              <input id="doctor_phonenum"  name='doctor_phonenum' class="input" type="text" placeholder=" " onBlur={handleOnChange}  value={doctor_phonenum}/>
                              <div class="cut"></div>
                              <label for="doctor_phonenum" class="placeholder">Phone Number</label>
                         </div>
                         <div class="input-container ic2">
                              <input id="specialist_at" name='specialist_at' class="input" type="text" placeholder=" "value={specialist_at} onBlur={handleOnChange} />
                              <div class="cut"></div>
                              <label for="specialist_at" class="placeholder">Specialist At</label>
                         </div>
                         <div class="input-container ic2"> 
                              <input id="available_time" name='available_time' class="input" type="text" placeholder=" " value={available_time} onBlur={handleOnChange} />
                              <div class="cut"></div>
                              <label for="available_time" class="placeholder">Available Time</label>
                         </div>
                         <button type="submit" class="submit">submit</button>
                    </form>
                    </div>

                </div>
            </div>
        </div>
    </div>
     );
};

export default EditDoctor;