/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type InterestUpdateFormInputValues = {
    Interest?: string;
};
export declare type InterestUpdateFormValidationValues = {
    Interest?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type InterestUpdateFormOverridesProps = {
    InterestUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    Interest?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type InterestUpdateFormProps = React.PropsWithChildren<{
    overrides?: InterestUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    interest?: any;
    onSubmit?: (fields: InterestUpdateFormInputValues) => InterestUpdateFormInputValues;
    onSuccess?: (fields: InterestUpdateFormInputValues) => void;
    onError?: (fields: InterestUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: InterestUpdateFormInputValues) => InterestUpdateFormInputValues;
    onValidate?: InterestUpdateFormValidationValues;
} & React.CSSProperties>;
export default function InterestUpdateForm(props: InterestUpdateFormProps): React.ReactElement;
