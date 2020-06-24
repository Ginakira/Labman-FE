import Vue from "vue";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";

const relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);
dayjs.locale("zh-cn");
Vue.prototype.$dayjs = dayjs;
