import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Play, X, RotateCcw } from 'lucide-react';

function AssemblyPlayground() {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('Output will appear here...');
  const [status, setStatus] = useState('Ready');
  const [isLoading, setIsLoading] = useState(false);

  const handleCompile = async () => {
    setStatus('Compiling...');
    setOutput('');
    setIsLoading(true);

    try {
      // Use the proxy path that matches vite.config.ts
      const response = await axios.post('/execute', {
        script: code,
        stdin: '',
      });

      if (response.data.output) {
        setOutput(response.data.output);
        setStatus('Execution completed');
      } else {
        setOutput(response.data.error || 'Unknown error');
        setStatus('Error occurred');
      }
    } catch (err) {
      setOutput('Fetch error: ' + (err instanceof Error ? err.message : String(err)));
      setStatus('Failed to fetch');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setCode('');
    setOutput('');
    setStatus('Editor cleared');
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-6">Assembly Playground</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Code Editor */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4"> Code</h2>
          <textarea
            className="w-full p-4 font-mono text-sm bg-gray-50 border rounded-md"
            style={{ height: "32rem" }}
            placeholder="Enter your code here..."
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          
          <div className="flex space-x-4 mt-4">
            <button 
              onClick={handleClear}
              className="flex items-center px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Clear
            </button>
            
            <button 
              onClick={handleCompile}
              disabled={isLoading}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              <Play className="w-4 h-4 mr-2" />
              {isLoading ? 'Compiling...' : 'Compile & Run'}
            </button>
          </div>
        </div>
        
        {/* Output */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Output</h2>
          <div className="bg-gray-50 p-4 rounded-md border h-64 overflow-y-auto font-mono text-sm">
            {output}
          </div>
          
          <div className="mt-4 text-sm font-medium">
            Status: <span className={`${status.includes('Error') ? 'text-red-500' : 'text-blue-600'}`}>{status}</span>
          </div>
        </div>
      </div>
      
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h3 className="font-semibold text-blue-800 mb-2">How to use the  Playground:</h3>
        <ol className="list-decimal ml-5 space-y-1 text-sm">
          <li>Write your x86 assembly code in the editor</li>
          <li>Click "Compile & Run" to execute your code</li>
          <li>View the output in the right panel</li>
          <li>Use "Clear" to reset the editor</li>
        </ol>
      </div>
    </div>
  );
}

export default AssemblyPlayground;