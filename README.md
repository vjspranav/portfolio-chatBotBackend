# VJS Pranavasri's Resume Chatbot

## Overview

This project is a serverless chatbot application that leverages Google's Gemini language model to provide information about VJS Pranavasri's resume and background in a conversational manner. It utilizes AWS Lambda for serverless deployment and integrates with the Gemini API for generating responses.

## Technologies Used

- **Gemini**: A large language model from Google AI, capable of generating human-like text and engaging in conversations.
- **AWS Lambda**: A serverless compute service that allows you to run code without provisioning or managing servers.
- **Node.js**: A JavaScript runtime environment used for server-side scripting.

## How It Works

1. The user interacts with the chatbot through a chat interface.
2. The user's input is sent to the AWS Lambda function.
3. The Lambda function constructs a request to the Gemini API, including the user's input and relevant context from VJS Pranavasri's resume.
4. Gemini generates a response based on the provided context and input.
5. The Lambda function returns the generated response to the chat interface, where it is displayed to the user.

## Running the Project

### Prerequisites

- Set up AWS Credentials: Ensure you have AWS credentials configured to access Lambda and other required services.

### Deployment Steps

1. **Deploy Lambda Function**: Deploy the provided Node.js code as an AWS Lambda function.
2. **Configure API Gateway**: Create an API Gateway endpoint that triggers the Lambda function when invoked.
3. **Connect Chat Interface**: Integrate the API Gateway endpoint with your chosen chat interface to enable user interaction.

## Additional Notes

- The `getResumeDetails` function within the code contains VJS Pranavasri's resume information. You can customize this function to include your own details and structure.
- The project requires the `GEMINI_API_KEY` environment variable to be set with your Gemini API key.
- For detailed instructions on deploying and configuring AWS Lambda and API Gateway, refer to the official AWS documentation.
