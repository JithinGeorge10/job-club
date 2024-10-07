import React from 'react';

function HomePage() {
  return (
    <div className="bg-black text-white min-h-screen">
       
      {/* Find Jobs Section */}
      <section className="bg-gray-800 text-center text-white py-16 px-4">
  <h2 className="text-3xl font-bold mb-4">
    "Cook Up Your Career, Break into the Best Jobs!"
  </h2>
  <p className="text-lg mb-8">
    500,000+ jobs waiting for you to explore
  </p>
  <div className="flex justify-center">
    <button className="bg-green-500 text-black font-bold py-4 px-8 rounded-full hover:bg-green-600 shadow-lg transition-all duration-300 transform hover:scale-105">
      Find Jobs
    </button>
  </div>
</section>

{/* Category Section */}
<section className="text-center py-10">
  <h2 className="text-xl">
    Discover by <span className="text-green-400">category</span> Explore now
  </h2>

  <div className="relative overflow-hidden py-10">
    <div className="category-scroll flex gap-6 animate-scroll">
      {/* Category Boxes */}
      {[
        'Design',
        'Sales',
        'Marketing',
        'Finance',
        'Technology',
        'Engineering',
        'Education',
        'Human Resources'
      ].map((category, index) => (
        <div
          key={index}
          className="bg-green-200 p-6 rounded-lg flex flex-col items-center text-black min-w-[150px] md:min-w-[200px] text-center"
        >
          <div className="text-5xl mb-4">🧑‍💻</div> {/* Placeholder for icons */}
          <h3 className="text-lg font-bold">{category}</h3>
        </div>
      ))}
      
      {/* Duplicate categories more than once for seamless scroll */}
      {[
        'Design',
        'Sales',
        'Marketing',
        'Finance',
        'Technology',
        'Engineering',
        'Education',
        'Human Resources'
      ].map((category, index) => (
        <div
          key={index + 'duplicate'}
          className="bg-green-200 p-6 rounded-lg flex flex-col items-center text-black min-w-[150px] md:min-w-[200px] text-center"
        >
          <div className="text-5xl mb-4">🧑‍💻</div> {/* Placeholder for icons */}
          <h3 className="text-lg font-bold">{category}</h3>
        </div>
      ))}
    </div>
  </div>
</section>


      {/* Start Posting Jobs Section */}
      <section className="bg-green-900 text-white p-10 text-center rounded-lg my-10 mx-4">
        <h2 className="text-2xl font-bold">Start Posting Jobs Today</h2>
        <p className="text-lg">Start posting jobs for free</p>
        <button className="bg-white text-green-500 font-bold py-2 px-4 mt-4 rounded-full">
          Sign up for free
        </button>
      </section>

      {/* Enhance Your Career Path Section */}
      <section className="text-center py-10">
        <h2 className="text-xl">
          Enhance your <span className="text-green-400">career</span> path
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-10">
          {/* Career Path Tips */}
          {[
            'Popular job effective CV for job',
            'Boost team productivity tips',
            'Tech industry job hunt tips',
            'Popular job interview questions'
          ].map((tip) => (
            <div
              key={tip}
              className="bg-green-600 p-6 rounded-lg flex flex-col items-center text-black"
            >
              <div className="text-5xl mb-4">📄</div> {/* Placeholder for icons */}
              <h3 className="text-lg font-bold">{tip}</h3>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomePage;
