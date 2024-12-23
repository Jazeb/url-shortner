import React, { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import "./App.css"

const App: React.FC = () => {

  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const urlRegex = /^(https?:\/\/)?([\w\d\-]+\.)+\w{2,}(\/\S*)?$/;
    if (!urlRegex.test(url)) {
      setError('Please enter a valid URL');
      return;
    }

    setError('');

    try {
      const response = await fetch('http://localhost:3003/api/shorten', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });
      const data = await response.json();
      console.log(data)
      setShortUrl(data.shortenedUrl);
    } catch (err) {
      setError('Failed to shorten the URL. Try again.');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    alert('Short URL copied to clipboard!');
  };

  return (
    <div className="url-shortener">
    <form onSubmit={handleSubmit} className="form-container">
      <h1>URL Shortener</h1>
      <label htmlFor="url">Enter the URL to shorten</label>
      <br />
      <br />
      <label>URL</label>
      <input
        type="text"
        id="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="https://example.com/foo/bar"
        required
      />
      <button type="submit" className="shorten-btn" disabled={!url}>
        Shorten
      </button>
    </form>

    {error && <p className="error">{error}</p>}

    {shortUrl && (
      <div className="success-container">
        <p>Success! Here's your short URL:</p>
        <div className="short-url">
          <a href={shortUrl} target="_blank" rel="noopener noreferrer">
            {shortUrl}
          </a>
          <button onClick={handleCopy} className="copy-btn">
            Copy
          </button>
        </div>
      </div>
    )}
  </div>
  );
};

export default App;