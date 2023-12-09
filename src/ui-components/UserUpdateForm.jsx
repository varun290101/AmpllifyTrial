/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Badge,
  Button,
  Divider,
  Flex,
  Grid,
  Icon,
  ScrollView,
  SelectField,
  Text,
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { getUser } from "../graphql/queries";
import { updateUser } from "../graphql/mutations";
const client = generateClient();
function ArrayField({
  items = [],
  onChange,
  label,
  inputFieldRef,
  children,
  hasError,
  setFieldValue,
  currentFieldValue,
  defaultFieldValue,
  lengthLimit,
  getBadgeText,
  runValidationTasks,
  errorMessage,
}) {
  const labelElement = <Text>{label}</Text>;
  const {
    tokens: {
      components: {
        fieldmessages: { error: errorStyles },
      },
    },
  } = useTheme();
  const [selectedBadgeIndex, setSelectedBadgeIndex] = React.useState();
  const [isEditing, setIsEditing] = React.useState();
  React.useEffect(() => {
    if (isEditing) {
      inputFieldRef?.current?.focus();
    }
  }, [isEditing]);
  const removeItem = async (removeIndex) => {
    const newItems = items.filter((value, index) => index !== removeIndex);
    await onChange(newItems);
    setSelectedBadgeIndex(undefined);
  };
  const addItem = async () => {
    const { hasError } = runValidationTasks();
    if (
      currentFieldValue !== undefined &&
      currentFieldValue !== null &&
      currentFieldValue !== "" &&
      !hasError
    ) {
      const newItems = [...items];
      if (selectedBadgeIndex !== undefined) {
        newItems[selectedBadgeIndex] = currentFieldValue;
        setSelectedBadgeIndex(undefined);
      } else {
        newItems.push(currentFieldValue);
      }
      await onChange(newItems);
      setIsEditing(false);
    }
  };
  const arraySection = (
    <React.Fragment>
      {!!items?.length && (
        <ScrollView height="inherit" width="inherit" maxHeight={"7rem"}>
          {items.map((value, index) => {
            return (
              <Badge
                key={index}
                style={{
                  cursor: "pointer",
                  alignItems: "center",
                  marginRight: 3,
                  marginTop: 3,
                  backgroundColor:
                    index === selectedBadgeIndex ? "#B8CEF9" : "",
                }}
                onClick={() => {
                  setSelectedBadgeIndex(index);
                  setFieldValue(items[index]);
                  setIsEditing(true);
                }}
              >
                {getBadgeText ? getBadgeText(value) : value.toString()}
                <Icon
                  style={{
                    cursor: "pointer",
                    paddingLeft: 3,
                    width: 20,
                    height: 20,
                  }}
                  viewBox={{ width: 20, height: 20 }}
                  paths={[
                    {
                      d: "M10 10l5.09-5.09L10 10l5.09 5.09L10 10zm0 0L4.91 4.91 10 10l-5.09 5.09L10 10z",
                      stroke: "black",
                    },
                  ]}
                  ariaLabel="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    removeItem(index);
                  }}
                />
              </Badge>
            );
          })}
        </ScrollView>
      )}
      <Divider orientation="horizontal" marginTop={5} />
    </React.Fragment>
  );
  if (lengthLimit !== undefined && items.length >= lengthLimit && !isEditing) {
    return (
      <React.Fragment>
        {labelElement}
        {arraySection}
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      {labelElement}
      {isEditing && children}
      {!isEditing ? (
        <>
          <Button
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Add item
          </Button>
          {errorMessage && hasError && (
            <Text color={errorStyles.color} fontSize={errorStyles.fontSize}>
              {errorMessage}
            </Text>
          )}
        </>
      ) : (
        <Flex justifyContent="flex-end">
          {(currentFieldValue || isEditing) && (
            <Button
              children="Cancel"
              type="button"
              size="small"
              onClick={() => {
                setFieldValue(defaultFieldValue);
                setIsEditing(false);
                setSelectedBadgeIndex(undefined);
              }}
            ></Button>
          )}
          <Button size="small" variation="link" onClick={addItem}>
            {selectedBadgeIndex !== undefined ? "Save" : "Add"}
          </Button>
        </Flex>
      )}
      {arraySection}
    </React.Fragment>
  );
}
export default function UserUpdateForm(props) {
  const {
    id: idProp,
    user: userModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    Name: "",
    Age: "",
    Gender: "",
    County: "",
    Email: "",
    Interests: [],
  };
  const [Name, setName] = React.useState(initialValues.Name);
  const [Age, setAge] = React.useState(initialValues.Age);
  const [Gender, setGender] = React.useState(initialValues.Gender);
  const [County, setCounty] = React.useState(initialValues.County);
  const [Email, setEmail] = React.useState(initialValues.Email);
  const [Interests, setInterests] = React.useState(initialValues.Interests);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = userRecord
      ? { ...initialValues, ...userRecord }
      : initialValues;
    setName(cleanValues.Name);
    setAge(cleanValues.Age);
    setGender(cleanValues.Gender);
    setCounty(cleanValues.County);
    setEmail(cleanValues.Email);
    setInterests(cleanValues.Interests ?? []);
    setCurrentInterestsValue("");
    setErrors({});
  };
  const [userRecord, setUserRecord] = React.useState(userModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getUser.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getUser
        : userModelProp;
      setUserRecord(record);
    };
    queryData();
  }, [idProp, userModelProp]);
  React.useEffect(resetStateValues, [userRecord]);
  const [currentInterestsValue, setCurrentInterestsValue] = React.useState("");
  const InterestsRef = React.createRef();
  const getDisplayValue = {
    Interests: (r) => {
      const enumDisplayValueMap = {
        ACTION_MOVIES: "Action movies",
        ACTION_TVSHOWS: "Action tvshows",
        ROM_COM_BOOKS: "Rom com books",
      };
      return enumDisplayValueMap[r];
    },
  };
  const validations = {
    Name: [{ type: "Required" }],
    Age: [{ type: "Required" }],
    Gender: [],
    County: [],
    Email: [{ type: "Required" }, { type: "Email" }],
    Interests: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          Name,
          Age,
          Gender: Gender ?? null,
          County: County ?? null,
          Email,
          Interests: Interests ?? null,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await client.graphql({
            query: updateUser.replaceAll("__typename", ""),
            variables: {
              input: {
                id: userRecord.id,
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "UserUpdateForm")}
      {...rest}
    >
      <TextField
        label="Name"
        isRequired={true}
        isReadOnly={false}
        value={Name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Name: value,
              Age,
              Gender,
              County,
              Email,
              Interests,
            };
            const result = onChange(modelFields);
            value = result?.Name ?? value;
          }
          if (errors.Name?.hasError) {
            runValidationTasks("Name", value);
          }
          setName(value);
        }}
        onBlur={() => runValidationTasks("Name", Name)}
        errorMessage={errors.Name?.errorMessage}
        hasError={errors.Name?.hasError}
        {...getOverrideProps(overrides, "Name")}
      ></TextField>
      <TextField
        label="Age"
        isRequired={true}
        isReadOnly={false}
        type="number"
        step="any"
        value={Age}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              Name,
              Age: value,
              Gender,
              County,
              Email,
              Interests,
            };
            const result = onChange(modelFields);
            value = result?.Age ?? value;
          }
          if (errors.Age?.hasError) {
            runValidationTasks("Age", value);
          }
          setAge(value);
        }}
        onBlur={() => runValidationTasks("Age", Age)}
        errorMessage={errors.Age?.errorMessage}
        hasError={errors.Age?.hasError}
        {...getOverrideProps(overrides, "Age")}
      ></TextField>
      <SelectField
        label="Gender"
        placeholder="Please select an option"
        isDisabled={false}
        value={Gender}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Name,
              Age,
              Gender: value,
              County,
              Email,
              Interests,
            };
            const result = onChange(modelFields);
            value = result?.Gender ?? value;
          }
          if (errors.Gender?.hasError) {
            runValidationTasks("Gender", value);
          }
          setGender(value);
        }}
        onBlur={() => runValidationTasks("Gender", Gender)}
        errorMessage={errors.Gender?.errorMessage}
        hasError={errors.Gender?.hasError}
        {...getOverrideProps(overrides, "Gender")}
      >
        <option
          children="M"
          value="M"
          {...getOverrideProps(overrides, "Genderoption0")}
        ></option>
        <option
          children="F"
          value="F"
          {...getOverrideProps(overrides, "Genderoption1")}
        ></option>
      </SelectField>
      <TextField
        label="County"
        isRequired={false}
        isReadOnly={false}
        value={County}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Name,
              Age,
              Gender,
              County: value,
              Email,
              Interests,
            };
            const result = onChange(modelFields);
            value = result?.County ?? value;
          }
          if (errors.County?.hasError) {
            runValidationTasks("County", value);
          }
          setCounty(value);
        }}
        onBlur={() => runValidationTasks("County", County)}
        errorMessage={errors.County?.errorMessage}
        hasError={errors.County?.hasError}
        {...getOverrideProps(overrides, "County")}
      ></TextField>
      <TextField
        label="Email"
        isRequired={true}
        isReadOnly={false}
        value={Email}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Name,
              Age,
              Gender,
              County,
              Email: value,
              Interests,
            };
            const result = onChange(modelFields);
            value = result?.Email ?? value;
          }
          if (errors.Email?.hasError) {
            runValidationTasks("Email", value);
          }
          setEmail(value);
        }}
        onBlur={() => runValidationTasks("Email", Email)}
        errorMessage={errors.Email?.errorMessage}
        hasError={errors.Email?.hasError}
        {...getOverrideProps(overrides, "Email")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              Name,
              Age,
              Gender,
              County,
              Email,
              Interests: values,
            };
            const result = onChange(modelFields);
            values = result?.Interests ?? values;
          }
          setInterests(values);
          setCurrentInterestsValue("");
        }}
        currentFieldValue={currentInterestsValue}
        label={"Interests"}
        items={Interests}
        hasError={errors?.Interests?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("Interests", currentInterestsValue)
        }
        errorMessage={errors?.Interests?.errorMessage}
        getBadgeText={getDisplayValue.Interests}
        setFieldValue={setCurrentInterestsValue}
        inputFieldRef={InterestsRef}
        defaultFieldValue={""}
      >
        <SelectField
          label="Interests"
          placeholder="Please select an option"
          isDisabled={false}
          value={currentInterestsValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.Interests?.hasError) {
              runValidationTasks("Interests", value);
            }
            setCurrentInterestsValue(value);
          }}
          onBlur={() => runValidationTasks("Interests", currentInterestsValue)}
          errorMessage={errors.Interests?.errorMessage}
          hasError={errors.Interests?.hasError}
          ref={InterestsRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "Interests")}
        >
          <option
            children="Action movies"
            value="ACTION_MOVIES"
            {...getOverrideProps(overrides, "Interestsoption0")}
          ></option>
          <option
            children="Action tvshows"
            value="ACTION_TVSHOWS"
            {...getOverrideProps(overrides, "Interestsoption1")}
          ></option>
          <option
            children="Rom com books"
            value="ROM_COM_BOOKS"
            {...getOverrideProps(overrides, "Interestsoption2")}
          ></option>
        </SelectField>
      </ArrayField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || userModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || userModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
