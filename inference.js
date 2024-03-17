const https = require('https'); // Import the https library

export async function classifyText(text, candidateLabels, httpsPost) {
  const api_key = process.env.HF_API_KEY;

  const raw = JSON.stringify({
    inputs: text,
    parameters: {
      candidate_labels: candidateLabels,
      multi_label: true,
    },
  });

  const headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + api_key,
  };

  const maxRetries = 2; // Maximum number of retries

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const response = await httpsPost({
        hostname: "api-inference.huggingface.co",
        path: "/models/facebook/bart-large-mnli",
        headers: headers,
        body: raw,
      });

      if (response.statusCode === 200) {
        const result = response.data; // Access parsed data from httpsPost response

        const topLabels = [];
        for (let i = 0; i < result.labels.length; i++) {
          if (result.scores[i] > 0.6) {
            topLabels.push(result.labels[i]);
          }
        }

        return topLabels.length > 0 ? topLabels : [result.labels[0]];
      } else {
        console.warn(`Request failed with status ${response.statusCode}. Retrying...`);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  console.error("Failed to classify text after retries.");
  return []; // Return an empty array on failure
}