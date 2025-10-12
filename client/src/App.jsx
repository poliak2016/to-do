export default function App() {
  console.log('App rendered')
  return (
    <div style={{ padding: 10 }}>
      <h1 style={{ margin: 0 }}>It works 🎉</h1>
      <p>Rendered from <code>client/src/App.jsx</code></p>
    </div>
  )
}

import {useEffect, useState} from "react";
import {todos} from "./services/todos";