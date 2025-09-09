// Simple mock API untuk FE development
const api = {
  get: async (url) => {
    console.log(`📡 Mock API Call: ${url}`);
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Return mock response based on URL
    if (url === '/sensors/data') {
      return { data: [] }; // Will be handled by sensorService
    }
    
    return { data: { message: 'Mock API Response' } };
  }
};

export { api };