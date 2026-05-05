# Mindcraft API Documentation

Complete API reference for Mindcraft Event Registration Platform.

## Base URL
```
http://localhost:3000
```

## Authentication
No authentication required (public API)

## Response Format

All responses are in JSON format:

### Success Response
```json
{
  "success": true,
  "message": "Description of what happened",
  "data": { /* response data */ }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "error": "Technical error details"
}
```

---

## Endpoints

### 1. GET / - Homepage
Serves the registration form.

**URL:** `GET http://localhost:3000/`

**Response:** HTML page with registration form

**Status Code:** 200

---

### 2. POST /register - Register for Event

Register a participant for an event.

**URL:** `POST http://localhost:3000/register`

**Content-Type:** `application/json`

**Request Body:**
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "phoneNumber": "9876543210",
  "collegeName": "ABC Engineering College",
  "department": "Computer Science",
  "year": "2nd Year",
  "eventName": "Web Development Workshop"
}
```

**Field Validation:**
| Field | Type | Required | Rules |
|-------|------|----------|-------|
| fullName | string | Yes | 3-100 chars, letters only |
| email | string | Yes | Valid email format |
| phoneNumber | string | Yes | Exactly 10 digits |
| collegeName | string | Yes | 3-100 chars |
| department | string | Yes | Must be valid option |
| year | string | Yes | 1st/2nd/3rd/4th Year |
| eventName | string | Yes | Must be valid event |

**Success Response (201):**
```json
{
  "success": true,
  "message": "Registration successful! Thank you for registering.",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "fullName": "John Doe",
    "email": "john@example.com",
    "phoneNumber": "9876543210",
    "collegeName": "ABC Engineering College",
    "department": "Computer Science",
    "year": "2nd Year",
    "eventName": "Web Development Workshop",
    "registeredAt": "2024-05-05T10:30:00.000Z"
  }
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "All fields are required",
  "error": "Email is required"
}
```

**Error Response (500):**
```json
{
  "success": false,
  "message": "An error occurred during registration. Please try again.",
  "error": "Error details here"
}
```

**Status Codes:**
- `201` - Registration successful
- `400` - Bad request (missing/invalid fields)
- `500` - Server error (MongoDB issue, etc.)

**Example cURL:**
```bash
curl -X POST http://localhost:3000/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "John Doe",
    "email": "john@example.com",
    "phoneNumber": "9876543210",
    "collegeName": "ABC Engineering College",
    "department": "Computer Science",
    "year": "2nd Year",
    "eventName": "Web Development Workshop"
  }'
```

**Example JavaScript (fetch):**
```javascript
fetch('http://localhost:3000/register', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    fullName: 'John Doe',
    email: 'john@example.com',
    phoneNumber: '9876543210',
    collegeName: 'ABC Engineering College',
    department: 'Computer Science',
    year: '2nd Year',
    eventName: 'Web Development Workshop'
  })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
```

**Example jQuery (AJAX):**
```javascript
$.ajax({
  url: 'http://localhost:3000/register',
  type: 'POST',
  contentType: 'application/json',
  data: JSON.stringify({
    fullName: 'John Doe',
    email: 'john@example.com',
    phoneNumber: '9876543210',
    collegeName: 'ABC Engineering College',
    department: 'Computer Science',
    year: '2nd Year',
    eventName: 'Web Development Workshop'
  }),
  success: function(response) {
    if (response.success) {
      alert('Registration successful!');
    }
  },
  error: function(xhr) {
    alert('Registration failed: ' + xhr.responseJSON.message);
  }
});
```

---

### 3. GET /api/registrations - Get All Registrations

Fetch all event registrations (for admin purposes).

**URL:** `GET http://localhost:3000/api/registrations`

**Query Parameters:** None

**Success Response (200):**
```json
{
  "success": true,
  "count": 5,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "fullName": "John Doe",
      "email": "john@example.com",
      "phoneNumber": "9876543210",
      "collegeName": "ABC Engineering College",
      "department": "Computer Science",
      "year": "2nd Year",
      "eventName": "Web Development Workshop",
      "registeredAt": "2024-05-05T10:30:00.000Z"
    },
    {
      "_id": "507f1f77bcf86cd799439012",
      "fullName": "Jane Smith",
      "email": "jane@example.com",
      "phoneNumber": "9876543211",
      "collegeName": "XYZ University",
      "department": "Information Technology",
      "year": "3rd Year",
      "eventName": "AI & Machine Learning",
      "registeredAt": "2024-05-05T10:35:00.000Z"
    }
  ]
}
```

**Error Response (500):**
```json
{
  "success": false,
  "message": "Error fetching registrations",
  "error": "MongoDB connection failed"
}
```

**Status Codes:**
- `200` - Successfully fetched registrations
- `500` - Server error

**Example cURL:**
```bash
curl http://localhost:3000/api/registrations
```

**Example JavaScript (fetch):**
```javascript
fetch('http://localhost:3000/api/registrations')
  .then(response => response.json())
  .then(data => {
    console.log(`Total registrations: ${data.count}`);
    console.log(data.data);
  })
  .catch(error => console.error('Error:', error));
```

---

## Valid Option Values

### Department Options
- Computer Science
- Electronics
- Mechanical
- Electrical
- Civil
- Chemical
- Information Technology
- Biotechnology
- Other

### Year Options
- 1st Year
- 2nd Year
- 3rd Year
- 4th Year

### Event Options
- Tech Summit 2024
- Web Development Workshop
- AI & Machine Learning
- Hackathon
- Startup Pitch
- Cloud Computing
- DevOps Bootcamp
- Networking Event

---

## Error Handling

### Common Error Codes

| Status | Message | Cause |
|--------|---------|-------|
| 400 | All fields are required | Missing required field |
| 400 | Invalid email format | Email doesn't match pattern |
| 400 | Phone must be 10 digits | Invalid phone number |
| 500 | MongoDB connection error | Database not available |
| 500 | Internal Server Error | Unexpected error |

### Error Handling in Frontend

```javascript
$.ajax({
  url: '/register',
  type: 'POST',
  data: JSON.stringify(formData),
  contentType: 'application/json',
  success: function(response) {
    if (response.success) {
      // Show success message
      alert(response.message);
    }
  },
  error: function(xhr, status, error) {
    // Handle error
    if (xhr.status === 400) {
      alert('Validation Error: ' + xhr.responseJSON.message);
    } else if (xhr.status === 500) {
      alert('Server Error: ' + xhr.responseJSON.message);
    } else {
      alert('An unexpected error occurred');
    }
  }
});
```

---

## Rate Limiting
Currently no rate limiting is implemented. In production, add rate limiting using middleware like `express-rate-limit`.

---

## CORS Policy
CORS is enabled for all origins. For production, configure to specific domains only.

**Current Configuration:**
```javascript
app.use(cors()); // All origins allowed
```

**Production Configuration:**
```javascript
app.use(cors({
  origin: ['https://yourdomain.com', 'https://app.yourdomain.com'],
  credentials: true
}));
```

---

## Pagination
Not implemented. All registrations are returned at once. For large datasets, implement pagination in future versions.

---

## Testing Checklist

- [ ] POST /register with valid data returns 201
- [ ] POST /register with missing field returns 400
- [ ] POST /register with invalid email returns 400
- [ ] POST /register with invalid phone returns 400
- [ ] GET /api/registrations returns all registrations
- [ ] GET / returns HTML form
- [ ] Data is correctly stored in MongoDB
- [ ] Timestamps are set correctly
- [ ] Error messages are helpful

---

## Example Integration

### Frontend Form Submission
```javascript
$('#registrationForm').on('submit', function(e) {
  e.preventDefault();
  
  const formData = {
    fullName: $('#fullName').val(),
    email: $('#email').val(),
    phoneNumber: $('#phoneNumber').val(),
    collegeName: $('#collegeName').val(),
    department: $('#department').val(),
    year: $('#year').val(),
    eventName: $('#eventName').val()
  };
  
  $.ajax({
    url: '/register',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(formData),
    success: function(response) {
      if (response.success) {
        alert('Successfully registered!');
        $('#registrationForm')[0].reset();
      }
    },
    error: function(xhr) {
      alert('Error: ' + xhr.responseJSON.message);
    }
  });
});
```

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2024-05-05 | Initial release with registration endpoints |

---

## Support

For API issues or questions:
1. Check error messages in response
2. Review browser console (F12)
3. Check server logs
4. Refer to README.md for setup help

---

Last Updated: 2024-05-05
