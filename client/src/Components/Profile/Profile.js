import React, { useEffect } from "react";

function Profile(props) {
  const user = props.user;

  return (
    <div className="container">
      <h3 className="text">{user.name}s profil</h3>
    </div>
  );
}

export default Profile;
