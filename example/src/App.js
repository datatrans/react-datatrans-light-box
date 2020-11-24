import React, { useState, useEffect } from 'react'
import Lightbox from '../../src'

export default () => {
  const [lightbox, showLightbox] = useState(false)
  const [transactionId, setTransactionId] = useState(false)

  const onLoaded = () => console.log('Loaded')
  const onOpened = () => console.log('Opened')
  const onCancelled = () => showLightbox(false)
  const onError = (data) => {
    console.log('Error:', data)
    showLightbox(false)
  }

  useEffect(() => {
    /*
    * WARNING !!!
    * Initialize Transaction via CORS
    * You have to do this part on your server.
    * Don't call our init endpoint from the client side.
    * It won't work (CORS). It only works from the browser for this demo.
    */
   if (!transactionId) {
      const url = 'https://api.sandbox.datatrans.com/v1/transactions'
      const config = {
        currency: 'CHF',
        refno: 'cK1lO9XLv',
        amount: 1337,
        redirect: {
          successUrl: 'https://pay.sandbox.datatrans.com/upp/merchant/successPage.jsp',
          cancelUrl: 'https://pay.sandbox.datatrans.com/upp/merchant/cancelPage.jsp',
          errorUrl: 'https://pay.sandbox.datatrans.com/upp/merchant/errorPage.jsp'
        }
      }
      try {
        fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8',
              Authorization: 'Basic MTEwMDAyNTgzNTozY29mTjNNeFhhQkg3VWw4'
            },
            body: JSON.stringify(config)
        })
          .then(data => setTransactionId(data.transactionId))
      } catch (error) {
        console.log(error)
      }
   }
  })

  return <div>
    <h1>Datatrans Lightbox Demo</h1>
    <div>
      {lightbox
        ? <Lightbox
            transactionId={transactionId}
            production={false /* Default: false */}
            onLoaded={onLoaded}
            onOpened={onOpened}
            onCancelled={onCancelled}
            onError={onError}
          />
        : <button onClick={() => showLightbox(true)} disabled={!transactionId}>Start Lightbox</button>
      }
    </div>
  </div>
}
