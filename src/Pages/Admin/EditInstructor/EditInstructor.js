import axios from 'axios';
import React, { useState } from 'react';
import swal from 'sweetalert';
import './EditDoctor.css';

const EditDoctor = ({editprofile}) => {
     const {id,instructor_name,isntructor_phonenum,course_time,} = editprofile;
    const [updateprofile,setUpdateprofile] = useState({
     instructor_name:instructor_name,
     instructor_phonenum:instructor_phonenum,
     course_time:course_time,
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
                              id="instructor_name" defaultValue={instructor_name} name='instructor_name'   onFocus={handleOnChange}/>
                            </div>
                           <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label ">Phone</label>
                                <input type="text"  className="form-control "
                              id="isntructor_phonenum" defaultValue={isntructor_phonenum} name='isntructor_phonenum'   onFocus={handleOnChange}/>
                            </div>
                           <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label ">Course Time</label>
                                <input type="text"  className="form-control "
                              id="course_time" defaultValue={course_time} name='course_time'   onFocus={handleOnChange}/>
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

export default EditInstructor;