const https = require("https"); // Import the https library

const myData = [
  {
    text: "Hey there! 🚀 I'm VJS Pranavasri, your go-to guy for all things tech. I'm an aspiring Full Stack Engineer, an OS developer at heart, and a DevOps enthusiast who finds joy in demystifying the tech world for others. I love open sourcing my work. Check out my website at vjspranav.dev for more about my work and projects.",
    // labels: ["Personal", "Projects", "Skills"],
    labels: [
      "about",
      "personal",
      "introduction",
      "Full Stack Engineer",
      "OS developer",
      "DevOps",
      "open source",
      "website",
      "portfolio",
      "projects",
    ],
  },
  {
    text: "My journey includes zapping bugs and deploying features as a Backend Developer Intern at Thinkskill, where I concocted a nifty backend system for managing restaurant orders and tips with MySQL, Express, and Node.js. I've also dabbled as a Software Developer Intern at Virtual Labs, giving old webpages a new lease on life beyond Flash and Java.",
    // labels: ["Experience", "Projects"],
    labels: ["experience", "work", "internship"],
  },
  {
    text: "At Thinkskill, I was a backend intern. I built a backend system for managing restaurant orders and tips with MySQL, Express, and Node.js. I single-handedly developed the entire backend system. We had daily standups and used agile methodologies to ensure we were on track.",
    // labels: ["Experience", "Projects"],
    labels: [
      "experience",
      "work",
      "internship",
      "backend",
      "MySQL",
      "Express",
      "Node.js",
      "agile",
    ],
  },
  {
    text: "At Virtual Labs, I was a software developer intern. I worked on migrating old webpages from Flash and Java to modern web technologies. I worked with a team of 3 and we used agile methodologies to ensure we were on track. I also developed a webcomponent for the bug reporting with AWS lambda and Node JS and integrated it with GitHub issues. Apart from this I also worked on enhancing their build system and CI/CD pipeline.",
    // labels: ["Experience", "Projects"],
    labels: [
      "experience",
      "work",
      "internship",
      "frontend",
      "Flash",
      "Java",
      "AWS",
      "Node.js",
      "agile",
      "lambda",
      "CI/CD",
    ],
  },
  {
    text: "I'm the lead developer and co-founder of Stag-OS, where I have supported over 14 devices with more than 100,000 downloads. It is a custom ROM developed from scratch based on AOSP. In this process, I have gained huge experience in working with servers, Linux systems, Java, GitHub CI/CD using Jenkins, and Bug reporting/reviewing through Gerrit. motivation for stag was the fact that Stag was Harry's patronus and those horns represent elegance. 'Sic Parvis Magna' is also the motto for my StagOS. StagOS website: stag-os.org.",
    // labels: ["Projects", "StagOS"],
    labels: [
      "projects",
      "Stag-OS",
      "AOSP",
      "servers",
      "linux",
      "Java",
      "CI/CD",
      "Jenkins",
      "gerrit",
      "github",
      "git",
    ],
  },
  {
    text: "Ever heard of Stagbin? That's my brainchild too, a pastebin with bells and whistles like auto-complete support, diff viewing, and even client-side encryption for those top-secret pastes. The reason I built Stagbin was that my favorite pastebin was taken down and I didn't want to be dependent anymore. I built it using NodeJS, Express, MongoDB, and React. Later migrated to AWS and used AWS Lambda for serverless functions and DynamoDB for storage. It's completely open source and free and you can find it on GitHub at https://github.com/StagBIN. It is deployed on stagb.in",
    // labels: ["Projects", "Stagbin"],
    labels: [
      "projects",
      "Stagbin",
      "pastebin",
      "NodeJS",
      "Express",
      "MongoDB",
      "React",
      "AWS",
      "Lambda",
      "DynamoDB",
      "github",
      "git",
      "open source",
      "MERN",
    ],
  },
  {
    text: "My proficiencies include JavaScript, Python, C/C++ in which I am very strong with.",
    // labels: ["Skills"],
    labels: [
      "skills",
      "languages",
      "JavaScript",
      "Python",
      "C/C++",
      "proficiencies",
    ],
  },
  {
    text: "Languages I am comfortable with are Go Lang, Haskell, Dart, Java, Solidity, Elm, and Racket. I have worked on a few projects with these languages and have a good understanding of them. I have a very personal interest in Racket due to its functional and recursive nature. I have built a compiler for a subset of racket.",
    // labels: ["Skills"],
    labels: [
      "skills",
      "languages",
      "Go Lang",
      "Haskell",
      "Dart",
      "Java",
      "Solidity",
      "Elm",
      "Racket",
      "functional",
      "recursive",
      "compiler",
      "comfortable",
    ],
  },
  {
    text: "I have a keen interest in ReactJS, Express, and, of course, NodeJS. I have worked on a few projects such as Job Management [MERN], pastebin [MERN], etc., with these technologies and have a good understanding of them. I have also worked on a few projects with Socket.io, specifically a watch party application. Databases? I've got MySQL, MongoDB, and DynamoDB under my belt along with a bit of PostgreSQL. I have worked on a few projects with these databases and have a good understanding of them.",
    // labels: ["Skills"],
    labels: [
      "skills",
      "frameworks",
      "ReactJS",
      "Express",
      "NodeJS",
      "Socket.io",
      "projects",
      "Job Management",
      "pastebin",
      "watch party",
      "Databases",
      "MySQL",
      "MongoDB",
      "DynamoDB",
      "PostgreSQL",
    ],
  },
  {
    text: "Clouds? Love 'em! I navigate through AWS and Google Cloud like a pro, thanks to my trusty companions Git, Jenkins, and GitHub Actions.",
    // labels: ["Skills", "Cloud Services"],
    labels: [
      "skills",
      "cloud",
      "AWS",
      "Google Cloud",
      "git",
      "Jenkins",
      "Github Actions",
    ],
  },
  {
    text: "tools I am comfortable with are Git, Jenkins, and GitHub Actions. I have worked on a few projects with these tools and have a good understanding of them. I automate all of my backend and frontend works using GitHub actions and all my OS releases are done using Jenkins.",
    // labels: ["Skills"],
    labels: [
      "skills",
      "tools",
      "git",
      "Jenkins",
      "Github Actions",
      "automate",
      "OS releases",
      "Stag-OS",
    ],
  },
  {
    text: "Currently honing my skills and expanding my knowledge at IIITH, where I'm tackling a BTech + MS in Computer Science with a CGPA of 8.39. When I'm not coding, I'm leading the Cloud at GDSC IIIT-H, assisting in research, or sharing my knowledge as a Teaching Assistant.",
    // labels: ["Education"],
    labels: ["education", "IIITH", "CGPA", "GDSC IIIT-H", "TA"],
  },
  {
    text: "I have TAed for Discrete Structures, Software Engineering, and Operating Systems. I have had a great experience in teaching and have been able to learn a lot from the students. I have also been able to help them in their projects and have been able to guide them in the right direction.",
    // labels: ["Education"],
    labels: [
      "education",
      "TA",
      "Discrete Structures",
      "Software Engineering",
      "Operating Systems",
      "projects",
      "guide",
    ],
  },
  {
    text: "I have been an RA at Smart City Research Center(SCRC), IIITH. I have worked on a few projects specifically around interoperability of IoT devices and have published a paper: https://www.researchgate.net/publication/373929456_Scalable_and_Interoperable_Distributed_Architecture_for_IoT_in_Smart_Cities",
    // labels: ["Education", "Research"],
    labels: [
      "education",
      "RA",
      "Smart City Research Center",
      "SCRC",
      "IoT",
      "interopability",
      "paper",
      "research",
    ],
  },
  {
    text: "Scalable and Interoperable Distributed Architecture for IoT in Smart Cities is my paper that got accepted in WF-IoT 2023. I worked on this paper as a part of my MS Research at Smart City Research Center(SCRC), IIITH. The paper is about the interoperability of IoT devices and how to make them scalable. The paper is available at https://www.researchgate.net/publication/373929456_Scalable_and_Interoperable_Distributed_Architecture_for_IoT_in_Smart_Cities",
    labels: [
    "research",       
    "IoT",
    "interopability",
    "paper",
    "paper-1",
  ],
  },
  {
    text: "Exploratory Study of oneM2M-based Interoperability Architectures for IoT: A Smart City Perspective is my second paper that got accepted in SAIP track of ICSA 2024. I will be publishing in preprint soon. It is not under review, it has been accepted.",
    // labels: ["Research"],
    labels: [
      "research",       
      "IoT",
      "interopability",
      "paper",
      "paper-2",
    ],  
  },
  {
    text: "My favorite quotes include, 'Manners Maketh Man' (Heard it in Kingsman but a classic), 'Sic Parvis Magna'. 'Sic Parvis Magna' is also the motto for my StagOS. In a nutshell",
    // labels: ["Personal", "Contact"],
    labels: ["personal", "quotes", "Sic Parvis Magna", "StagOS"],
  },
  {
    text: 'contact: "email: pranavasri@live.in, linkedin: https://linkedin.com/in/vjspranav, website: https://vjspranav.dev/contact"',
    // labels: ["Contact"],
    labels: ["contact", "email", "linkedin", "website"],
  },
];

const candidateLabels = [
  ...new Set(myData.flatMap((data) => data.labels)),
];

const highlyPersonalLabels = [
  "Relationships",
  "Beliefs",
  "Finances",
  "Health",
  "Mental Health",
  "Appearance",
];

async function classifyText(text, httpsPost) {
  const api_key = process.env.HF_API_KEY;

  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + api_key,
  };

  // First check personal
  const rawPers = JSON.stringify({
    inputs: text,
    parameters: {
      candidate_labels: highlyPersonalLabels,
    },
  });

  // Check if the text is highly personal
  const persRes = await httpsPost({
    hostname: "api-inference.huggingface.co",
    path: "/models/facebook/bart-large-mnli",
    headers: headers,
    body: rawPers,
  });

  // If the text is highly personal, return the label
  if (persRes.statusCode === 200) {
    const persResult = persRes.data;
    // Ensure the text is highly personal and does not fall under the other categories with high confidence
    if (persResult.scores[0] > 0.7) {
      return {
        labels: [persResult.labels[0]],
        text: text,
        personal: true,
      };
    }
  }

  // score label, score
  let topLabels = [];
  let topScores = [];
  // I can only use 10 labels at a time
  for (let i = 0; i < candidateLabels.length; i += 10) {
    const labels = candidateLabels.slice(i, i + 10);
    const raw = JSON.stringify({
      inputs: text,
      parameters: {
        candidate_labels: labels.join(","),
        multi_label: true,
      },
    });

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

          let tempTopLabels = [];
          let tempTopScores = [];
          for (let i = 0; i < result.labels.length; i++) {
            if (result.scores[i] > 0.7) {
              tempTopLabels.push(result.labels[i]);
              tempTopScores.push(result.scores[i]);
            }
          }

          if (tempTopLabels.length === 0) {
            tempTopLabels = result.labels.slice(0, 3);
            tempTopScores = result.scores.slice(0, 3);
          }

          topLabels = topLabels.concat(tempTopLabels);
          topScores = topScores.concat(tempTopScores);
        } else {
          console.warn(
            `Request failed with status ${response.statusCode}. Retrying...`
          );
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  }

  let labelsToUse = [];
  if (topLabels.length === 0) {
    topLabels = labels;
    topScores = Array(labels.length).fill(0.5);
    labelsToUse = topLabels;
  }else{
    // sort topLabels based on topScores both are arrays of the same length
    const topLabelsScores = topLabels.map((label, index) => {
      return { label: label, score: topScores[index] };
    });
    topLabelsScores.sort((a, b) => b.score - a.score);
    let sortedTopLabels = topLabelsScores.map((labelScore) => labelScore.label);
    labelsToUse = sortedTopLabels.slice(0, 5).push("contact");
  }


  // fetch all texts with the topLabels
  const texts = myData.filter((data) => {
    return data.labels.some((label) => labelsToUse.slice.includes(label));
  });
  // Unique texts
  const uniqueTexts = [...new Set(texts.map((text) => text.text))];
  // Concatenate all texts
  const concatenatedText = uniqueTexts.join(" ");
  return {
    topLabels: topLabels,
    topScores: topScores,
    labels: labelsToUse,
    text: concatenatedText,
  };
}

module.exports = { classifyText };
