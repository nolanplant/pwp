import WooCommerce from "./WooCommerce";
import {ROOT} from '../constants';
import config from './config';

var WooCommerceAPI = new WooCommerce({
    url: ROOT,
    consumerKey: config.CONSUMER_KEY,
    consumerSecret: config.CONSUMER_SECRET,
    wp_api: true,
    version: 'wc/v2',
    queryStringAuth: true
});

export default WooCommerceAPI;