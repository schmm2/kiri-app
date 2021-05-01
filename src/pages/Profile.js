import React from "react"
import { Auth } from 'aws-amplify';

export default function Profile() {
  return (
    <div>
      <h1>Profile</h1>
      <div className="basicInformationTable">
        <div className="row">
          <span className="labelInfo">E-Mail</span>
          <span>{Auth.user.attributes.email}</span>
        </div>
        <div className="row">
          <span className="labelInfo">Phone</span>
          <span>{Auth.user.attributes.phone_number}</span>
        </div>
      </div>
    </div>
  );
} 