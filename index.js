import { Marp, MarpWorker } from '@marp-team/marp-react'
import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const worker = new Worker('/test/worker.js')

function App() {
  const [buffer, setBuffer] = useState('# Hello, world!')
  const handleUpdate = (e) => setBuffer(e.target.value)

  return (
    <>
      <textarea value={buffer} onChange={handleUpdate} />
      <Marp markdown={buffer} />
      <MarpWorker worker={worker} markdown={buffer} />
    </>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
