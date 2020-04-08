<template>
    <Page actionBarHidden="true">
        <FlexboxLayout class="nt-page">
            <StackLayout class="nt-form m-20">
                <Label
                    text="After first time install > login action can not add header to apolloClient. It works if you restart application and set headers from application settings."
                    textWrap="true"
                />
                <Label text="Just click login" textWrap="true" class="m-20" />

                <GridLayout rows="auto, auto, auto">
                    <StackLayout row="0" class="input-field">
                        <TextField
                            class="nt-input -rounded m-t-10 -border"
                            hint="test"
                            keyboardType="identifier"
                            autocorrect="false"
                            autocapitalizationType="none"
                            v-model="user.identifier"
                            returnKeyType="next"
                        ></TextField>
                    </StackLayout>

                    <StackLayout row="1" class="input-field">
                        <TextField
                            class="nt-input -rounded m-t-10 -border"
                            ref="password"
                            hint="123123"
                            secure="true"
                            v-model="user.password"
                            returnKeyType="done"
                        ></TextField>
                    </StackLayout>

                    <ActivityIndicator rowSpan="3"></ActivityIndicator>
                </GridLayout>
                <Button
                    text="login"
                    @tap="handleLogin"
                    class="-primary m-t-20"
                ></Button>
                <StackLayout class="hr m-30"></StackLayout>
                <Label
                    text="server can be slow wait for respond"
                    textWrap="true"
                />
            </StackLayout>
        </FlexboxLayout>
    </Page>
</template>

<script lang="ts">
import axios from "../axios-auth";
import routes from "../routes";
import * as ApplicationSettings from "tns-core-modules/application-settings";

import VueApollo from "vue-apollo";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { setContext } from "apollo-link-context";

export default {
    data() {
        return {
            user: {
                identifier: "test",
                password: "123123"
            }
        };
    },
    created() {
        // GET TOKEN and Prepare for header bearer
        const tokenInAppSet = ApplicationSettings.getString("token")
            ? ApplicationSettings.getString("token").replace(/['"]+/g, "")
            : false;
        this.$navigateTo(tokenInAppSet ? routes.birds : routes.login);

        this.use(VueApollo);
        // Create a new HttpLink to connect to your GraphQL API.
        const httpLink = new HttpLink({
            uri: `http://sebapi.com/graphql`
        });

        // Create a new Middleware Link using setContext
        const middlewareLink = setContext(() => ({
            headers: {
                authorization: `Bearer ${tokenInAppSet}`
            }
        }));

        // Change your link assignment from
        // const link = httpLink;
        // to
        const link = middlewareLink.concat(httpLink);
        // Create the apollo client
        const apolloClient = new ApolloClient({
            // Tells Apollo to use the link chain with the http link we set up.
            link,
            // Handles caching of results and mutations.
            cache: new InMemoryCache(),
            // Useful if you have the Apollo DevTools installed in your browser.
            connectToDevTools: true
        });

        const apolloProvider = new VueApollo({
            defaultClient: apolloClient
        });
        // HOW TO Inject apolloProvider for components to use.
        this.apolloProvider.provide()
    },
    methods: {
        handleLogin() {
            // clear token to prevent errors (if malformed)
            ApplicationSettings.setString("token", JSON.stringify(""));
            // dispatch store action to login
            this.$store
                .dispatch("login", {
                    identifier: this.user.identifier,
                    password: this.user.password
                })
                .then(() => {});
        }
    }
};
</script>

<style></style>
