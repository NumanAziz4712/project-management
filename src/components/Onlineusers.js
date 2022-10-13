import React from "react";
import "./Onlineusers.css";
import { useCollection } from "../hooks/useCollections";
import Avatar from "./Avatar";
const Onlineusers = () => {
  const { error, documents } = useCollection("users");
  return (
    <div className='user-list'>
      <h2>All users</h2>

      {error && <div className='error'>{error}</div>}
      {documents &&
        documents.map((user) => (
          <div key={user.id} className='user-list-item'>
            {user.online && (
              <span className='online-user'></span>
            )}
            <span>{user.displayName}</span>
            <Avatar src={user.photoURL} />
          </div>
        ))}
    </div>
  );
};

export default Onlineusers;
