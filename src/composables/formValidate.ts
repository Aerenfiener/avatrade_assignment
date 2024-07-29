import { reactive, computed, watch } from 'vue';

interface FieldRule {
    field: string;
    message: string;
    validate: (value: any) => boolean;
}

interface ValidationResult {
    isValid: boolean;
    message: string;
}

interface FormState {
    [key: string]: any;
}

export function useValidation(initialState: FormState, rules: FieldRule[]) {
    const formState = reactive({ ...initialState });
    const validationResults = reactive<{ [key: string]: ValidationResult }>({});

    // Initialize validation results
    for (const field in initialState) {
        validationResults[field] = { isValid: true, message: '' };
    }

    const validateField = (field: string) => {
        const rule = rules.find(rule => rule.field === field);
        if (rule) {
            const isValid = rule.validate(formState[field]);
            validationResults[field] = {
                isValid,
                message: isValid ? '' : rule.message,
            };
        }
    };

    const validateAll = () => {
        for (const field in formState) {
            validateField(field);
        }
    };

    const isFormValid = computed(() => {
        return Object.values(validationResults).every(result => result.isValid);
    });

    // Watch for changes in formState and validate fields automatically
    for (const field in formState) {
        watch(() => formState[field], () => {
            validateField(field);
        });
    }

    return {
        formState,
        validationResults,
        validateField,
        validateAll,
        isFormValid,
    };
}
