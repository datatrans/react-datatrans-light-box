"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  default: () => src_default
});
module.exports = __toCommonJS(src_exports);

// src/Lightbox.tsx
var import_react = require("react");
var import_prop_types = __toESM(require("prop-types"));
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
  (0, import_react.useEffect)(() => {
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
  transactionId: import_prop_types.default.string.isRequired,
  production: import_prop_types.default.bool,
  onLoaded: import_prop_types.default.func,
  onOpened: import_prop_types.default.func,
  onCancelled: import_prop_types.default.func,
  onError: import_prop_types.default.func
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
var src_default = Lightbox_default;
//# sourceMappingURL=index.js.map