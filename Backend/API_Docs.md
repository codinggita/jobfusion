# JOB_FUSION API Documentation

## Overview

JOB_FUSION is a powerful and feature-rich job search platform providing a seamless experience for job seekers and employers. This documentation outlines the backend API endpoints used in the JOB_FUSION application. The APIs are designed to handle job searches, user authentication, job saving, reviews, and newsletter subscriptions.

The JOB_FUSION API follows RESTful principles and uses JSON for data exchange. This documentation will guide you through the available endpoints, their usage, and request/response formats.

## Base URL

```
https://jobfusion.onrender.com/api
```

For local development:

```
http://localhost:3000/api
```

## Authentication

Some API endpoints require user authentication. Ensure you register and log in to obtain the necessary credentials before accessing protected routes.

## API Sections

- **JOBS_API**: Endpoints for fetching job-related data, including random jobs, job search, and trending jobs.
- **AUTHENTICATION**: Endpoints for user registration and login.
- **SAVEJOBS**: Endpoints for saving, viewing, and unsaving jobs.
- **REVIEWS**: Endpoints for posting and retrieving user reviews.
- **NEWSLETTER**: Endpoints for subscribing to the newsletter.

Let’s dive into the details of each API section below.

---

## JOBS_API

This section provides APIs related to job search and job listings. These APIs help users explore job opportunities by fetching random jobs, searching for specific roles based on filters, and viewing trending job listings.

### Random Job API

**Endpoint:**

```
GET /jobs/random
```

**Description:**
Fetches a random list of jobs.

**Query Parameters:**

- `count` (integer): Number of job results to return (e.g., 18)

**Example Request:**

```
GET https://jobfusion.onrender.com/api/jobs/random?count=18
```

**Response:**

```json
[
  {
    "id": "123456",
    "title": "Frontend Developer",
    "company": "TechCorp",
    "location": "Remote",
    "salary": 60000,
    "description": "Exciting opportunity for a frontend developer...",
    "redirect_url": "https://example.com/job/123456"
  }
]
```

---

### Search API

**Endpoint:**

```
GET /jobs/search
```

**Description:**
Searches for jobs based on title, location, and salary range.

**Query Parameters:**

- `what` (string): Job title (e.g., developer)
- `where` (string): Job location (e.g., London)
- `salary_min` (integer): Minimum salary (e.g., 30000)
- `salary_max` (integer): Maximum salary (e.g., 60000)

**Example Request:**

```
GET https://jobfusion.onrender.com/api/jobs/search?what=developer&where=london&salary_min=30000&salary_max=60000
```

**Response:**

```json
[
  {
    "id": "987654",
    "title": "Full Stack Developer",
    "company": "Innovate Ltd",
    "location": "London",
    "salary": 55000,
    "description": "We’re looking for a talented full stack developer...",
    "redirect_url": "https://example.com/job/987654"
  }
]
```

---

### Trending Jobs API

**Endpoint:**

```
GET /jobs/trending
```

**Description:**
Retrieves a list of currently trending jobs.

**Example Request:**

```
GET https://jobfusion.onrender.com/api/jobs/trending
```

**Response:**

```json
[
  {
    "id": "112233",
    "title": "Senior Backend Engineer",
    "company": "FastTrack Solutions",
    "location": "India",
    "salary": 75000,
    "description": "Join a fast-growing team working on scalable solutions...",
    "redirect_url": "https://example.com/job/112233"
  }
]
```

---

## AUTHENTICATION

This section covers user registration and login functionalities.

### Register API

**Endpoint:**

```
POST /users/register
```

**Description:**
Registers a new user on the platform.

**Request Body:**

```json
{
  "username": "USER_TRY_001",
  "email": "USER_TRY_001@gmail.com",
  "password": "USER_TRY_001",
  "experienceLevel": "Fresher"
}
```

**Example Request:**

```
POST https://jobfusion.onrender.com/api/users/register
```

**Response:**

```json
{
  "message": "User registered successfully"
}
```

---

### Login API

**Endpoint:**

```
POST /users/login
```

**Description:**
Logs in a registered user.

**Request Body:**

```json
{
  "email": "user001@gmail.com",
  "password": "1.user001"
}
```

**Example Request:**

```
POST https://jobfusion.onrender.com/api/users/login
```

**Response:**

```json
{
  "token": "eyJhbGciOiJIUzI1..."
}
```

---

## SAVEJOBS

### Save Job API

**Endpoint:**

```
POST /jobs/save
```

**Description:**
Saves a job to the user’s saved job list.

**Request Body:**

```json
{
  "email": "USER_TRY_002@gmail.com",
  "jobData": {
    "id": "4743852414",
    "jobTitle": "STL Test Engineer 2",
    "companyName": "Staff4Me",
    "location": "India",
    "salary": 777383.99,
    "description": "Staff4Me is currently seeking an experienced STL Test Engineer...",
    "redirect_url": "https://www.adzuna.in/details/4743852414"
  }
}
```

---

## REVIEWS

### Post Review API

**Endpoint:**

```
POST /reviews
```

**Description:**
Posts a review for the platform.

**Request Body:**

```json
{
  "username": "User_try_001",
  "rating": 5,
  "review": "This platform is amazing! Highly recommended."
}
```

---

## NEWSLETTER

### Subscribe API

**Endpoint:**

```
POST /newstailer
```

**Description:**
Subscribes a user to the newsletter.

**Request Body:**

```json
{
  "email": "example@example.com"
}
```

