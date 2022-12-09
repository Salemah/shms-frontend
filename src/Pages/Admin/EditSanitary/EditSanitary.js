import axios from 'axios';
import React, { useState } from 'react';
import swal from 'sweetalert';
import './EditSanitary.css';

const EditSanitary = ({editprofile}) => {
     const {id,booth_location,booth_padstock,} = editprofile;
    const [updateprofile,setUpdateprofile] = useState({
     booth_location:booth_location,
     booth_padstock:booth_padstock,
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
                                <label htmlFor="exampleInputPassword1" className="form-label ">Booth Location</label>
                                <input type="text"  className="form-control "
                              id="booth_location" defaultValue={booth_location} name='booth_location'   onFocus={handleOnChange}/>
                            </div>
                           <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label ">Available Pad</label>
                                <input type="text"  className="form-control "
                              id="booth_padstock" defaultValue={booth_padstock} name='booth_padstock'   onFocus={handleOnChange}/>
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

export default EditSanitary;