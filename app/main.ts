import Vue from "nativescript-vue";
import routes from "./routes";
import store from "./store";
import * as ApplicationSettings from "tns-core-modules/application-settings";

import VueApollo from "vue-apollo";
import ApolloClient from "apollo-boost";

// GET TOKEN and Prepare for header bearer
const tokenInAppSet = ApplicationSettings.getString("token")
    ? ApplicationSettings.getString("token").replace(/['"]+/g, "")
    : false;

/////////////// APOLLO 
export const defaultClient = new ApolloClient({
    uri: "http://sebapi.com/graphql",
    headers: {
        authorization: `Bearer ${tokenInAppSet}`,
    }
});

Vue.use(VueApollo);
const apolloProvider = new VueApollo({
    defaultClient,
});

new Vue({
    store,
    apolloProvider,
    render: (h) =>
        h("frame", [h(tokenInAppSet ? routes.entered : routes.login)]),
}).$start();
