import Strings from "./Strings";

// routes
export const ROOT = "https://prioritywinepass.com/wp-json";
export const BASE_ROUTE = `${ROOT}/wp/v2`;
export const AUTH_ROUTE = `${ROOT}/jwt-auth/v1/token`;
export const WOO_ROUTE = `${ROOT}/wc/v2`;
export const LOST_PASSWORD_ROUTE = "https://www.prioritywinepass.com/my-account/lost-password/";
export const CONCIERGE_ROUTE = "https://www.prioritywinepass.com/concierge-and-trips/";
export const BLOG_ROUTE = "https://www.prioritywinepass.com/blog/";
export const BUY_RENEW_ROUTE = "https://www.prioritywinepass.com/shop/";
export const FIXTURES = {
  IMAGE_URL: "https://i0.wp.com/www.prioritywinepass.com/wp-content/uploads/2017/03/durantandbooth-tastingsalonempty.jpg"
};

// todo: possibly move this
export const menuItems = [
  {
    title: Strings.HOW_IT_WORKS,
    icon: "tablet",
    screen: "HowItWorks"
  },
  {
    title: Strings.MY_ACCOUNT,
    icon: "cog"
  },
  {
    title: Strings.CONCIERGE,
    icon: "glass",
    link: CONCIERGE_ROUTE
  },
  {
    title: Strings.BLOG,
    icon: "book",
    link: BLOG_ROUTE
  },
  {
    title: Strings.FAQ,
    icon: "info-circle"
  },
  {
    title: Strings.BUY_RENEW,
    icon: "credit-card",
    link: BUY_RENEW_ROUTE
  }
];
