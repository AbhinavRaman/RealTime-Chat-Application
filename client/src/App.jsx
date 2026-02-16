import { useState, useEffect } from "react";
import Chat from "./pages/Chat";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userId = prompt("Enter user id (user1 or user2):");

    setUser({
      _id: userId,
      name: userId,
    });
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h2>Real-Time Chat Test</h2>
      <Chat user={user} />
    </div>
  );
}

export default App;