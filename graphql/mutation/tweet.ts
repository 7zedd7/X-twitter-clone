import { graphql } from "@/gql";

export const createTweetMutation = graphql(`#graphql 
mutation Mutation($payload: CreateTweetData!) {
        createTweet(payload: $payload) {
            id
        }
    }
`);
