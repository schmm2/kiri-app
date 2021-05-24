import React from "react"
import DefaultPage from '../layouts/DefaultPage';

export default function Profile() {
  return (
    <DefaultPage>
      <h1>Profile</h1>
      <div className="basicInformationTable">
        <div className="row">
          <span className="labelInfo">E-Mail</span>
          <span></span>
        </div>
        <div className="row">
          <span className="labelInfo">Phone</span>
          <span></span>
        </div>
      </div>
    </DefaultPage>
  );
}