const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  try {
    // Parse the body
    const { website } = JSON.parse(event.body);
    
    // Validate URL
    if (!website) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Website URL is required' })
      };
    }
    
    // Get PageSpeed Insights API key from environment variables
    const apiKey = process.env.PAGESPEED_API_KEY;
    
    if (!apiKey) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'API key not configured' })
      };
    }
    
    // Call PageSpeed Insights API
    const url = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(website)}&key=${apiKey}`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: data.error?.message || 'Failed to fetch PageSpeed data' })
      };
    }
    
    // Extract scores
    const lighthouseResult = data.lighthouseResult;
    const categories = lighthouseResult.categories;
    
    const performance = Math.round(categories.performance.score * 100);
    const accessibility = Math.round(categories.accessibility.score * 100);
    const bestPractices = Math.round(categories['best-practices'].score * 100);
    const seo = Math.round(categories.seo.score * 100);
    
    // Calculate overall score (average of all categories)
    const score = Math.round((performance + accessibility + bestPractices + seo) / 4);
    
    // Return the results
    return {
      statusCode: 200,
      body: JSON.stringify({
        score,
        performance,
        accessibility,
        bestPractices,
        seo
      })
    };
  } catch (error) {
    console.error('Error in seo-audit function:', error);
    
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};