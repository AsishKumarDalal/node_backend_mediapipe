# Node Backend MediaPipe API

A Node.js Express backend API for user authentication and AI-powered video analysis using MediaPipe. This API allows users to register, login, upload videos for analysis, and download the analyzed results.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Data Models](#data-models)
- [Authentication](#authentication)
- [Error Handling](#error-handling)
- [Dependencies](#dependencies)

## Features

- User registration and login with JWT authentication
- Video upload and AI analysis using MediaPipe
- Download analyzed video results
- MongoDB integration for data storage
- Secure password hashing with bcrypt
- File upload handling with multer

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd node_backend_mediapipe
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables (see [Environment Variables](#environment-variables))

4. Start the server:
   ```bash
   node app.js
   ```

The server will run on `http://localhost:3000`.

## Environment Variables

Create a `.env` file in the root directory with the following variables:

- `MONGO_URL`: MongoDB connection string
- `AI_BASE_URL`: Base URL for the AI/MediaPipe service
- `JWT_SECRET`: Secret key for JWT token generation (default: "hono")

Example:
```
MONGO_URL=mongodb://localhost:27017/mediapipe_db
AI_BASE_URL=http://localhost:5000
JWT_SECRET=your_secret_key
```

## Usage

After starting the server, you can interact with the API using tools like Postman or curl. The API supports JSON requests and file uploads.

## API Endpoints

### Authentication

#### Register User
- **Endpoint**: `POST /register`
- **Description**: Register a new user account
- **Request Body** (JSON):
  ```json
  {
    "email": "user@example.com",
    "password": "password123",
    "fullName": "John Doe",
    "dateOfBirth": "1990-01-01",
    "gender": "Male",
    "height_cm": 180,
    "weight_kg": 75,
    "phoneNumber": "+1234567890",
    "address": {
      "street": "123 Main St",
      "city": "Anytown",
      "state": "CA",
      "pincode": "12345"
    },
    "level": "Intermediate",
    "specialConditions": {
      "injuries": [
        {
          "injuryType": "Sprained Ankle",
          "dateOfInjury": "2023-06-15",
          "severity": "Mild",
          "treatment": "Rest and ice",
          "recovered": true
        }
      ]
    }
  }
  ```
- **Response** (JSON):
  ```json
  {
    "success": true,
    "message": "Login successful",
    "token": "jwt_token_here"
  }
  ```
- **Error Response**:
  ```json
  {
    "success": false,
    "message": "Email already registered"
  }
  ```

#### Login User
- **Endpoint**: `POST /login`
- **Description**: Authenticate user and get JWT token
- **Request Body** (JSON):
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Response** (JSON):
  ```json
  {
    "response": {
      "success": true,
      "message": "Login successful",
      "token": "jwt_token_here"
    }
  }
  ```
- **Error Response**:
  ```json
  {
    "response": {
      "success": false,
      "message": "Invalid email or password"
    }
  }
  ```

### AI Analysis

#### Analyze Video
- **Endpoint**: `POST /analyze`
- **Description**: Upload a video file for AI analysis using MediaPipe
- **Request**: Multipart/form-data
  - Field: `video` (file upload)
- **Response** (JSON):
  ```json
  {
    "message": "Video uploaded successfully",
    "response": {
      // AI service response data
    }
  }
  ```
- **Error Response**:
  ```json
  {
    "error": "No video file uploaded"
  }
  ```

#### Download Analyzed Video
- **Endpoint**: `GET /download_analysis/:video_id`
- **Description**: Download the analyzed video result
- **Parameters**:
  - `video_id` (URL parameter): ID of the analyzed video
- **Response**: Video file stream (MP4)
- **Headers**:
  - `Content-Type`: video/mp4
  - `Content-Disposition`: attachment; filename=video.mp4

## Data Models

### PersonalInfo
User profile information stored in MongoDB.

**Schema**:
- `fullName` (String, required)
- `dateOfBirth` (Date, optional)
- `gender` (String, enum: "Male", "Female", "Other", optional)
- `height_cm` (Number, optional)
- `weight_kg` (Number, optional)
- `phoneNumber` (String, optional)
- `email` (String, required, unique, lowercase)
- `password` (String, required, hashed)
- `address` (Object):
  - `street` (String)
  - `city` (String, optional)
  - `state` (String, optional)
  - `pincode` (String, optional)
- `level` (String, optional)
- `specialConditions` (Object):
  - `injuries` (Array of Injury objects)
- `timestamps` (createdAt, updatedAt)

### Injury
Sub-schema for injuries in specialConditions.

**Schema**:
- `injuryType` (String, optional)
- `dateOfInjury` (Date, optional)
- `severity` (String, enum: "Mild", "Moderate", "Severe", optional)
- `treatment` (String, optional)
- `recovered` (Boolean, default: false)

### Drill
Performance drill data (not currently used in API endpoints).

**Schema**:
- `userId` (ObjectId, ref: "PersonalInfo", required)
- `sprint` (Number, optional)
- `jump` (Number, optional)
- `shooting` (Number, optional)
- `timestamps` (createdAt, updatedAt)

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. Upon successful login or registration, a token is returned. Include this token in the Authorization header for protected routes:

```
Authorization: Bearer <jwt_token>
```

Note: Currently, no endpoints require authentication, but the `protect` middleware is available for future implementation.

## Error Handling

The API returns appropriate HTTP status codes and JSON error messages:

- `200`: Success
- `400`: Bad Request (e.g., missing file upload)
- `401`: Unauthorized (invalid token)
- `500`: Internal Server Error

Error responses follow this format:
```json
{
  "error": "Error message"
}
```

## Dependencies

- **express**: Web framework
- **mongoose**: MongoDB ODM
- **jsonwebtoken**: JWT handling
- **bcryptjs**: Password hashing
- **multer**: File upload handling
- **axios**: HTTP client for AI service communication
- **express-async-handler**: Async error handling
- **cors**: Cross-origin resource sharing
- **dotenv**: Environment variable management

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the ISC License.
