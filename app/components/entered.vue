<template>
    <Page>
        <StackLayout>
            <Label text="You are logged in " textWrap="true" />
            <Button text="Goto List" @tap="gotoDetailPage" />
            <Label text="Problem is: If its your first install you are unable to see anything. But after reloading the app you will see 3 numbers" textWrap="true" class="problem m-20" />
            <Label :text="'here is your token:'+ token" textWrap="true" class="p-10"/>
        </StackLayout>
    </Page>
</template>

<script>
import routes from "../routes";
import * as ApplicationSettings from "tns-core-modules/application-settings";

export default {
    methods: {
        gotoDetailPage() {
            this.$navigateTo(routes.birds);
        },
    },
    mounted() {
        this.$store.dispatch("getBirds");
    },
    computed: {
        token() {
            return ApplicationSettings.getString("token");
        },
    },
};
</script>

<style>
.problem {
color: red;
}
    </style>
