import React from 'react';
import { Switch } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom';
import './Dashboard.css';

import axios from 'axios';
import swal from 'sweetalert';
import { useHistory } from 'react-router-dom';
import Help from '../Help/Help';
import Doctor from '../Doctor/Doctor';
import AddDoctor from '../AddDoctor/AddDoctor';

const Dashboard = () => {
    let { path, url } = useRouteMatch();
    const username = localStorage.getItem('username');
    const history = useHistory();
    const token = localStorage.getItem('token');
    const logout = (event) => {
        event.preventDefault();
        const data = {
            token: localStorage.getItem('token')
        };
        //console.log(data);
        axios.post('http://127.0.0.1:8000/api/logout', data)
            .then(response => {
               console.log(response.data);
                if (response.data.status === 'success') {
                    localStorage.removeItem('token', response.data.token);
                    localStorage.removeItem('user_type', response.data.type);
                    localStorage.removeItem('id', response.data.id);
                    localStorage.removeItem('name', response.data.name);
                    localStorage.removeItem('email', response.data.email);
                    swal("Success", response.data.message, "success");
                    history.push('/');
                } else {
                    swal("Warning", "Something wrong", "error");
                }
            })
    }

    return (
        <>

            <nav class="navbar navbar-expand-lg navbar-light  headr">
                <div class="container-fluid">
                    <img id='patientimg'  alt="" />
                    <span class='patientdashboard'>Dashboard</span>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav me-auto">
                            <li class="nav-item">
                                <NavLink className="nav-link active" to={`${url}/home`}>
                                   Home
                                </NavLink>
                            </li>
                            <li class="nav-item">
                                <NavLink className="nav-link active"
                                    to={`${url}/help`}>
                                    <span class="item-text">Help</span>
                                </NavLink>
                            </li>
                            <li class="nav-item">
                                <NavLink className="nav-link active"
                                    to={`${url}/doctorlist`}>
                                    <span class="item-text">Doctor List</span>
                                </NavLink>
                            </li>
                            <li class="nav-item">
                                <NavLink className="nav-link active"
                                    to={`${url}/myappointment`}>
                                    <span class="item-text">My AppointMent</span>
                                </NavLink>
                            </li>
                            
                        </ul>
                        <div  >
                            
                           <div class="d-inline-flex">
                              {/* <div class="">
                              <NavLink className=" me-2 buttonlogin"
                                    to={`${url}/myaprofile`} style={{ textDecoration: 'none'}}>
                                    <span class="item-text">My Profile</span>
                                </NavLink>
                              </div> */}
                            
                            {
                                username?
                                <button onClick={logout}  className='btn btn-sm btn-primary mb-6'><Link  style={{ textDecoration: 'none', color: 'white' }}    >Logout</Link></button> 
                                :
                                <button  className='btn btn-sm btn-primary mb-6'><Link to='/login' style={{ textDecoration: 'none', color: 'white' }}    >Login</Link></button>
                            }
                           </div>
                            
                            
                        </div>
                    </div>


                </div>
            </nav>

            <div className="container-fluid dasboard-patient">
                <div className="row">
                    <div className="col-12">

                        <Switch>
                            <Route exact path={path}>
                           
                            </Route>

                            <Route path={`${path}/home`}>
                            
                            </Route>
                            <Route path={`${path}/help`}>
                              <Help></Help>
                            </Route>
                            <Route path={`${path}/doctorlist`}>
                             <Doctor></Doctor>
                            </Route>
                            <Route path={`${path}/adddoctor`}>
                             <AddDoctor></AddDoctor>
                            </Route>
                            <Route path={`${path}/myappointment`}>
                               
                            </Route>
                            <Route path={`${path}/myaprofile`}>
                               
                            </Route>
                            
                        </Switch>

                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;