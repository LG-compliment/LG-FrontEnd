import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const SlackOauth = () => {
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);

    console.log("😡")
    console.log(urlParams)

    const code = urlParams.get('code');
    
    if (code) {
      // Send the code to your backend
      fetch('/api/slack/oauth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            // Handle successful authentication
            // For example, store the token and redirect
            localStorage.setItem('slackToken', data.token);
            navigate('/dashboard');
          } else {
            setError('Authentication failed');
          }
        })
        .catch(err => {
          setError('An error occurred during authentication');
          console.error(err);
        });
    } else {
      setError('No authentication code received');
    }
  }, [location, navigate]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return <div>Authenticating with Slack...</div>;
};

export default SlackOauth;