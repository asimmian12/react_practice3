// src/pages/WardsPage.js
import React from 'react';

const Wards = () => {
  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-primary">Welcome to the Children's Wards</h2>
      <p className="mt-4 text-gray-700">
        The children's wards are bright and colorful places where doctors and nurses take care of you if you need to stay in the hospital for treatment. You will have your own bed and may have a roommate, but don’t worry – we will make sure you feel comfortable.
      </p>

      <div className="mt-6">
        <h3 className="text-2xl font-semibold">What to Expect in the Ward</h3>
        <ul className="list-disc pl-5 mt-4">
          <li>Friendly nurses will help take care of you and make sure you feel at ease.</li>
          <li>You will have toys, books, and games to keep you entertained.</li>
          <li>The doctors will come to check on you regularly and explain everything in a way that you can understand.</li>
        </ul>
      </div>

      <div className="mt-6">
        <h3 className="text-2xl font-semibold">For Kids</h3>
        <p className="text-gray-700 mt-4">
          Staying in the hospital might feel strange, but we’ll do everything to make it fun! You can watch cartoons, play games on the tablet, or talk to the friendly staff if you feel nervous.
        </p>
      </div>

      <div className="mt-6">
        <h3 className="text-2xl font-semibold">Did You Know?</h3>
        <p className="text-gray-700 mt-4">
          The children’s ward is a safe space for you to heal and rest. You will be able to visit different rooms and meet doctors who specialize in treating kids!
        </p>
      </div>
    </div>
  );
};

export default Wards;
