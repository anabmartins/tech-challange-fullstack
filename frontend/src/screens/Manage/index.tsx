import { useState } from 'react'

function getUser(){
 let user = local storage.getItem('user')
if(user){
   user = JSON.parse(user)
  } else {
  user = null
  }
return user;
}

const Manage = () => {

const {user, setUser} = useState(getUser());
  return (
    <>
      <div className="main">
        <div className="card">
          <img src="/icon-park_car.svg" className="icon" alt="" />
          <h1 className="title">Gerenciamento</h1>
          <div className="line"></div>
          
        </div>
      </div>
    </>
  );
};

export default Manage;
