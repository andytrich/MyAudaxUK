import React from 'react';
import LoginComponent from './screens/Login';
import { apiAudax } from './services/apiAudax';

const APIService = new apiAudax();

export default function App() {
  return (
      <LoginComponent  audaxService={APIService}></LoginComponent>
  );
}