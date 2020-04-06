<template>
    <Page>
        <ActionBar>
            <Label class="title" text="birds" col="1" />
        </ActionBar>
        <GridLayout columns="*" rows="*" >
            <ListView for="bird in birds">
                <v-template>
                    <Label :text="bird.bilezik"  />
                </v-template>
            </ListView>
        </GridLayout>
    </Page>
</template>

<script lang="ts">
import gql from "graphql-tag";

export default {
    computed: {
        birds() {
            return this.$store.getters.birds;
        },
    },
};
</script>

<style >

</style>
