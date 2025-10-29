// src/Lightbox.tsx
import { useEffect } from "react";
import PropTypes from "prop-types";
var getUrl = (production) => production ? "https://pay.datatrans.com/upp/payment/js/datatrans-2.0.0.global.min.js" : "https://pay.sandbox.datatrans.com/upp/payment/js/datatrans-2.0.0.global.min.js";
var startPayment = (config) => {
  if (window.Datatrans) {
    window.Datatrans.startPayment(config);
  }
};
var cleanupLightbox = () => {
  if (window.Datatrans) {
    try {
      window.Datatrans.close();
    } catch (err) {
    }
  }
};
var Lightbox = (props) => {
  useEffect(() => {
    const { production } = props;
    const config = {
      transactionId: props.transactionId,
      loaded: props.onLoaded,
      opened: props.onOpened,
      closed: props.onCancelled,
      error: props.onError
    };
    const scriptSource = getUrl(production);
    if (document.querySelector('script[src="' + scriptSource + '"]')) {
      startPayment(config);
      return cleanupLightbox;
    }
    const script = document.createElement("script");
    script.src = scriptSource;
    script.onload = () => {
      startPayment(config);
    };
    document.body.appendChild(script);
    return cleanupLightbox;
  }, []);
  return null;
};
var Lightbox_default = Lightbox;
Lightbox.propTypes = {
  transactionId: PropTypes.string.isRequired,
  production: PropTypes.bool,
  onLoaded: PropTypes.func,
  onOpened: PropTypes.func,
  onCancelled: PropTypes.func,
  onError: PropTypes.func
};
Lightbox.defaultProps = {
  onLoaded() {
  },
  onOpened() {
  },
  onCancelled() {
  },
  onError() {
  },
  production: false
};

// src/index.ts
var index_default = Lightbox_default;
export {
  index_default as default
};
//# sourceMappingURL=index.mjs.map