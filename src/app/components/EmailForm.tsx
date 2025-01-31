/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React, { useState } from 'react'
import axios from 'axios';

const EmailForm = () => {
  const [email, setEmail] = useState('')

  const sendMail = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/notify', {
        email: email,  
      });
      console.log(response.data);
      alert('Email sent successfully!');
      setEmail('');
    } catch (error: any) {
      alert(`something went wrong: ${error.response?.data?.message || error}`);
    }
  };

  return (
    <div className='flex justify-center'>
      <form onSubmit={sendMail}>
        <input type="email" 
        value={email}
        onChange={(e) => setEmail(e.target.value)}/>
        <button className='py-3 px-2 rounded-lg bg-yellow-700 text-white'>submit</button>
      </form>
    </div>
  )
}

export default EmailForm;