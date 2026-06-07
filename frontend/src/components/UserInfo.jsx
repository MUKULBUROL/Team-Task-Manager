import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const UserInfo = () => {
  const { user } = useContext(AuthContext);

  if (!user) return null;

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-bold">User Information</h2>
      <p><span className="font-semibold">Name:</span> {user.name}</p>
      <p><span className="font-semibold">Email:</span> {user.email}</p>
      <p><span className="font-semibold">Role:</span> {user.role}</p>
    </div>
  );
};

export default UserInfo;