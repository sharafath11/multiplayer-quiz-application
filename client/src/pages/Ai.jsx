import React, { useState } from 'react';
import Header from '../components/Header';
import { BaseUrl, postRequest } from '../utils/services';

export default function Ai() {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); 
    setMessages([...messages, { sender: 'user', text: prompt }]); 
    try {
      const result = await postRequest(`${BaseUrl}/user/ask/qustions`, prompt);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'ai', text: result }, 
      ]);
    } catch (error) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'ai', text: 'An error occurred. Please try again.' }, 
      ]);
    } finally {
      setIsLoading(false); 
      setPrompt(''); 
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-r from-purple-900 via-indigo-900 to-blue-900 flex flex-col items-center justify-between p-4">
        <div className="w-full max-w-2xl bg-black/50 backdrop-blur-md border-2 border-purple-500 text-white rounded-lg p-4">
          <div className="p-4 border-b border-purple-500">
            <h2 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              Ask AI Your Doubts
            </h2>
          </div>

          {/* Chatbox */}
          <div className="chatbox overflow-auto max-h-96 mb-4 p-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`p-3 mb-2 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-700 text-white'
                  }`}
                  style={{
                    maxWidth: '70%',
                    wordWrap: 'break-word',
                    display: 'inline-block',
                  }}
                >
                  {message.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="p-3 mb-2 rounded-lg bg-gray-700 text-white self-start">
                ⏳ Loading your response...
              </div>
            )}
          </div>

          {/* Input Section */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="Enter your doubt..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full bg-transparent border-2 border-purple-500 rounded-full px-6 py-3 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <button
                type="submit"
                disabled={!prompt || isLoading} 
                className={`absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full px-6 py-2 transition duration-300 ${
                  !prompt || isLoading
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:from-purple-600 hover:to-pink-600'
                }`}
              >
                {isLoading ? 'loading...' : 'Ask AI'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
