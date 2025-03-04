import { NextResponse } from 'next/server';

/**
 * This API route acts as a proxy to our backend API during local development
 * to avoid CORS issues. In production, you would call the API directly.
 */

// Get the base API URL from environment variables
const apiBaseUrl = process.env.API_BASE_URL || 'https://epu96vaic4.execute-api.us-east-1.amazonaws.com/prod';

export async function GET(request, { params }) {
  const { path } = params;
  const apiPath = path.join('/');
  
  // Get any query parameters from the request
  const { searchParams } = new URL(request.url);
  const queryString = [...searchParams.entries()]
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join('&');
  
  const url = `${apiBaseUrl}/${apiPath}${queryString ? `?${queryString}` : ''}`;
  
  // Forward the request headers to the API
  const headers = {};
  request.headers.forEach((value, key) => {
    // Only forward necessary headers
    if (['authorization', 'content-type'].includes(key.toLowerCase())) {
      headers[key] = value;
    }
  });
  
  try {
    const apiResponse = await fetch(url, {
      method: 'GET',
      headers
    });
    
    const data = await apiResponse.json();
    
    return NextResponse.json(data, {
      status: apiResponse.status
    });
  } catch (error) {
    console.error(`Error proxying GET request to ${url}:`, error);
    
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function POST(request, { params }) {
  const { path } = params;
  const apiPath = path.join('/');
  const url = `${apiBaseUrl}/${apiPath}`;
  
  // Forward the request headers to the API
  const headers = {};
  request.headers.forEach((value, key) => {
    // Only forward necessary headers
    if (['authorization', 'content-type'].includes(key.toLowerCase())) {
      headers[key] = value;
    }
  });
  
  try {
    // Get the request body
    const body = await request.json();
    
    const apiResponse = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
    });
    
    const data = await apiResponse.json();
    
    return NextResponse.json(data, {
      status: apiResponse.status
    });
  } catch (error) {
    console.error(`Error proxying POST request to ${url}:`, error);
    
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  const { path } = params;
  const apiPath = path.join('/');
  const url = `${apiBaseUrl}/${apiPath}`;
  
  // Forward the request headers to the API
  const headers = {};
  request.headers.forEach((value, key) => {
    // Only forward necessary headers
    if (['authorization', 'content-type'].includes(key.toLowerCase())) {
      headers[key] = value;
    }
  });
  
  try {
    // Get the request body
    const body = await request.json();
    
    const apiResponse = await fetch(url, {
      method: 'PUT',
      headers,
      body: JSON.stringify(body)
    });
    
    const data = await apiResponse.json();
    
    return NextResponse.json(data, {
      status: apiResponse.status
    });
  } catch (error) {
    console.error(`Error proxying PUT request to ${url}:`, error);
    
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  const { path } = params;
  const apiPath = path.join('/');
  
  // Get any query parameters from the request
  const { searchParams } = new URL(request.url);
  const queryString = [...searchParams.entries()]
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join('&');
  
  const url = `${apiBaseUrl}/${apiPath}${queryString ? `?${queryString}` : ''}`;
  
  // Forward the request headers to the API
  const headers = {};
  request.headers.forEach((value, key) => {
    // Only forward necessary headers
    if (['authorization', 'content-type'].includes(key.toLowerCase())) {
      headers[key] = value;
    }
  });
  
  try {
    const apiResponse = await fetch(url, {
      method: 'DELETE',
      headers
    });
    
    const data = await apiResponse.json();
    
    return NextResponse.json(data, {
      status: apiResponse.status
    });
  } catch (error) {
    console.error(`Error proxying DELETE request to ${url}:`, error);
    
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
} 