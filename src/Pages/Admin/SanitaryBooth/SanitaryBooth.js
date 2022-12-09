import axios from 'axios';
import React, { useEffect, useState } from 'react';
import swal from 'sweetalert';
import './SanitaryBooth.css';
import { RingLoader } from 'react-spinners';
import { NavLink, useHistory } from 'react-router-dom';
import EditSanitary from '../EditSanitary/EditSanitary';
const SanitaryBooth = () => {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [edituser, setEditUser] = useState({});
    const history = useHistory();
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);

    useEffect(function () {
        axios.get("http://localhost:8000/api/SanitaryBooth")
            .then(function (rsp) {
                //console.log(rsp)
                setDoctors(rsp.data);
            }, function (err) {

            });
    }, []);
    const handledelete = id => {
        const confirm = window.confirm("Are you sure to delete this Booth");
        if (confirm) {
            axios.post(`http://localhost:8000/api/SanitaryBooth/delete${id}`)
                .then(res => {
                    console.log(res);
                    if (res) {
                        swal("Success", res.data.success, "success");
                        history.push("/dashboard/doctorlist");
                    }
                    else {
                        swal("Warning", "Booth delete Failed!", "error");
                    }
                })
        }
     
    }
    return (
        <section>
            {
                loading ? <div className="loading-bg">
                    <div className="d-flex justify-content-center align-items-center text-center" >
                        <div className="">
                            <div className="">
                                <h5 className="fw-bold text-uppercase" style={{ color: "#0596F7", marginTop: '5px' }}>
                                    <span><span className="mx-2">Loading</span>
                                        <RingLoader className="App" size={60} color={"#0596F7"} loading={loading} />
                                    </span>
                                </h5>
                            </div>
                        </div>
                    </div>
                </div> : <div className="">
                    <div class="">
                        <h3 className='text-center text-primary mt-1'>Sanitary Booth List </h3>
                        <div class="row  mt-2">
                            <button className='col-md-1 ms-3 btn btn-sm btn-primary my-2'><NavLink
                                to={`/dashboard/adddoctor`}>
                                <span style={{ color: "white", TextDecoration: "none" }}>Add Booth </span>
                            </NavLink></button>
                            <div class="col-md-12">
                                <table class="table table-bordered border-primary ">
                                    <thead className='table-success'>
                                        <tr>
                                            <th >Booth Location</th>
                                            <th >Available Pad</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            doctors.map(dc =>
                                                <tr>
                                                    <td >{dc.booth_location}</td>
                                                    <td>{dc.booth_padstock}</td>
                                                    <td><button id='cancel-btn-help' className='btn btn-sm btn-danger me-1 p-1' onClick={() => handledelete(dc.id)} >Delete</button ><button id='cancel-btn-help' className='btn btn-sm btn-danger me-1 p-1' onClick={() => setEditUser(dc)}
                                                        data-bs-toggle="modal"
                                                        href="#exampleModalToggle">Edit</button></td>
                                                </tr>
                                            )}

                                    </tbody>

                                </table>
                            </div>

                        </div>

                    </div>
                    <EditSanitary editprofile={edituser}>

                    </EditSanitary>


                </div>
            }

        </section>
    );
};

export default SanitaryBooth;