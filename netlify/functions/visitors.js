const fs = require('fs');
const path = require('path');

// Simple visitor counter using Netlify function
let visitorCount = 0;

exports.handler = async (event, context) => {
  // Only allow GET requests
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: JSON.stringify({ success: false, message: 'Method not allowed' })
    };
  }

  try {
    // Increment visitor count (simple in-memory counter)
    visitorCount += 1;
    
    return {
      statusCode: 200,
      body: JSON.stringify({ 
        count: visitorCount,
        timestamp: new Date().toISOString()
      })
    };
  } catch (error) {
    console.error('Error getting visitor count:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ count: 0 })
    };
  }
};
