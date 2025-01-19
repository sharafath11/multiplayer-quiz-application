import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import MQuizComponent from "./MQuizComponent";
const socket = io("http://localhost:3001");

export default function MultiplayerQuizHome() {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState([]);
  const [info, setInfo] = useState(false);
  const [time,setTime]=useState();
  const [state,setState]=useState(10)

  //socket logic
useEffect(()=>{
 if(name) socket.emit('joinRoom',name,room);
},[])
useEffect(()=>{
  console.log(kng);
  
})

  function handleSubmit(e) {
    e.preventDefault();
    if (name && room) {
      setInfo(true);

      setQuestion("What is the capital of France?");
      setOptions(["Paris", "London", "Berlin", "Madrid"]);
    }
  }

  function handleAnswer(selectedOption) {
    if (selectedOption === "Paris") {
      alert("Correct Answer!");
      setScore((prevScore) => [
        ...prevScore,
        { name, score: (prevScore.find((s) => s.name === name)?.score || 0) + 1 },
      ]);
    } else {
      alert("Wrong Answer!");
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      {!info ? (
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
          <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">Qz Multiplayer</h1>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-600 mb-1">Your Name</label>
              <input
                type="text"
                required
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1">Room ID</label>
              <input
                type="text"
                required
                placeholder="Enter the room name"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-semibold py-3 rounded-lg hover:bg-blue-600 transition duration-200"
            >
              Join
            </button>
          </form>
        </div>
      ) : (
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
          <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">Quiz Room</h1>
          <p className="text-gray-600 text-center mb-4">Room ID: {room}</p>
          <div className="mb-4">
            <p className="text-lg font-medium text-gray-800 mb-2">{question}</p>
            <ul className="space-y-2">
              {options.map((answer, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleAnswer(answer)}
                    className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-lg"
                  >
                    {answer}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Scores:</h2>
            {score.map((player, index) => (
              <p key={index} className="text-gray-600">
                {player.name}: {player.score}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
