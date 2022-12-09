import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { RingLoader } from 'react-spinners';
import swal from 'sweetalert';
import './CyberSupport.css';
const CyberSupport = () => {
     const [helps,setHelps]= useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);
  
    useEffect(function () {
        axios.get("http://localhost:8000/api/helplist")
            .then(function (rsp) {
                //console.log(rsp)
                 setHelps(rsp.data);
            }, function (err) {

            });
    }, []);
    const handledelete = id => {
     const confirm = window.confirm("Are you sure to delete this Request");
        if (confirm) {
            axios.post(`http://localhost:8000/api/help/Delete/${id}`)
                .then(res => {
                console.log(res);
                    if (res) {
                        swal("Success", res.data.success, "success");
                    }
                    else {
                        swal("Warning", " delete Failed!", "error");
                    }
                })
        }
     }
    const handleApprove= id => {
     const confirm = window.confirm("Are you sure to Approve");
        if (confirm) {
            axios.post(`http://localhost:8000/api/help/approve/${id}`)
                .then(res => {
                    if (res) {
                        swal("Success", res.data.success, "success");
                    }
                    else {
                        swal("Warning", "Appointment delete Failed!", "error");
                    }
                })
        }
     }
     return (
          <section>
          {
              loading ?<div className="loading-bg">
              <div className="d-flex justify-content-center align-items-center text-center" >
                  <div className="">
                      <div className="">
                          <h5 className="fw-bold text-uppercase" style={{ color: "#0596F7",marginTop:'5px'}}>
                              <span><span className="mx-2">Loading</span>
                                  <RingLoader className="App" size={60} color={"#0596F7"} loading={loading} />
                              </span>
                          </h5>
                      </div>
                  </div>
              </div>
          </div> :<div className="">
              <div class="">
               <h3 className='text-center text-primary mt-2'>Cyber Support Request List </h3>
                  <div class="row justify-content-md-center mt-1">
                      <div class="col-md-12">
                          <table class="table table-bordered border-primary ">
                              <thead className='table-danger'>
                                  <tr>
                                      <th >Victim Name</th>
                                      <th >Victim Address</th>
                                      <th >Victim Phonenum</th>
                                      <th >Age</th>
                                      <th >Screenshots</th>
                                      <th >Victim Description</th>
                                      <th >Status</th>
                                      <th >Action</th>
                                  </tr>
                              </thead>
                              <tbody>
                                  {
                                      helps.map(dc =>
                                          <tr>
                                              <td >{dc.victim_name}</td>
                                              <td>{dc.victim_address}</td>
                                              <td>{dc.victim_phonenum}</td>
                                              <td >{dc.victim_age}</td>
                                              <td>{dc.victim_screenshot}</td>
                                              <td>{dc.victim_description}</td>
                                              <td style={{fontWeight : "bold"}}>{dc.status}</td>
                                              <td><button id='cancel-btn-help' className='btn btn-sm btn-danger p-1 me-2' onClick={() => handledelete(dc.id)} >Delete</button>
                                              <button id='cancel-btn-help' className='btn btn-sm btn-success p-1 me-2' onClick={() => handleApprove(dc.id)} >  Approve</button></td>
                                          </tr>
                                      )}
  
                              </tbody>
  
                          </table>
                      </div>
  
                  </div>
  
              </div>
  
              
          </div>
          }

      </section>
     );
};

export default CyberSupport;