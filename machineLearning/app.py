from flask import Flask, request, jsonify
import joblib  # for scikit-learn models
import pandas as pd

from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=['http://localhost:3000'])

# Load the model
model1 = joblib.load(r'machineLearning\model.pkl')
#model2 = joblib.load(r'machineLearning\rmodel.pkl')
encoders = joblib.load(r'machineLearning\label_encoders_selected.pkl')
scaler = joblib.load(r'machineLearning\StandardScaler_selected.pkl')

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
        #for i in range(5,13):
        #    features[i] = int(features[i])       

        #print(features)
        cols=["BeneID","ClaimID","Provider","AttendingPhysician","OtherPhysician","ClmDiagnosisCode_1","ClmDiagnosisCode_2","State","County","InscClaimAmtReimbursed","OPAnnualReimbursementAmt","OPAnnualDeductibleAmt","Age"]
        # Create DataFrame from input
        input_df = pd.DataFrame([features], columns=cols)
        
        num_cols=["InscClaimAmtReimbursed","OPAnnualReimbursementAmt","OPAnnualDeductibleAmt","Age"]
        
        catogorical_cols=["BeneID","ClaimID","Provider","AttendingPhysician","OtherPhysician","ClmDiagnosisCode_1","ClmDiagnosisCode_2"]
        
        #Apply Label Encoding on selected categorical columns
        for col in catogorical_cols:
            le = encoders[col]
            input_df[col] = input_df[col].apply(lambda x: x if x in le.classes_ else 'unknown')
            input_df[col] = le.transform(input_df[col])
        
        #Scale the inputs
        input_df[num_cols] = scaler.transform(input_df[num_cols])
        input_df = input_df[cols]
        #print("This is input df")
        #print(input_df)    
        # Predict
        prediction = model1.predict(input_df)
        #print(prediction)
        is_fraud = bool(prediction[0])  # Example: 1 = Fraud, 0 = No Fraud
        #print(is_fraud)
        return jsonify({'fraud': is_fraud})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run()

