/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      Name
      Age
      Gender
      County
      Email
      Interests
      createdAt
      updatedAt
      __typename
    }
  }
`;


export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        Name
        Age
        Gender
        County
        Email
        Interests
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
// Add this to your queries.js or a similar file
export const SearchUsersByEmail = /* GraphQL */ `
  query SearchUsersByEmail($email: String!) {
    searchUsers(filter: { Email: { eq: $email } }) {
      items {
        id
        Name
        Age
      }
    }
  }
`;

export const searchUsers = /* GraphQL */ `
  query SearchUsers(
    $filter: SearchableUserFilterInput
    $sort: [SearchableUserSortInput]
    $limit: Int
    $nextToken: String
    $from: Int
    $aggregates: [SearchableUserAggregationInput]
  ) {
    searchUsers(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
      aggregates: $aggregates
    ) {
      items {
        id
        Name
        Age
        Gender
        County
        Email
        Interests
        createdAt
        updatedAt
        __typename
      }
      nextToken
      total
      aggregateItems {
        name
        result {
          ... on SearchableAggregateScalarResult {
            value
          }
          ... on SearchableAggregateBucketResult {
            buckets {
              key
              doc_count
              __typename
            }
          }
        }
        __typename
      }
      __typename
    }
  }
`;
