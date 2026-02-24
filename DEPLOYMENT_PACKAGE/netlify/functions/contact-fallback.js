// Fallback contact function - stores messages for manual sending
exports.handler = async (event, context) => {
  // Enable CORS for all requests
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  // Handle preflight OPTIONS requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ success: false, message: 'Method not allowed' })
    };
  }

  try {
    const { name, message } = JSON.parse(event.body);
    
    // Validate inputs
    if (!name || !message) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          success: false, 
          message: 'Name and message are required' 
        })
      };
    }

    // Store message (in a real app, you'd use a database)
    const submission = {
      name,
      message,
      timestamp: new Date().toISOString(),
      id: Date.now().toString()
    };

    console.log('Message received:', submission);
    
    // For now, just log it and return success
    // In production, you could:
    // - Store in a database (MongoDB, PostgreSQL)
    // - Send to a webhook (Slack, Discord)
    // - Store in a file system
    // - Use a third-party service (Airtable, Google Sheets)

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        success: true, 
        message: 'Message received successfully! I\'ll get back to you soon.' 
      });

  } catch (error) {
    console.error('Error processing message:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        success: false, 
        message: 'Failed to process message. Please try again.' 
      })
    };
  }
};
