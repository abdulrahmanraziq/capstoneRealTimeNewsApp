export default {
  SIGN_UP: {
    path: "/user/signup",
    auth: false,
  },
  LOGIN: {
    path: "/user/login",
    auth: false,
  },
  FORGOT_PASSWORD: {
    path: "/user/forgotPassword",
    auth: false,
  },
  RESET_PASSWORD: {
    path: "/user/resetPassword",
    auth: false,
  },
  CREATE_NEWS: {
    path: "/news/createNews",
    auth: true,
  },
  GET_BREAKING_NEWS: {
    path: "/news/getBreakingNews",
    auth: true,
  },

  GET_NEWS_BY_TOPIC: {
    path: "/news/getTopic",
    auth: true,
  },

  GET_NEWS_BY_ID: {
    path: "/news/getNewsById",
    auth: false,
  },

  SUBSCRIBED_TOPIC: {
    path:"/sendEmail/mail",
    auth:true
  },

  SUBSCRIBED_NEWS:{
    path:"/sendEmail/subscriptionMail",
    auth:true
  },

  GET_MAIL_COUNT:{
    path:"/sendEmail/getCount",
    auth:true
  }
};
