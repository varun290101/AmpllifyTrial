/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getCategory = /* GraphQL */ `
  query GetCategory($id: ID!) {
    getCategory(id: $id) {
      id
      Category
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listCategories = /* GraphQL */ `
  query ListCategories(
    $filter: ModelCategoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCategories(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        Category
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getInterests = /* GraphQL */ `
  query GetInterests($id: ID!) {
    getInterests(id: $id) {
      id
      Interest
      userID
      Category {
        id
        Category
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      interestsCategoryId
      __typename
    }
  }
`;
export const listInterests = /* GraphQL */ `
  query ListInterests(
    $filter: ModelInterestsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listInterests(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        Interest
        userID
        createdAt
        updatedAt
        interestsCategoryId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const interestsByUserID = /* GraphQL */ `
  query InterestsByUserID(
    $userID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelInterestsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    interestsByUserID(
      userID: $userID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        Interest
        userID
        createdAt
        updatedAt
        interestsCategoryId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      Name
      Age
      Gender
      County
      Interests {
        nextToken
        __typename
      }
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
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
