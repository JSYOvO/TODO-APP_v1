import { gql } from "@apollo/client";

export const REMOVE = gql`
    mutation Remove($Id: String!) {
        Remove(Id: $Id)
    }
`;
