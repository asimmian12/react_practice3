import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Contact() {
 
  return (
    <div className="bg-gray-50 font-[sans-serif]">
    <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
      <div className="max-w-md w-full">
        <a href="javascript:void(0)">
          <img
            src="https://readymadeui.com/readymadeui.svg"
            alt="logo"
            className="w-40 mb-8 mx-auto block"
          />
        </a>
    <div className="p-8 rounded-2xl bg-white shadow">
      <h2 className="text-gray-800 text-center text-2xl font-bold">Contact</h2>
      <form className="mt-8 space-y-4">
        <label className="text-gray-800 text-sm mb-2 block">Name:
          <input
            type="text"
            className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
            required
          />
        </label>
        <label className="text-gray-800 text-sm mb-2 block">
          Phone Number:
          <input
            type="password"
            className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
            required
          />
        </label>
        <button type="submit">Contact</button>
      </form>
    </div>
    </div>
    </div>
    </div>
  );
}

export default Contact;
