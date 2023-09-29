doAll(1);

async function doAll(customerId) {
  try {
    const customer = await getCustomer(customerId);
    console.log('Customer: ', customer);
    if (customer.isGold) {
      const movies = await getTopMovies();
      console.log('Top movies: ', movies);
      const emailSent = await sendEmail(customer.email, movies);
      console.log('Email sent...');
    }
  } catch (error) {
    console.error(error);
  }
}

function getCustomer(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        id: 1,
        name: 'Mosh Hamedani',
        isGold: true,
        email: 'email'
      });
    }, 4000);
  });
}

function getTopMovies() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(['movie1', 'movie2']);
    }, 4000);
  });
}

function sendEmail(email, movies) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
      reject(new Error("Couldn't send email."));
    }, 4000);
  });
}