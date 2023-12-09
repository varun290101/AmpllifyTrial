/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { getInterest } from "../graphql/queries";
import { updateInterest } from "../graphql/mutations";
const client = generateClient();
export default function InterestUpdateForm(props) {
  const {
    id: idProp,
    interest: interestModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    Interest: "",
  };
  const [interest, setInterest] = React.useState(initialValues.Interest);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = interestRecord
      ? { ...initialValues, ...interestRecord }
      : initialValues;
    setInterest(cleanValues.Interest);
    setErrors({});
  };
  const [interestRecord, setInterestRecord] = React.useState(interestModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getInterest.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getInterest
        : interestModelProp;
      setInterestRecord(record);
    };
    queryData();
  }, [idProp, interestModelProp]);
  React.useEffect(resetStateValues, [interestRecord]);
  const validations = {
    Interest: [{ type: "Required" }],
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
          Interest: interest,
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
            query: updateInterest.replaceAll("__typename", ""),
            variables: {
              input: {
                id: interestRecord.id,
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
      {...getOverrideProps(overrides, "InterestUpdateForm")}
      {...rest}
    >
      <TextField
        label="Interest"
        isRequired={true}
        isReadOnly={false}
        value={interest}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Interest: value,
            };
            const result = onChange(modelFields);
            value = result?.Interest ?? value;
          }
          if (errors.Interest?.hasError) {
            runValidationTasks("Interest", value);
          }
          setInterest(value);
        }}
        onBlur={() => runValidationTasks("Interest", interest)}
        errorMessage={errors.Interest?.errorMessage}
        hasError={errors.Interest?.hasError}
        {...getOverrideProps(overrides, "Interest")}
      ></TextField>
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
          isDisabled={!(idProp || interestModelProp)}
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
              !(idProp || interestModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
