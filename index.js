const https = require('https');

function httpsPost({ hostname, path, headers, body }) {
  return new Promise((resolve, reject) => {
    console.log('Preparing HTTPS POST request...');
    const options = {
      hostname,
      path,
      method: 'POST',
      headers,
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        console.log('HTTPS response received. Processing...');
        if (res.statusCode >= 200 && res.statusCode < 300) {
          console.log('Successful response:', data);
          resolve(JSON.parse(data));
        } else {
          console.log(`Error with response. Status code: ${res.statusCode}`, data);
          reject(new Error(`HTTP status code ${res.statusCode}`));
        }
      });
    });

    req.on('error', (error) => {
      console.log('Request error:', error);
      reject(error);
    });
    req.write(body);
    req.end();
  });
}



// Function to get your resume details in a format suitable for the conversation context
function getResumeDetails() {
  const introduction = "Hey there! 🚀 I'm VJS Pranavasri, your go-to guy for all things tech and a sprinkle of humor. I'm an aspiring Full Stack Engineer, an OS developer at heart, and a DevOps enthusiast who finds joy in demystifying the tech world for others.";

  const experience = "My journey includes zapping bugs and deploying features as a Backend Developer Intern at Thinkskill, where I concocted a nifty backend system for managing restaurant orders and tips with MySQL, Express, and Node.js. I've also dabbled as a Software Developer Intern at Virtual Labs, giving old webpages a new lease on life beyond Flash and Java.";
  
  const projects = "But wait, there's more! I'm the lead developer and co-founder of Stag-OS, where my magic wand (read: coding skills) supports over 14 devices with more than 100,000 downloads. Ever heard of Stagbin? That's my brainchild too, a pastebin with bells and whistles like auto-complete support, diff viewing, and even client-side encryption for those top-secret pastes.";
  
  const skills = "I speak JavaScript, Python, C/C++, and a dash of Racket among other languages, with a keen interest in ReactJS, Express, and, of course, NodeJS. Clouds? Love 'em! I navigate through AWS and Google Cloud like a pro, thanks to my trusty companions Git, Jenkins, and Github Actions.";
  
  const educationAndMisc = "Currently honing my skills and expanding my knowledge at IIITH, where I'm tackling a BTech + MS in Computer Science with a CGPA of 8.39. When I'm not coding, I'm leading the Cloud at GDSC IIIT-H, assisting in research, or sharing my knowledge as a Teaching Assistant.";
  
  const personalNote = "My favourite quotes include, 'Manners Maketh Man', 'Sic Parvis Magna'. 'Sic Parvis Magna' is also the motto for my StagOS. In a nutshell, I'm all about making tech accessible, fun, and a bit quirky. Let's dive into this digital adventure with a dash of humor, shall we? 😄👨‍💻";
  
  const myWebsite = "Check out my website at vjspranav.dev for more about my work and projects.";
  
  // If you have a specific section for projects, you might want to expand on it separately.
  const myProjects = "My projects include Stag-OS, motivation for stag was the fact that Stag was harrys patronus and those horns represent elegance. 'Sic Parvis Magna' is also the motto for my StagOS. StagOS website: stag-os.org. StagBIN was created because my favourite pastebing was took down and I didn't want to be dependent anymore: stagb.in";

  const skillsAtaGlance = "Skills at a Glance: Languages: JavaScript, Python, C/C++, Racket, Go Lang, Haskell, Dart, Java, Solidity, Elm.\n Frameworks: ReactJS, Express, Socket.io, NodeJS.\n Database: MySQL, MongoDB, DynamoDB.\n VCS, Cloud & Build Tools: Git, Jenkins, GitHub Actions, AWS, Google Cloud, Apache2, Nginx, Arduino IDE."

  const myContact = "email: pranavasri@live.in, linkedin: https://linkedin.com/in/vjspranav, website: https://vjspranav.dev/contact"

  const resumeData = `${introduction}\n\n${experience}\n\n${projects}\n\n${skills}\n\n${educationAndMisc}\n\n${personalNote}\n\n${myWebsite}\n\n${myProjects}\n${skillsAtaGlance}\n\n${myContact}`;

  return [
    {
      "role": "user",
      "parts": [{
        "text": "Hey VJS tell me about you! Respond in a fun and slightly informal tone, from the perspective of a tech-savvy developer named VJS Pranavasri. Use first-person pronouns (I, my). This is your resume details: " + resumeData
      }]
    },
    {
      "role": "model",
      "parts": [{
        "text": "Understood I'll respond as VJS and always us the resumeData as context"
      }]
    }
  ];
}

exports.handler = async (event) => {
  console.log('Event:', event);
  const api_key = process.env.GEMINI_API_KEY;
  if (!api_key) {
    console.log('Missing GEMINI_API_KEY in environment variables');
    return {
      headers: { 'Access-Control-Allow-Origin': '*' },
      statusCode: 500,
      body: 'Missing GEMINI_API_KEY in environment variables'
    };
  }

  const conversationContext = event["conversationContext"];
  if (!conversationContext || !Array.isArray(conversationContext)) {
    console.log('Invalid or missing conversation context');
    return {
      headers: { 'Access-Control-Allow-Origin': '*' },
      statusCode: 400,
      body: 'Invalid or missing conversation context'
    };
  }

  // Prepend your resume details to the conversation context
  const resumeDetails = getResumeDetails();
  const updatedConversationContext = [...resumeDetails,   ...conversationContext];

  // Ensure the final element is a user prompt
  if (updatedConversationContext.length === 0 || updatedConversationContext[updatedConversationContext.length - 1].role !== "user") {
    console.log('Final conversation context does not end with a user role.');
    return {
      headers: { 'Access-Control-Allow-Origin': '*' },
      statusCode: 400,
      body: 'Conversation context must end with a user role.'
    };
  }

  // Prepare the payload for the Gemini API, including the updated conversation context
  const gemini_payload = JSON.stringify({
    contents: updatedConversationContext
  });

  console.log("This is gemini: ", gemini_payload)
  try {
    console.log('Sending request to Gemini API...');
    const response = await httpsPost({
      hostname: 'generativelanguage.googleapis.com',
      path: `/v1beta/models/gemini-pro:generateContent?key=${api_key}`,
      headers: {
        'Content-Type': 'application/json'
      },
      body: gemini_payload,
    });

    console.log('Response from Gemini API:', response);
    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify(response) // Ensure the response is stringified
    };
  } catch (error) {
    console.log('Error occurred:', error.message);
    return {
      headers: { 'Access-Control-Allow-Origin': '*' },
      statusCode: 500,
      body: JSON.stringify({ message: 'An error occurred', error: error.message })
    };
  }
};