# Code Explainer Backend API

A Flask REST API server that provides code explanation endpoints. Wraps the Code Explainer CLI tool and exposes it via HTTP.

## Features

- 🚀 Fast REST API endpoints for code explanation
- 🔧 Integration with Hugging Face LLM models
- ⚡ Async code processing capability
- 📊 Structured JSON responses
- 🛡️ Input validation and error handling
- 📝 API documentation and examples
- 🔌 CORS enabled for frontend integration

## Prerequisites

- Python 3.8+
- pip
- Hugging Face API token (optional, for LLM access)

## Installation

### 1. Set up virtual environment

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### 2. Install dependencies

```bash
pip install -r requirements.txt
```

### 3. Configure environment

```bash
cp .env.example .env

# Edit .env and add your Hugging Face token
# export HF_TOKEN='hf_your_token_here'
```

### 4. Run the server

```bash
python app.py
```

The API will be available at `http://localhost:5000`

## API Endpoints

### Health Check

```bash
GET /health

# Response
{
  "status": "healthy",
  "message": "Code Explainer API is running"
}
```

### Explain Code

```bash
POST /explain

# Request body
{
  "code": "def add(a, b):\n    return a + b",
  "language": "python"  # optional
}

# Response
{
  "summary": "This function adds two numbers and returns the result.",
  "line_explanations": [
    {
      "line": 1,
      "code": "def add(a, b):",
      "explanation": "Defines a function named 'add' that accepts two parameters..."
    },
    {
      "line": 2,
      "code": "    return a + b",
      "explanation": "Returns the sum of the two parameters..."
    }
  ],
  "tests": [
    {
      "name": "test_add_positive",
      "description": "Test adding two positive numbers",
      "example": "assert add(2, 3) == 5"
    }
  ]
}
```

### List Available Models

```bash
GET /models

# Response
{
  "default": "Qwen/Qwen2.5-Coder-32B-Instruct",
  "available": [
    "Qwen/Qwen2.5-Coder-32B-Instruct",
    "bigcode/starcoder",
    "codellama/CodeLlama-7b-hf",
    ...
  ]
}
```

## Configuration

### Environment Variables

- `HF_TOKEN` - Hugging Face API token (required for LLM models)
- `LLM_MODEL` - Model to use (default: Qwen/Qwen2.5-Coder-32B-Instruct)
- `PORT` - Server port (default: 5000)
- `DEBUG` - Debug mode (default: false)

### Setting HF_TOKEN

```bash
# Linux/Mac
export HF_TOKEN='hf_your_token_here'

# Windows (Command Prompt)
set HF_TOKEN=hf_your_token_here

# Windows (PowerShell)
$env:HF_TOKEN='hf_your_token_here'
```

## Testing the API

### Using curl

```bash
# Test health check
curl http://localhost:5000/health

# Explain Python code
curl -X POST http://localhost:5000/explain \
  -H "Content-Type: application/json" \
  -d '{
    "code": "def hello():\n    print(\"Hello, World!\")",
    "language": "python"
  }'
```

### Using Python

```python
import requests

response = requests.post('http://localhost:5000/explain', json={
    'code': 'def add(a, b):\n    return a + b',
    'language': 'python'
})

print(response.json())
```

### Using JavaScript/Fetch

```javascript
fetch('http://localhost:5000/explain', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    code: 'def add(a, b):\n    return a + b',
    language: 'python'
  })
})
.then(res => res.json())
.then(data => console.log(data))
```

## Supported Languages

- Python
- JavaScript / TypeScript
- Java
- C / C++
- C#
- Ruby
- Go
- Rust
- PHP
- Swift
- Kotlin

## Error Responses

All error responses follow this format:

```json
{
  "error": "Error message describing what went wrong"
}
```

Status codes:
- `400` - Bad request (invalid JSON, missing code)
- `404` - Endpoint not found
- `405` - Method not allowed
- `503` - Service unavailable (LLM API error)
- `500` - Internal server error

## Deployment

### Using Docker

```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

ENV HF_TOKEN=""
ENV PORT=5000

CMD ["python", "app.py"]
```

Build and run:
```bash
docker build -t code-explainer-api .
docker run -e HF_TOKEN=your_token -p 5000:5000 code-explainer-api
```

### Using Gunicorn (Production)

```bash
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

## Performance Considerations

- Code snippets are limited to 50,000 characters
- The first request to a model may take 20-60 seconds (model loading)
- Subsequent requests are faster
- Consider implementing request queuing for high traffic

## Troubleshooting

### "HF_TOKEN is not set"

```bash
export HF_TOKEN='hf_your_token_here'
python app.py
```

### "Model not found" error

- Verify the model name is correct
- Check that you have accepted the model's terms on Hugging Face
- Try a different model from the available list

### Connection refused

- Check that the API server is running
- Verify the port is not blocked by firewall
- Check if another process is using port 5000

## License

MIT

## Support

For issues or questions, please refer to the main Code Explainer repository.
