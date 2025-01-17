import React, { useEffect, useState } from 'react';

const Account = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
      // Retrieve the user data from localStorage
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUserData(JSON.parse(storedUser));
      }
    }, []);
  
    if (!userData) {
      return <div>Loading...</div>;
    }
  
    return (
      <div className="dashboard">
        <p>Hospital Number: {userData.hospital_number}</p>
        <p>Email: {userData.email}</p>
        <p>Department: {userData.department_name}</p>
        <p>Phone: {userData.telephone_number}</p>
      </div>
    );
  }
  
  

export default Account;
