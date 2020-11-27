import React, { useState, useEffect } from 'react'
import Lightbox from '../src'

export default () => {
  const [lightbox, showLightbox] = useState(false)
  const [loading, setLoading] = useState(false)
  const [transactionId, setTransactionId] = useState('')
  const [basicAuth, setBasicAuth] = useState('')
  const [merchantId, setMerchantId] = useState('')
  const [password, setPassword] = useState('')
  const [amount, setAmount] = useState(1000)

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

  useEffect(() => {
    if (merchantId && password) {
      setBasicAuth(window.btoa(`${merchantId}:${password}`))
    }
  }, [merchantId, password]);

  return <div>
    <h1 style={{ fontFamily: 'Helvetica, sans-serif', fontWeight: 300 }}>Datatrans Lightbox Demo</h1>
      <div>
        <h2>Step 1:</h2>
        <p>Fill in your basicAuth to complete the code example below:<br/>
          <small><a href="https://api-reference.datatrans.ch/#section/Authentication">Documentation: Authentication</a></small>
        </p>

        <label for='merchantId'>
          Datatrans MerchantId
          <input id='merchantId' type='text' value={merchantId} onChange={(e) => setMerchantId(e.target.value)} />
        </label>
        <label for='password'>
          Password
          <input id='password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>

        <label for='amount'>
          Amount in the currency's smallest unit<br/>(e.g. 1000 = 10CHF)
          <input id='amount' type='text' value={amount} onChange={(e) => setAmount(e.target.value)} />
        </label>
        <h2>Step 2:</h2>
        <p>Run this example on your server:<br/>
          <small><a href="https://api-reference.datatrans.ch/#tag/v1transactions">Documentation: Initialize a transaction</a></small></p>
        <code style={{ userSelect: 'all' }}>
          <pre style={{ maxWidth: '700px' }}>
          curl 'https://api.sandbox.datatrans.com/v1/transactions' \<br/>
            --header 'Authorization: Basic {basicAuth}' \<br/>
            --header 'Content-Type: application/json' \<br/>
            --data-raw '{JSON.stringify({
                currency: 'CHF',
                refno: 'react-light-box',
                amount: parseInt(amount, 10),
              }, null, ' ')}'
          </pre>
        </code>
        <h2>Step 3:</h2>
        <p>Copy the transactionId from the call above:<br/>Please note that a transactionId is only valid for 30 minutes.</p>
        <label for='transactionId'>
          Transaction ID
          <input id='transactionId' type='text' value={transactionId} onChange={(e) => setTransactionId(e.target.value)} />
        </label>
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
