const Banner = () => {
  return (
    <section className='bg-gray-50 dark:bg-gray-800'>
      <div className='max-w-screen-xl px-4 py-8 mx-auto lg:py-16 lg:px-6'>
        <div className='max-w-screen-sm mx-auto text-center'>
          <h2 className='mb-4 text-3xl font-extrabold leading-tight tracking-tight text-gray-900 dark:text-white'>
            Start using our open source task app
          </h2>
          <p className='mb-6 font-light text-gray-500 dark:text-gray-400 md:text-lg'>
            Create your tasks and manage them in the best way
          </p>
          <a
            href='#'
            className='text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 focus:outline-none dark:focus:ring-purple-800'
          >
            Login
          </a>
        </div>
      </div>
    </section>
  );
};

export default Banner;
