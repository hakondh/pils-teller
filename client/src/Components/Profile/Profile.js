import React, { useState } from "react";
import AuthService from "../../Services/AuthService";

function Profile(props) {
  const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());

  return (
    <div className="container">
      <h3>Velkommen, {currentUser.name}</h3>
    </div>
  );
}

export default Profile;
