import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080'

console.log("--- await response ---")
const response = await axios.get('/api/produce');
response.data.forEach(item => console.log(item.name));

axios.get('/api/produce')
  .then(function (response) {
    console.log("--- with promises ---")
    response.data.forEach(item => console.log(item.name));
  })
  .catch(function (error) {
    console.log(error);
  })
  .finally(function () {
  });

axios.get('/api/produce', {
  params: {
    category: 'fruit'
  }
})
  .then(function (response) {
    console.log("--- query parameters ---")
    response.data.forEach(item => console.log(item.name));
  })
  .catch(function (error) {
    console.log(error);
  })
  .finally(function () {
    // always executed
  });
