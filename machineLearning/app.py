from flask import Flask, request, jsonify
import joblib  # for scikit-learn models
import pandas as pd

app = Flask(__name__)

# Load the model
model = joblib.load(r'machineLearning\model.pkl') 
encoders = joblib.load(r'machineLearning\label_encoders_selected.pkl')
scaler = joblib.load(r'machineLearning\StandardScaler_selected.pkl')
selected_features = joblib.load(r'machineLearning\selected_features.pkl')

@app.route('/')
def home():
    return jsonify({"message": "Flask API is running!"})

@app.route('/predict', methods=['POST'])
def predict():

    if not request.is_json:
       return jsonify({"error": "Request must be JSON"}), 400

    data = request.get_json()
    features = data.get('features')

    if not features:
        return jsonify({"error": "No features provided"}), 400

    try:
        # Step 1: Create DataFrame from input
        input_df = pd.DataFrame([features])

        # Step 2: Apply Label Encoding on selected categorical columns
        for col, le in encoders.items():
            if col in input_df.columns:
                input_df[col] = input_df[col].apply(lambda x: x if x in le.classes_ else 'unknown')
                input_df[col] = le.transform(input_df[col])

        # Step 3: Ensure correct feature order and select only used columns
        input_df = input_df.reindex(columns=selected_features)

        # Step 4: Scale the inputs
        input_scaled = scaler.transform(input_df)

        # Step 5: Predict
        prediction = model.predict(input_scaled)
        is_fraud = bool(prediction[0])  # Example: 1 = Fraud, 0 = No Fraud

        return jsonify({'fraud': is_fraud})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)

