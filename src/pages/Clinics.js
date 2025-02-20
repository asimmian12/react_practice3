// src/pages/ClinicsPage.js
import React from 'react';

const Clinics = () => {
  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-primary">Welcome to the Children's Clinic</h2>
      <p className="mt-4 text-gray-700">
        The Children's Clinic is a friendly and welcoming space where children receive medical check-ups and care from our amazing doctors. Whether you're feeling unwell or just need a routine check-up, we're here to help.
      </p>

      <div className="mt-6">
        <h3 className="text-2xl font-semibold">What to Expect</h3>
        <ul className="list-disc pl-5 mt-4">
          <li>You will meet friendly doctors and nurses.</li>
          <li>You can play with toys in the waiting area while you wait for your turn.</li>
          <li>The doctor will check your height, weight, and other important things to keep you healthy.</li>
        </ul>
      </div>

      <div className="mt-6">
        <h3 className="text-2xl font-semibold">For Kids</h3>
        <p className="text-gray-700 mt-4">
          We know going to the doctor can feel a little scary sometimes, but don’t worry! We have fun activities and friendly staff to make sure you feel safe and comfortable. You can bring your favorite toy or drawing to make it a little more fun!
        </p>
      </div>

      <div className="mt-6">
        <h3 className="text-2xl font-semibold">Did You Know?</h3>
        <p className="text-gray-700 mt-4">
          Clinics are great for keeping healthy! Regular check-ups help you stay strong, and they also help doctors understand if you need any extra care.
        </p>
      </div>
    </div>
  );
};

export default Clinics;
