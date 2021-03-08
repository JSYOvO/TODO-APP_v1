import { gql } from "@apollo/client";

export const TODOITEMS = gql`
    query TodoItems {
        TodoItems {
            Id
            Title
            CreationDate
            DueDate
            DaysCreated
            Completed
        }
    }
`;
