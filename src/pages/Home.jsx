import React from "react"
import DefaultPage from '../layouts/DefaultPage';

export default function Home() {
  return (
    <DefaultPage>
      <h1>Home</h1>
      <p>Welcome to kiri</p>
      <h2>Get started</h2>
      <p>Add some tenants, grant permissions and pull the data</p>
      <h2>Help</h2>
      <a target="_blank" rel="noreferrer" href="https://www.kiri.codes">get in touch</a>
    </DefaultPage>
  );
}

