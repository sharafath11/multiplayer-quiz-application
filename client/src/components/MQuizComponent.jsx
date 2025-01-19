export default function MQuizComponent({ roomCode, socket }) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-200">
        <h1 className="text-2xl font-bold">Room Code: {roomCode}</h1>
        <p className="text-lg mt-4">Quiz will start shortly...</p>
      </div>
    );
  }
  