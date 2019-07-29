import React from "react";

// We make our form a fully controlled component that does not manage any state.
function BookForm({
    name,
    formSubmitting,
    validationErrors,
    formSuccess,
    formError,
    handleNameChange,
    resetFormState,
    handleSubmit
}) {
    const disabled = !name;

    return (
        <form className="bkls-form" onSubmit={handleSubmit}>
            {formSuccess && (
                <p className="bkls-alert bkls-alert-success">
                    Form submitted successfully.
                </p>
            )}
            {formError && (
                <p className="bkls-alert bkls-alert-error">
                    Sorry, error submitting form. Please retry.
                </p>
            )}
            <div className="bkls-form-row">
                <div className="bkls-form-col">
                    <label htmlFor="name">Name</label>
                    <div className="bkls-form-input-group">
                        <input
                            type="text"
                            name="name"
                            className={validationErrors.name ? "has-error" : ""}
                            autoComplete="off"
                            value={name}
                            onChange={handleNameChange}
                            disabled={formSubmitting}
                        />
                        {validationErrors.name && (
                            <span className="bkls-form-input-error">
                                {validationErrors.name}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            <button
                className="bkls-btn bkls-btn-form"
                type="submit"
                disabled={disabled || formSubmitting}
            >
                Submit
            </button>
            <button
                className="bkls-btn bkls-btn-form"
                type="reset"
                onClick={resetFormState}
                disabled={formSubmitting}
            >
                Reset
            </button>
        </form>
    );
}

export default BookForm;