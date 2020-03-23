import axios from 'axios';

export default {
  healthcheck: function() {
    return axios.get('/api/healthcheck').catch(err => {
      throw err;
    });
  }
};
