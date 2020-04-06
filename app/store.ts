import Vue from "nativescript-vue";
import Vuex from "vuex";

import routes from "./routes";
import axios from "./axios-auth";
import * as ApplicationSettings from "tns-core-modules/application-settings";
import { defaultClient as apolloClient } from "./main";
import { gql } from "apollo-boost";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user: [],
        jwt: String,
        birds: {},
    },
    actions: {
        login({ commit }, credentials: Object) {
            axios
                .post("auth/local", credentials)
                .then((response) => {
                    // write token to disk
                    ApplicationSettings.setString(
                        "token",
                        JSON.stringify(response.data.jwt)
                    );

                    // mutation to write token
                    commit("setUserJWT", response.data.jwt);
                })
                .then(() => {
                    // goto entered page
                    Vue.prototype.$navigateTo(routes.entered);
                })
                .catch((error) => {
                    console.error("auth/local error occurred:", error);
                });
        },
        getBirds: ({ commit }) => {
            apolloClient
                .query({
                    query: gql`
                    query birds {
                      birds(where: { Canli: true }, limit: 16) {
                        isim
                        bilezik
                      }
                    }
                    `,
                })
                .then(({ data }) => {
                    commit("setBirds", data.birds);
                })
                .catch((err) => {
                    console.error(err);
                });
        },
    },
    mutations: {
        setUserJWT: (state, payload) => {
            state.user = payload;
        },
        setBirds: (state, payload) => {
            state.birds = payload;
          },
    },
    getters: {
        jwt: (state) => state.jwt,
        birds: state => state.birds,
    },
});
