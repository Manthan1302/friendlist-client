import React, { useEffect, useState } from "react";
import Table from './Table';
import axios from 'axios';

const From = ()=>{
    const [users,setUser] = useState([]);
    const [formData,setFromData] = useState({
        name:"",
        email:"",
        age:null
    });
const [userId,setUserId] = useState("");
    //..
    useEffect(()=>{
        fatchUsers();
    })
    //setting Form data
    const changeFormData=(e)=>{
        const name = e.target.name;
        const value = e.target.value;
        setFromData({...formData,[name]:value})
        
    };
    //create user
    const createIUser = async()=>{
        console.log('formData: ', formData); 
        try {
            const response = await axios.post("http://localhost:7777/postFriend",formData);
            console.log('response: ', response.data);
            fatchUsers();


        } catch (error) {
            console.log('error: ', error.response);
            
        }
    }
    //get users
    const fatchUsers =async()=>{
        try {
            const response = await axios.get("http://localhost:7777/getAllFriend");
            setUser(response.data);
        } catch (error) {
            console.log('error: ', error.response);
            
        }
    };
    //delete users
    const deleteUser = async (_id)=>{
       try {
           const response = await axios.delete(`http://localhost:7777/deleteFriend/${_id}`)
           console.log('response: ', response);
           fatchUsers();
       } catch (error) {
           console.log('error: ', error.response);
           
       }
    }
    //update
    const updateUser = async (item)=>{
        setFromData({
            ...formData,
            
            "name": item.name,
            "email": item.email,
            "age": item.age,
          });
          setUserId(item._id);
          console.log('formData: ', formData);
    };
    //update api
    const updateData = async()=>{
        console.log(formData);
        console.log(userId);
        try {
            const response = await axios.put(`http://localhost:7777/updateFriend/${userId}`,formData);
            fatchUsers();
            console.log('response: ', response);
        } catch (error) {
            console.log('error: ', error.response);
            
        }
    };

    return(
       <div>
            <div>
                <input 
                    type="text" 
                    name="name" 
                    value={formData.name} 
                    onChange={changeFormData} 
                    placeholder="Name..." 
                />
            </div>
            <div>
                <input 
                    type="text" 
                    name="email"  
                    value={formData.email} 
                    onChange={changeFormData} 
                    placeholder="Email..." 
                 />
            </div>
            <div>
                <input 
                    type="number" 
                    name="age" 
                    value={formData.age} 
                    onChange={changeFormData} 
                    placeholder="Age..." 
                />    
            </div>
            <div>
                <button onClick={fatchUsers}>GET</button>
                <button onClick={createIUser}>POST </button>
                <button onClick={updateData}>PUT </button>z

            </div>
            <div style={{display:"flex",justifyContent:"center",marginTop:"20px"}}>
                {/* as an attribute */}
                <Table data={users} deleteUser={deleteUser} updateUser={updateUser}/>

            </div>
       </div>
    ) 
}

export default From;