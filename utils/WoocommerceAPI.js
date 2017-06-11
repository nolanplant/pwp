import WooCommerce from "./WooCommerce";
import { ROOT } from "../constants";
//import config from "../config";

const WooCommerceAPI = new WooCommerce({
  url: ROOT,
  consumerKey: "ck_0e9b997424e25fdbd2a26ec7a750c6e3f54afcfa",
  consumerSecret: "cs_0646efc87194b8314f715ea23aaaaefc91a89633",
  wp_api: true,
  version: "wc/v2",
  queryStringAuth: true
});

export default WooCommerceAPI;
