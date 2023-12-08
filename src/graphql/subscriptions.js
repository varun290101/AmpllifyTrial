/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateCategory = /* GraphQL */ `
  subscription OnCreateCategory($filter: ModelSubscriptionCategoryFilterInput) {
    onCreateCategory(filter: $filter) {
      id
      Category
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateCategory = /* GraphQL */ `
  subscription OnUpdateCategory($filter: ModelSubscriptionCategoryFilterInput) {
    onUpdateCategory(filter: $filter) {
      id
      Category
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteCategory = /* GraphQL */ `
  subscription OnDeleteCategory($filter: ModelSubscriptionCategoryFilterInput) {
    onDeleteCategory(filter: $filter) {
      id
      Category
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateInterests = /* GraphQL */ `
  subscription OnCreateInterests(
    $filter: ModelSubscriptionInterestsFilterInput
  ) {
    onCreateInterests(filter: $filter) {
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
export const onUpdateInterests = /* GraphQL */ `
  subscription OnUpdateInterests(
    $filter: ModelSubscriptionInterestsFilterInput
  ) {
    onUpdateInterests(filter: $filter) {
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
export const onDeleteInterests = /* GraphQL */ `
  subscription OnDeleteInterests(
    $filter: ModelSubscriptionInterestsFilterInput
  ) {
    onDeleteInterests(filter: $filter) {
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
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
    onCreateUser(filter: $filter) {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
    onUpdateUser(filter: $filter) {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
    onDeleteUser(filter: $filter) {
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
