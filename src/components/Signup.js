import React , {useState} from 'react'
import { useNavigate } from 'react-router-dom';

function Signup(props) {

    const [credentials, setCredentials] = useState({name:"", email:"", password:""});
    let navigate = useNavigate();
    const {alertmode} = props;


    const onchange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

    const onSubmit = async(e) =>{
        e.preventDefault();

        const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
              "Content-Type": "application/json",
              },
      
            body: JSON.stringify({ name:credentials.name, email: credentials.email, password:credentials.password }),
          });
      
          const json = await response.json();
          if(json.success){
            localStorage.setItem("token" , json.authtoken)
            console.log(json.authtoken)
            navigate("/login");
            alertmode("Account created successfully", "success");
          }
          
          else{
            alertmode("Invalid details", "danger");
          }
    }

  return (
    <>
    <div className="container">
    <h1 className='mb-4'>Create account to MyNotebook App</h1>
     <form className='container' onSubmit={onSubmit}>
  <div className="mb-3">
  <div className="mb-3">
    <label htmlFor="exampleInputname" className="form-label">Name</label>
    <input type="text" className="form-control" id="name" onChange={onchange} name="name" value={credentials.name} />
  </div>
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

export default Signup
