import Vue from "nativescript-vue";
import routes from "./routes";
import store from "./store";


new Vue({
    store,
    render: h => h("frame", [h(routes.login)])
}).$start();
