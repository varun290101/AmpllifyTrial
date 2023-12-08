/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createCategory = /* GraphQL */ `
  mutation CreateCategory(
    $input: CreateCategoryInput!
    $condition: ModelCategoryConditionInput
  ) {
    createCategory(input: $input, condition: $condition) {
      id
      Category
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateCategory = /* GraphQL */ `
  mutation UpdateCategory(
    $input: UpdateCategoryInput!
    $condition: ModelCategoryConditionInput
  ) {
    updateCategory(input: $input, condition: $condition) {
      id
      Category
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteCategory = /* GraphQL */ `
  mutation DeleteCategory(
    $input: DeleteCategoryInput!
    $condition: ModelCategoryConditionInput
  ) {
    deleteCategory(input: $input, condition: $condition) {
      id
      Category
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createInterests = /* GraphQL */ `
  mutation CreateInterests(
    $input: CreateInterestsInput!
    $condition: ModelInterestsConditionInput
  ) {
    createInterests(input: $input, condition: $condition) {
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
export const updateInterests = /* GraphQL */ `
  mutation UpdateInterests(
    $input: UpdateInterestsInput!
    $condition: ModelInterestsConditionInput
  ) {
    updateInterests(input: $input, condition: $condition) {
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
export const deleteInterests = /* GraphQL */ `
  mutation DeleteInterests(
    $input: DeleteInterestsInput!
    $condition: ModelInterestsConditionInput
  ) {
    deleteInterests(input: $input, condition: $condition) {
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
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
