import { gql } from "@apollo/client";

export const ADD = gql`
    mutation Add(
        $Id: String!
        $Title: String!
        $CreationDate: DateTime!
    ) {
        Add(
            TodoItem: {
                Id: $Id
                Title: $Title
                CreationDate: $CreationDate
                DueDate: $DueDate
            }
        ) {
            Id
            Title
            CreationDate
            DueDate
            DaysCreated
            Completed
        }
    }
`;
