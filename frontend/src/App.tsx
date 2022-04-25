import React, { useEffect, useState } from 'react';
const io = require("socket.io-client")

function App() {
  const socket = io.connect("http://localhost:8000", {reconnect: true});
  
  useEffect(() => {
    socket.on("connect", () => {
      console.log(socket.connected); // true
      console.log("connected")
    });
  }, [])

  return (
    <div className="App">
     {socket.id}
    </div>
  );
}

export default App;
