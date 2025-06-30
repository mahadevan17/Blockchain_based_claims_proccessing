<h2>👋 Greetings</h2>

<p>This project focuses on <b>detecting fraudulent patient insurance claims</b> using <b>Machine Learning algorithms</b>, while <b>securely storing</b> them on the <b>blockchain</b>.</p>

<p>Traditional insurance claim systems often suffer from <b>loopholes, corruption, and security vulnerabilities</b>. Our system aims to provide a secure, scalable, and transparent solution that is resistant to <b>fraud, tampering, and cyberattacks</b>, while maintaining <b>high reliability and availability</b> under load.</p>

<p>Compared to existing solutions, this project stands out for its strong focus on <b>transparency</b>, <b>scalability</b>, and <b>protection of patient privacy</b>.</p>

<hr>

<h2>✅ Prerequisites</h2>

<p>Before getting started, make sure the following are installed on your machine:</p>
<ul>
  <li><a href="https://nodejs.org/">Node.js</a></li>
  <li><a href="https://www.npmjs.com/">npm</a></li>
  <li><a href="https://hardhat.org/">Hardhat</a></li>
  <li><a href="https://jupyter.org/">Jupyter Notebook</a></li>
  <li><a href="https://www.python.org/">Python</a></li>
</ul>

<p>To install Hardhat and other necessary dependencies, run:</p>
<pre><code>npm install express hardhat ethers dotenv @nomicfoundation/hardhat-toolbox @nomicfoundation/hardhat-ignition</code></pre>

<hr>

<h2>🚀 Installation & Getting Started</h2>

<ol>
  <li><b>Clone the Repository</b><br>
    <pre><code>git clone &lt;repository-url&gt;
cd hardhatdeployment</code></pre>
  </li>

  <li><b>Install Node.js Dependencies</b><br>
    <pre><code>npm install</code></pre>
  </li>

  <li><b>Machine Learning Setup</b>
    <ul>
      <li>Go to the <code>machinelearning</code> folder.</li>
      <li>Download the dataset from Kaggle: 
        <a href="https://www.kaggle.com/datasets/rohitrox/healthcare-provider-fraud-detection-analysis">Healthcare Provider Fraud Detection</a>
      </li>
      <li>Run the provided <code>.ipynb</code> notebook using Jupyter Notebook.</li>
      <li>This will generate 4 <code>.pkl</code> files and 2 <code>.csv</code> files after successful execution.</li>
    </ul>
  </li>

  <li><b>Start the ML Server</b><br>
    <pre><code>python machinelearning/app.py</code></pre>
    <p>Keep this terminal open and running.</p>
  </li>

  <li><b>Start the Hardhat Local Node</b><br>
    <pre><code>npx hardhat node</code></pre>
    <p>If you see the message <code>Started HTTP and WebSocket JSON-RPC server at http://127.0.0.1:8545</code>, it's working. Keep this terminal running in the background.</p>
  </li>

  <li><b>Configure <code>hardhat.config.js</code></b>
    <ul>
      <li>Open the config file.</li>
      <li>In the <code>networks</code> section, find the <code>accounts</code> field.</li>
      <li>Replace the existing value with a private key from the <code>npx hardhat node</code> terminal output (not the account address).</li>
      <li><b>Example:</b>
        <pre><code>accounts: ['0xabc123...your_private_key_here']</code></pre>
      </li>
    </ul>
  </li>

  <li><b>Compile the Smart Contract</b><br>
    <pre><code>npx hardhat compile</code></pre>
  </li>

  <li><b>Deploy the Smart Contract</b><br>
    <pre><code>npx hardhat ignition deploy ignition/modules/SimpleStorage.js --network localhost</code></pre>
    <p>Once deployed, copy the contract address and paste it in <code>public/script.js</code> where indicated.</p>
  </li>

  <li><b>Launch the Web Interface</b><br>
    <pre><code>node server.js</code></pre>
    <p>Then open your browser and go to: <a href="http://localhost:3000">http://localhost:3000</a></p>
  </li>
</ol>
<hr>
<h2>Creating and using <code>.env</code> file</h2>
<p>
After opening the web browser, if you see the message <b>"Hardhat is connected: 20 accounts found"</b>, it means the setup was successful. However, we're not done yet — the project uses <b>PINATA</b> as its decentralized storage, so we need to set up some important API keys in a <code>.env</code> file.
</p>

<p>
To configure PINATA:
<ol>
  <li>Create an account on <a href="https://www.pinata.cloud/" target="_blank">Pinata</a>.</li>
  <li>Go to the dashboard and click on <b>"Generate API Keys"</b>.</li>
  <li>Copy the <b>API Key</b>, <b>Secret</b>, and <b>Gateway URL</b>.</li>
</ol>
</p>

<p>
Create a new file named <code>.env</code> in the root directory of the project and paste the following keys (in this format):
</p>

<pre><code>PINATA_API_KEY=your_api_key_here
PINATA_API_SECRET=your_secret_here
PINATA_API_Gateway=your_gateway_url_here
ML_API_URL=http://localhost:5000/predict</code></pre>

<p>
Once the <code>.env</code> file is saved, you're ready to run the full application.
</p>

<hr>

<h2>Input Format</h2>
<p>
For inputs, please use the format provided in the <code>.csv</code> file named <b>myTest.csv</b> located in the project directory. This file contains the structure expected by the Machine Learning model for prediction.
</p>

<hr>

<h2>📌 Notes</h2>
<ul>
  <li>Keep the Hardhat node running while using the DApp.</li>
  <li>The frontend interacts with the deployed contract via Web3.js.</li>
  <li>The machine learning server runs independently and handles fraud detection.</li>
</ul>
