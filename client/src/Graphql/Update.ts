import { gql } from "@apollo/client";

export const UPDATE = gql`
    mutation Update(
        $Id: String!
        $Title: String!
        $CreationDate: DateTime!
        $DueDate: DateTime!
    ) {
        Update(
            TodoItem: {
                Id: $Id
                Title: $Title
                CreationDate: $CreationDate
                DueDate: $DueDate
            }
        )
    }
`;
