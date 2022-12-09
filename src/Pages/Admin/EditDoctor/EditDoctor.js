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
        axios.post(`http://localhost:8000/api/doctor/update/${data.id}`, data)
            .then(res => {
                if (res.data.validation_errors) {
                    setUpdateprofile({ ...updateprofile, errors: res.data.validation_errors });
                    swal("Warning", "No Change ", "error");
                }
                else {
                    swal("Success", res.data.message, "success");
                    
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
                        <h5 class="modal-title" id="exampleModalToggleLabel">Update Doctor</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                    <form onSubmit={handleonSubmit}>
                           <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label ">Name</label>
                                <input type="text"  className="form-control "
                              id="doctor_name" defaultValue={doctor_name} name='doctor_name'   onFocus={handleOnChange}/>
                            </div>
                           <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label ">Phone</label>
                                <input type="text"  className="form-control "
                              id="doctor_phonenum" defaultValue={doctor_phonenum} name='doctor_phonenum'   onFocus={handleOnChange}/>
                            </div>
                           <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label ">Specialist At</label>
                                <input type="text"  className="form-control "
                              id="specialist_at" defaultValue={specialist_at} name='specialist_at'   onFocus={handleOnChange}/>
                            </div>
                           <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label ">Available Time</label>
                                <input type="text"  className="form-control "
                              id="available_time" defaultValue={available_time} name='available_time'   onFocus={handleOnChange}/>
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