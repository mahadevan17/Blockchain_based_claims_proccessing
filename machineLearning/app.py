from flask import Flask, request, jsonify
import joblib  # for scikit-learn models

app = Flask(__name__)

# Load the model
model = joblib.load(r'machineLearning\model.pkl') 

@app.route('/')
def home():
    return jsonify({"message": "Flask API is running!"})

@app.route('/predict', methods=['POST'])
def predict():

    if not request.is_json:
       return jsonify({"error": "Request must be JSON"}), 400

    data = request.json  # Receive JSON data
    features = data.get('features')  # Get input features
    
    if not features:
        return jsonify({'error': 'No features provided'}), 400
    
    try:
        # Prediction
        prediction = model.predict([features]) 
        is_approved = bool(prediction[0])    # Example: 1 means "approved"
        return jsonify({'approved': is_approved})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
