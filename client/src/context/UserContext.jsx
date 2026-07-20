import { createContext,useState,useEffect } from "react";
import axios from "axios";

const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading,setLoading] = useState(true);

  const getUser = async () =>{
    try{
      let res = await axios.get("http://localhost:8000/api/user/me", {withCredentials: true});
      setUser(res?.data);
    }catch(err){
      console.log(err);
      setUser(null);
    }finally{
      setLoading(false);
    }
  }

  useEffect(()=>{
    getUser();
  },[]);
  
  return (
    <UserContext.Provider value={{ user, getUser }}>
      {!loading && children}
    </UserContext.Provider>
  );
};


export {UserContext, UserContextProvider};