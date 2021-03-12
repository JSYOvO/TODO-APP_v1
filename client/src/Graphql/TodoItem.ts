import { gql } from "@apollo/client";

export const TODOITEM = gql`
    query TodoItem($title: String!) {
        TodoItem(title: $title) {
            Id
            Title
            CreationDate
            DueDate
            DaysCreated
            Completed
        }
    }
`;
