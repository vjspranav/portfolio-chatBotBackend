# VJS Pranavasri's Resume Chatbot

## Overview

This project is a serverless chatbot application that leverages Google's Gemini language model and Hugging Face's zero-shot classification to provide information about VJS Pranavasri's resume and background in a conversational manner. It utilizes AWS Lambda for serverless deployment and integrates with the Gemini API and Hugging Face API for generating responses.

## Technologies Used

- **Gemini**: A large language model from Google AI, capable of generating human-like text and engaging in conversations.
- **Hugging Face Zero-Shot Classification**: A machine learning model that can classify text into one or more categories without having seen those categories during training. (Thanks to @aditya-hari for the suggestion! Allows for more flexible conversational responses.)
- **AWS Lambda**: A serverless compute service that allows you to run code without provisioning or managing servers.
- **Node.js**: A JavaScript runtime environment used for server-side scripting.

## How It Works

1. The user interacts with the chatbot through a chat interface.
2. The user's input is sent to the AWS Lambda function.
3. The Lambda function constructs a request to the Gemini API and Hugging Face API, including the user's input and relevant context from VJS Pranavasri's resume.
4. Gemini and Hugging Face generate a response based on the provided context and input.
5. The Lambda function returns the generated response to the chat interface, where it is displayed to the user.

## Running the Project

### Prerequisites

- Set up AWS Credentials: Ensure you have AWS credentials configured to access Lambda and other required services.
- Set up Hugging Face API Key: Ensure you have a Hugging Face API key configured as an environment variable (`HF_API_KEY`).

### Deployment Steps

1. **Deploy Lambda Function**: Deploy the provided Node.js code as an AWS Lambda function.
2. **Configure API Gateway**: Create an API Gateway endpoint that triggers the Lambda function when invoked.
3. **Connect Chat Interface**: Integrate the API Gateway endpoint with your chosen chat interface to enable user interaction.

## Additional Notes

- The `getResumeDetails` function within the code contains VJS Pranavasri's resume information. You can customize this function to include your own details and structure.
- The project requires the `GEMINI_API_KEY` and `HF_API_KEY` environment variables to be set with your Gemini API key and Hugging Face API key respectively.
- For detailed instructions on deploying and configuring AWS Lambda and API Gateway, refer to the official AWS documentation.
