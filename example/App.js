import React, { useState, useEffect } from 'react'
import Lightbox from '../src'

const data = {
  "currency": "CHF",
  "refno": "react-light-box",
  "amount": 10,
}

export default () => {
  const [lightbox, showLightbox] = useState(false)
  const [loading, setLoading] = useState(false)
  const [transactionId, setTransactionId] = useState('')

  const onClick = () => {
    setLoading(true)
    showLightbox(true)
  }
  const onLoaded = () => setLoading(false)
  const onOpened = () => console.log('Opened')
  const onCancelled = () => showLightbox(false)
  const onError = (data) => {
    console.log('Error:', data)
    showLightbox(false)
  }

  return <div>
    <h1 style={{ fontFamily: 'Helvetica, sans-serif', fontWeight: 300 }}>Datatrans Lightbox Demo</h1>
      <div>
        <h2>Step 1:</h2>
        <p>Run this example on your server:</p>
        <code style={{ userSelect: 'all' }}>
          <pre>
          curl 'https://api.sandbox.datatrans.com/v1/transactions' \<br/>
            --header 'Authorization: Basic MTEwMDAyNTgzNTozY29mTjNNeFhhQkg3VWw4' \<br/>
            --header 'Content-Type: application/json' \<br/>
            --data-raw '{JSON.stringify(data, null, " ")}'
          </pre>
        </code>
        <h2>Step 2:</h2>
        <p>Enter the transactionId here:</p>
        <input type='text' value={transactionId} onChange={(e) => setTransactionId(e.target.value)} />
        {!loading && <button onClick={onClick} disabled={!transactionId}>Start Lightbox</button>}
        {loading && <span className='loader'></span>}
      </div>
      {lightbox && <Lightbox
          transactionId={transactionId}
          production={false /* Default: false */}
          onLoaded={onLoaded}
          onOpened={onOpened}
          onCancelled={onCancelled}
          onError={onError}
        />
      }
  </div>
}
