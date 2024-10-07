import React,{useState} from 'react'
import { Link,useNavigate } from 'react-router-dom';
import styled from "styled-components";
import logo from "../assets/logo.svg"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { registerRoute } from '../utils/APIroutes';
import axios from "axios";
function Register() {
    const navigate = useNavigate();
    const data =
    {
        username:"",
        email:"",
        password:"",
        confirmPassword:""
    }
    const toastOptions = {
                position:"bottom-right",
                theme:"dark",
                autoClose:7000,
                pauseOnHover:true,
                draggable:true,
            }
    const [formData,setFormData] = useState(data);
    const handleSubmit = async (event)=>{
        event.preventDefault();
        // setFormData(data);   
        if(checkFormValidation()){
            const {username,email,password} = formData;
            try{
            const {data} = await axios.post(registerRoute,{
                username,email,password
            })
            if(data.status === false){
                toast.error(data.message,toastOptions);
            }
            else{
              localStorage.setItem("chat-app-user",JSON.stringify(data.newUser));
              
              navigate("/");
            }
            }catch(err)
            {
                console.log(err);
            }
        }
    }
    const checkFormValidation = ()=>{
        const {username,email,password,confirmPassword} = formData;
        if(password!==confirmPassword){
             toast.error("Password and Confirm password do not match!",toastOptions);
             return false;
        }
        else if(username.length<3){
            toast.error("Username should be atleast 3 characters long!",toastOptions);
             return false;
        }
        else if(email === ""){
            toast.error("Email is required",toastOptions);
             return false;
        }
        else if(password.length<8){
            toast.error("Password should be atleast 8 characters!",toastOptions);
             return false;
        }
        return true;
    }
    const handleChange=(event)=>{
        const {name,value} = event.target;
        setFormData({...formData,[name]:value});
    }
  return (
    <div>
        <FormContainer>
            <form onSubmit={event=>handleSubmit(event)}>
                <div className="brand">
                    <img src={logo} alt="" />
                    <h1>Snappy</h1>
                </div>
                <input type="text" placeholder='Username' name="username" value={formData.username} onChange={event=>handleChange(event)}/>
                <input type="email" placeholder='Email' name="email" value={formData.email} onChange={event=>handleChange(event)}/>
                <input type="password" placeholder='Password' name="password" value={formData.password} onChange={event=>handleChange(event)}/>
                <input type="password" placeholder='Confirm Password' name="confirmPassword" value={formData.confirmPassword} onChange={event=>handleChange(event)}/>
                <button type='submit'>Create User</button>
                <span>
                    Already have an account? <Link to="/Login">Login</Link>
                </span>
            </form>
        </FormContainer>
        <ToastContainer/>
    </div>
  )
}
const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #131324;
  .brand {
    display: flex;
    align-items: center;
    justify-content:center;
    gap: 1rem;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    width:100%;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button {
    background-color: #4e0eff;
    color: white;
    width:100%;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;
export default Register
