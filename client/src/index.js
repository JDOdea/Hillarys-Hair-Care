import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppointmentList } from './appointments/AppointmentList';
import { CustomerList } from './customers/CustomerList';
import { StylistList } from './stylists/StylistList';
import { ServiceList } from './services/ServiceList';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} >
        <Route index element={<AppointmentList />} />
        <Route path="services">
          <Route index  element={<ServiceList />}/>
        </Route>
        <Route path="stylists">
          <Route index element={<StylistList />} />
        </Route>
        <Route path="customers">
          <Route index element={<CustomerList />} />
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
