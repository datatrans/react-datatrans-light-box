/**
 * The public Datatrans API.
 *
 * Sandbox
 *  - https://pay.sandbox.datatrans.com/upp/payment/js/datatrans-2.0.0.global.js
 *  - https://pay.sandbox.datatrans.com/upp/payment/js/datatrans-2.0.0.global.min.js
 *
 * Production
 *  - https://pay.datatrans.com/upp/payment/js/datatrans-2.0.0.global.js
 *  - https://pay.datatrans.com/upp/payment/js/datatrans-2.0.0.global.min.js
 */
export interface GlobalDatatransApi {
  startPayment: (config: DatatransLightboxConfig) => void; // eslint-disable-line no-unused-vars
  close: () => void;
}

/**
 * The config to open a Datatrans Lightbox.
 *
 * @see https://docs.datatrans.ch/docs/redirect-lightbox
 * @see https://api-reference.datatrans.ch/
 */
export interface DatatransLightboxConfig {
  closed?: () => void;
  error?: (error: { message: string; detail: string }) => void; // eslint-disable-line no-unused-vars
  form?: unknown;
  loaded?: () => void;
  opened?: () => void;
  params?: IDatatransConfigParams;
}

/**
 * The parameters that can be passed to the Datatrans API.
 *
 * @see https://docs.datatrans.ch/docs/redirect-lightbox
 * @see https://api-reference.datatrans.ch/
 */
export interface IDatatransConfigParams {
  /**
   * The aliasCC received with a Payment or Registration.
   * @see https://docs.datatrans.ch/v1.0.1/docs/payment-process-alias
   * e.g.: "70119122433810042"
   */
  aliasCC?: string;
  /**
   * The amount of the transaction in the currency’s smallest unit.
   * For example use "1000" for CHF 10.00.
   */
  amount?: string;
  /**
   * This parameter represents the URL of the merchant’s web shop, application,
   * where the consumer should be redirected to after cancelling the transaction.
   */
  cancelUrl: string;
  /**
   * 3 letter ISO-4217 character code.
   * For example "CHF", "USD"
   */
  currency?: string;
  /**
   * This parameter represents the URL of the merchant’s web shop, application, where the consumer should be redirected to after a failed transaction
  */
  errorUrl: string;
  /** Expiry month of the card. For example "1" or "01" for January. */
  expm?: string;
  /**
   * Expiry year of the card
   * e.g.: "25"
   */
  expy?: string;
  /**
   * This parameter specifies the language (language code) in which the payment page should be presented to the cardholder.
   * The following ISO-639-1 two letter language codes are supported:
   *
   *  - de (German)
   *  - en (English)
   *  - fr (French)
   *  - it (Italian)
   *  - es (Spanish)
   *  - el (Greek)
   *  - no (Norwegian)
   *  - da (Danish)
   *  - pl (Polish)
   *  - pt (Portuguese)
   */
  language?: 'de' | 'en' | 'fr' | 'it' | 'es' | 'el' | 'no' | 'da' | 'pl' | 'pt';
  /**
   * Unique Merchant Identifier (assigned by Datatrans during signup).
   * Depending on your integration you might receive multiple merchantIds.
   * For example: One for your mobile application and one for your web shop
   */
  merchantId?: string;
  /** e.g.: "VIS" */
  paymentmethod?: string;
  /** e.g.: "77666134" */
  refno?: string;
  /**
   * The reqtype (request type) parameter is used to specify which type of action should be performed on Datatrans side.
   * The different API endpoints support different reqtypes. For Authorizations (Server to Server or by using the Payment page) the following reqtypes are possible:
   *
   * - NOA
   *   Only authorization should be done. The amount will be blocked and a separate settlement needs to follow in order to actually charge the customer.
   *   Not all payment methods support splitting authorization and settlement. Refer to the documentation of the corresponding payment method if Deferred Settlement is possible.
   * - CAA
   *   Direct debit. Authorization with immediate settlement.
   * - SCN
   *   Only a pre-screening request should be done. Not all payment methods support pre-screening requests.
   *   Refer to the reqtype request parameter documentation for the particular payment method to see if pre-screening requests are supported.
   */
  reqtype?: 'NOA' | 'CAA' | 'SCN';
  /**
   * The sign parameter to be submitted with each request.
   * @see https://api-reference.datatrans.ch/xml/#request-signing
   *
   * e.g.: "1902B412B9DDBFF2623ADB4F101F2141" */
  sign?: string;
  /**
   * This parameter represents the URL of the merchant’s web shop,
   * where the consumer should be redirected to after a successful transaction.
   *
   * e.g.: "https://www.example.com/datatrans/paymentresult/77966133"
   */
  successUrl: string;
  themeConfiguration?: IDatatransConfigThemeConfiguration;
}

/**
 * https://docs.datatrans.ch/docs/redirect-lightbox#styling-the-payment-pages
 */
interface IDatatransConfigThemeConfiguration {
  /** e.g. "true" */
  brandButton?: boolean | string;
  /** e.g. "#444" */
  brandColor?: string;
  /**
   * Wheter the payment page shows the payment method selection as list (default) or as a grid.
   */
  initialView?: 'list' | 'grid';
  /**
   * Decides whether the logo shall be styled with a border around it,
   * if the value is true the default background color is chosen,
   * else the provided string is used as color value.
   */
  logoBorderColor?: boolean | string;
  /**
   * An SVG image provided by the merchant.
   * The image needs to be uploaded by using the Datatrans Web Administration Tool.
   */
  logoSrc?: string;
  /**
   * The header logo's display style.
   */
  logoType?: 'circle' | 'rectangle' | 'none';
  /**
   * Hides the title from header
   * (Only required if no logo is used)
   */
  brandTitle?: 'false',
  /**
   * Color for the title [white|black]
   * (Only required if no logo is used)
   */
  textColor: 'black' | 'white'
}
