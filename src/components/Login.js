import React , {useState} from 'react'
import { useNavigate } from 'react-router-dom';


function Login(props) {

const [credentials, setCredentials] = useState({email:"", password:""});
let navigate = useNavigate();

const {alertmode} = props;

    const onSubmit = async(e) =>{
        e.preventDefault();

        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
              "Content-Type": "application/json",
              },
      
            body: JSON.stringify({ email: credentials.email, password:credentials.password }),
          });
      
          const json = await response.json();
          if(json.success){
            localStorage.setItem("token" , json.authtoken)
            console.log(json.authtoken)
            alertmode("Logged in successfully", "success");
            navigate("/");
          }
          
          else{
            alertmode("Invalid details", "danger");
          }
          
    }

    const onchange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

  return (
    <>
    <div className="container">
    <h1 className='mb-4'>Login to MyNotebook App</h1>
     <form className='container' onSubmit={onSubmit}>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" onChange={onchange} name="email"  value={credentials.email} aria-describedby="emailHelp" />
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" onChange={onchange} name="password" value={credentials.password} />
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form> 
</div>
    </>
  )
}

export default Login
