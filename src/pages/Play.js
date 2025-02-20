
import React from 'react';

const Play = () => {
  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-primary">Welcome to the Play Areas</h2>
      <p className="mt-4 text-gray-700">
        Our play areas are full of fun toys, games, and activities to keep you busy while you wait for your doctor’s appointment or treatment. It’s a place where you can relax, make new friends, and have fun!
      </p>

      <div className="mt-6">
        <h3 className="text-2xl font-semibold">What You Can Do</h3>
        <ul className="list-disc pl-5 mt-4">
          <li>Play with toys and puzzles.</li>
          <li>Watch fun cartoons or movies on the TV.</li>
          <li>Join in group activities with other kids.</li>
        </ul>
      </div>

      <div className="mt-6">
        <h3 className="text-2xl font-semibold">For Kids</h3>
        <p className="text-gray-700 mt-4">
          The play areas are designed just for you! You’ll find lots of activities to keep you busy. From building with blocks to coloring and drawing – there’s something for everyone!
        </p>
      </div>

      <div className="mt-6">
        <h3 className="text-2xl font-semibold">Did You Know?</h3>
        <p className="text-gray-700 mt-4">
          Play is very important for kids, even when you're in the hospital! It helps you feel happy and relaxed, and makes waiting easier.
        </p>
      </div>
    </div>
  );
};

export default Play;
