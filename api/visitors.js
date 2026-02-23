let visitorCount = 0;

module.exports = async (req, res) => {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    // Increment visitor count
    visitorCount += 1;
    
    res.status(200).json({ 
      count: visitorCount,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error getting visitor count:', error);
    res.status(500).json({ count: 0 });
  }
};
