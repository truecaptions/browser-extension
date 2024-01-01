# server.py
from flask import Flask, request, jsonify
from flask_cors import CORS  
from pathlib import Path
import google.generativeai as genai
import base64

app = Flask(__name__)
CORS(app) 

genai.configure(api_key="AIzaSyDD08zTS8_TjmUqX5UuYK4-mPSKJJmN8xk")

generation_config = {
    "temperature": 0.4,
    "top_p": 1,
    "top_k": 32,
    "max_output_tokens": 4096,
}

safety_settings = [
    {"category": "HARM_CATEGORY_HARASSMENT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
    {"category": "HARM_CATEGORY_HATE_SPEECH", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
    {"category": "HARM_CATEGORY_SEXUALLY_EXPLICIT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
    {"category": "HARM_CATEGORY_DANGEROUS_CONTENT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
]

model = genai.GenerativeModel(
    model_name="gemini-pro-vision",
    generation_config=generation_config,
    safety_settings=safety_settings,
)


@app.route('/analyze', methods=['POST'])
def analyze_screenshot():
    try:
        data = request.get_json()
        screenshot_data = data.get('screenshotUrl')

        # Decode base64 image data
        image_data = base64.b64decode(screenshot_data.split(',')[1])

        # Save the image data to a file for reference
        with open('image0.png', 'wb') as image_file:
            image_file.write(image_data)

        # Use the decoded image data for analysis
        prompt_parts = [
            "I have provided a screenshot, identify whether an AI-generated content is present in the screen or not. If yes, elaborate about content and give reasons that it was AI-generated for this\n\n",
            {"mime_type": "image/png", "data": image_data},
            "\n An AI-generated content is present in the screen.\nThe coordinates of the AI-generated content detected present in the screen are:\n- Top left corner: (550, 350)\n- Bottom right corner: (1150, 750)\nYes. The reason is: The image on the right side of the screen is not a real photo. It is an AI-generated image. The colors",
        ]

        response = model.generate_content(prompt_parts)
        analysis_result = response.text

        return jsonify({"analysisResult": analysis_result})

    except Exception as e:
        return jsonify({"error": str(e)})


if __name__ == '__main__':
    app.run(debug=True)
