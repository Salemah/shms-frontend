import axios from 'axios';
import React, { useEffect, useState } from 'react';
import swal from 'sweetalert';
import { RingLoader } from 'react-spinners';
import { NavLink, useHistory } from 'react-router-dom';
import EditDoctor from '../EditDoctor/EditDoctor';
const Instructor = () => {
    const [instructor, setInstructor] = useState([]);
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
        axios.get("http://localhost:8000/api/instructor")
            .then(function (rsp) {
                //console.log(rsp)
                setInstructor(rsp.data);
            }, function (err) {

            });
    }, []);
    const handledelete = id => {
        const confirm = window.confirm("Are you sure to delete this Instructor ");
        if (confirm) {
            axios.post(`http://localhost:8000/api/instructor/delete/${id}`)
                .then(res => {
                    console.log(res);
                    if (res) {
                        swal("Success", res.data.success, "success");
                        history.push("/dashboard/instructorlist");
                    }
                    else {
                        swal("Warning", "Instructor delete Failed!", "error");
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
                        <h3 className='text-center text-primary mt-1'>Doctor List </h3>
                        <div class="row  mt-2">
                            <button className='col-md-1 ms-3 btn btn-sm btn-primary my-2'><NavLink
                                to={`/dashboard/addinstructor`}>
                                <span style={{ color: "white", TextDecoration: "none" }}>Add Instructor </span>
                            </NavLink></button>
                            <div class="col-md-12">
                                <table class="table table-bordered border-primary ">
                                    <thead className='table-success'>
                                        <tr>
                                            <th >Instructor Name</th>
                                            <th >Number</th>
                                            <th >Course Time </th>
                                            <th >Action</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            instructor.map(dc =>
                                                <tr>
                                                    <td >{dc.instructor_name}</td>
                                                    <td>{dc.instructor_phonenum}</td>
                                                    <td>{dc.course_time}</td>
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
                    <EditDoctor editprofile={edituser}>

                    </EditDoctor>


                </div>
            }

        </section>
    );
};

export default Instructor;