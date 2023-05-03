import React, { Component } from 'react';
import axios from 'axios';

class Validate extends Component {
  handleSubmit = async () => {
    try {
      // Prepare data to send to Flask back-end
      const data = { name: 'John', age: 30 };

      // Make POST request to Flask back-end
      const response = await axios.post('http://localhost:5000/api/predict', data);

      // Handle response from Flask back-end
      console.log(response.data); // Access response data
      console.log(response.status); // Access response status
      console.log(response.headers); // Access response headers
    } catch (error) {
      // Handle error
      console.error(error);
    }
  }

  render() {
    return (
      <div>
        <button onClick={this.handleSubmit}>Submit</button>
      </div>
    );
  }
}

export default Validate;