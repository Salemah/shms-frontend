import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './Pages/Home/Home/Home';
import Login from './Pages/Home/Login/Login';
import Register from './Pages/Home/Register/Register';
import Dashboard from './Pages/Admin/Dashboard/Dashboard';

function App() {
  return (
    <div className="">
    <BrowserRouter>
     <Switch>
       <Route exact path="/">
         <Home></Home>
       </Route>  
       <Route path="/home">
         <Home></Home>
       </Route>  
       <Route path="/login">
         <Login></Login>
       </Route>  
       <Route path="/Register">
         <Register></Register>
       </Route>  
       
      <Route path="/dashboard">
         <Dashboard></Dashboard>
       </Route>
       {/*  <Route path="/singledoctor/:id">
         <SingleDoctorShedule></SingleDoctorShedule> 
         </Route>   */}
     </Switch>
     
    
     </BrowserRouter>
    </div>
  );
}

export default App;
