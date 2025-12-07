"""
Code Explainer Backend API
FastAPI/Flask server that provides REST endpoints for code explanation
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import sys
from pathlib import Path

# Add the CLI code to path
cli_path = Path(__file__).parent.parent / "code-explainer-cli" / "code-explainer-cli"
sys.path.insert(0, str(cli_path / "src"))

try:
    from prompts import build_prompt
    from llm_client import call_llm
    from parser import parse_response
except ImportError as e:
    print(f"Warning: Could not import CLI modules: {e}")
    print("Make sure the code-explainer-cli is installed or PYTHONPATH is configured correctly")

app = Flask(__name__)
CORS(app)

# Configuration
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max request size
DEFAULT_MODEL = os.getenv("LLM_MODEL", "Qwen/Qwen2.5-Coder-32B-Instruct")


@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({"status": "healthy", "message": "Code Explainer API is running"}), 200


@app.route('/explain', methods=['POST'])
def explain_code():
    """
    Explain code snippet
    
    Request body:
    {
        "code": "string - code to explain",
        "language": "string - programming language (optional, default: auto-detect)"
    }
    
    Response:
    {
        "summary": "string - high level summary",
        "line_explanations": [
            {
                "line": int,
                "code": "string - actual code",
                "explanation": "string - explanation"
            }
        ],
        "tests": [
            {
                "name": "string - test name",
                "description": "string - what it tests",
                "example": "string - example test code"
            }
        ],
        "error": "string - error message if failed"
    }
    """
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({"error": "Request body must be JSON"}), 400
        
        code = data.get('code', '').strip()
        language = data.get('language', 'unknown').lower()
        
        if not code:
            return jsonify({"error": "Code snippet is required"}), 400
        
        if len(code) > 50000:
            return jsonify({"error": "Code snippet is too long (max 50000 characters)"}), 400
        
        # Build prompt with language hint
        prompt = build_prompt(code, lang_hint=language if language != 'unknown' else None)
        
        # Call LLM
        raw_response = call_llm(prompt, model=DEFAULT_MODEL)
        
        # Parse response
        parsed = parse_response(raw_response)
        
        return jsonify(parsed), 200
        
    except ValueError as e:
        return jsonify({"error": f"Invalid request: {str(e)}"}), 400
    except RuntimeError as e:
        return jsonify({"error": f"API Error: {str(e)}"}), 503
    except Exception as e:
        print(f"Unexpected error: {str(e)}")
        import traceback
        traceback.print_exc()
        return jsonify({"error": "Internal server error: " + str(e)}), 500


@app.route('/models', methods=['GET'])
def list_models():
    """List available models (for future use)"""
    return jsonify({
        "default": DEFAULT_MODEL,
        "available": [
            "Qwen/Qwen2.5-Coder-32B-Instruct",
            "bigcode/starcoder",
            "codellama/CodeLlama-7b-hf",
            "meta-llama/Llama-3.2-3B-Instruct",
            "gpt2"
        ]
    }), 200


@app.errorhandler(404)
def not_found(error):
    """Handle 404 errors"""
    return jsonify({"error": "Endpoint not found"}), 404


@app.errorhandler(405)
def method_not_allowed(error):
    """Handle 405 errors"""
    return jsonify({"error": "Method not allowed"}), 405


if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    debug = os.getenv('DEBUG', 'false').lower() == 'true'
    
    print(f"""
    ╔════════════════════════════════════════════╗
    ║     Code Explainer Backend API Server       ║
    ╚════════════════════════════════════════════╝
    
    API Server: http://localhost:{port}
    Debug Mode: {debug}
    LLM Model: {DEFAULT_MODEL}
    
    Available Endpoints:
    - GET  /health        - Health check
    - POST /explain       - Explain code
    - GET  /models        - List available models
    
    Set HF_TOKEN environment variable for Hugging Face models:
    export HF_TOKEN='hf_your_token_here'
    """)
    
    app.run(host='0.0.0.0', port=port, debug=debug)
