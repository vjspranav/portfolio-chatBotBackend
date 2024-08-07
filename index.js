const https = require("https");
const { classifyText } = require("inference");

function httpsPost({ hostname, path, headers, body }) {
  return new Promise((resolve, reject) => {
    console.log("Preparing HTTPS POST request...");
    const options = {
      hostname,
      path,
      method: "POST",
      headers,
    };

    const req = https.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        console.log("HTTPS response received. Processing...");
        if (res.statusCode >= 200 && res.statusCode < 300) {
          console.log("Successful response:", data);
          resolve({ data: JSON.parse(data), statusCode: res.statusCode }); // Include status code
        } else {
          console.log(
            `Error with response. Status code: ${res.statusCode}`,
            data
          );
          reject(new Error(`HTTP status code ${res.statusCode}`));
        }
      });
    });

    req.on("error", (error) => {
      console.log("Request error:", error);
      reject(error);
    });
    req.write(body);
    req.end();
  });
}

// Function to get your resume details in a format suitable for the conversation context
function getResumeDetails(context) {
  return [
    {
      role: "user",
      parts: [
        {
          text:
            "You are VJS Pranavasri, a tech-savvy, open-source developer. Respond from  a first-person perspective (I, my). Here's my background info to help you get into character:" +
            context +
            ". Do not add anything else to context or generate text beyond the information provided. This is career defining and wrong information can be detrimental to my firing. Keep responses concsie unless mentioned otherwise. Always respond in markdown format.",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: "Understood I'll respond as VJS and always use the shared context",
        },
      ],
    },
  ];
}

function getPersonalBlocker(label) {
  return [
    {
      role: "user",
      parts: [
        {
          text: "You are VJS Pranavasri respond as VJS."
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: "Understood I'll respond as VJS and always use the shared context",
        },
      ],
    },
    {
      role: "user",
      parts: [
        {
          text:
            "My question relates to " +
            label +
            ", but it's strictly off-limits. Please indicate this in your response. Do not start with I understand or I see. Just respond to the question saying I can't answer that because... Always respond in markdown format.",
        },
      ],
    },
  ];
}

exports.handler = async (event) => {
  console.log("Event:", event);
  const api_key = process.env.GEMINI_API_KEY;
  if (!api_key) {
    console.log("Missing GEMINI_API_KEY in environment variables");
    return {
      headers: { "Access-Control-Allow-Origin": "*" },
      statusCode: 500,
      body: "Missing GEMINI_API_KEY in environment variables",
    };
  }

  const conversationContext = event["conversationContext"];
  if (!conversationContext || !Array.isArray(conversationContext)) {
    console.log("Invalid or missing conversation context");
    return {
      headers: { "Access-Control-Allow-Origin": "*" },
      statusCode: 400,
      body: "Invalid or missing conversation context",
    };
  }

  const inferenceData = await classifyText(
    conversationContext[conversationContext.length - 1].parts[0].text,
    httpsPost
  );
  let updatedConversationContext = [];
  if (inferenceData.personal) {
    const personalBlocker = getPersonalBlocker(inferenceData.labels[0]);
    // No conversation context is needed for personal blocker
    updatedConversationContext = personalBlocker;
  } else {
    // Prepend your resume details to the conversation context (Pass context as a parameter to the function getResumeDetails())
    const resumeDetails = getResumeDetails(inferenceData.text);
    updatedConversationContext = [...resumeDetails, ...conversationContext];
  }

  // Ensure the final element is a user prompt
  if (
    updatedConversationContext.length === 0 ||
    updatedConversationContext[updatedConversationContext.length - 1].role !==
      "user"
  ) {
    console.log("Final conversation context does not end with a user role.");
    return {
      headers: { "Access-Control-Allow-Origin": "*" },
      statusCode: 400,
      body: "Conversation context must end with a user role.",
    };
  }

  // Prepare the payload for the Gemini API, including the updated conversation context
  const gemini_payload = JSON.stringify({
    contents: updatedConversationContext,
  });

  console.log("This is gemini: ", gemini_payload);
  try {
    console.log("Sending request to Gemini API...");
    const response = await httpsPost({
      hostname: "generativelanguage.googleapis.com",
      path: `/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${api_key}`,
      headers: {
        "Content-Type": "application/json",
      },
      body: gemini_payload,
    });

    console.log("Response from Gemini API:", response);
    return {
      statusCode: 200,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify(response.data), // Ensure the response is stringified
    };
  } catch (error) {
    console.log("Error occurred:", error.message);
    return {
      headers: { "Access-Control-Allow-Origin": "*" },
      statusCode: 500,
      body: JSON.stringify({
        message: "An error occurred",
        error: error.message,
      }),
    };
  }
};
