exports.handler = async (event) => {
    const { path } = event;
  
    // Check if the route matches your custom logic
    if (path.startsWith('/edit/')) {
      const id = path.split('/edit/')[1];
      if (!id) {
        return {
          statusCode: 400, // Bad Request if no ID is provided
          body: JSON.stringify({ message: 'ID is required' }),
        };
      }
  
      // Example of another custom status
      if (id === 'restricted') {
        return {
          statusCode: 403, // Forbidden for a specific ID
          body: JSON.stringify({ message: 'Access forbidden' }),
        };
      }
  
      return {
        statusCode: 200,
        body: JSON.stringify({ message: `Edit route accessed with ID: ${id}` }),
      };
    }
  
    return {
      statusCode: 404,
      body: JSON.stringify({ message: 'Route not found' }),
    };
  };
  