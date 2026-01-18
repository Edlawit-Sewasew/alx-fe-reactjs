// src/UserDetails.jsx
import { useContext } from 'react';
import { UserContext } from '../UserContext';  // adjust path if needed

function UserDetails() {
  const userData = useContext(UserContext);

  return (
    <div>
      <h2>User Profile</h2>
      <p><strong>Name:</strong> {userData.name}</p>
      <p><strong>Email:</strong> {userData.email}</p>
    </div>
  );
}

export default UserDetails;