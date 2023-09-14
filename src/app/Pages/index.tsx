// pages/index.tsx
import React, { useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";

const fetchPageInfo = async (url: string) => {
  const apiKey = `${process.env.DATAFORSEO_USERNAME}:${process.env.DATAFORSEO_PASSWORD}`;
  const apiUrl = "https://api.dataforseo.com/v4/on_page/on_page";

  const response = await axios.post(
    apiUrl,
    {
      url,
      location_code: 1000, // Change this as needed for location
      tag: "all",
      enable_browser_render: true,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${Buffer.from(apiKey).toString("base64")}`,
      },
    }
  );

  return response.data;
};

const Widget = () => {
  const [url, setUrl] = useState("");
  const { data, isLoading, isError, error } = useQuery(
    "pageInfo",
    () => fetchPageInfo(url),
    {
      enabled: false,
    }
  );

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  const handleSubmit = () => {
    // Enable the query when the URL is provided
    if (url) {
      setUrl(url);
    }
  };

  return (
    <div>
      <h1>On-Page SEO Checker</h1>
      <div>
        <input
          type="text"
          placeholder="Enter URL"
          value={url}
          onChange={handleUrlChange}
        />
        <button onClick={handleSubmit}>Check</button>
      </div>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error: {(error as Error).message}</p>}
      {data && (
        <div>
          {/* Display the DataForSEO results here */}
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default Widget;
