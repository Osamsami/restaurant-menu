// Wait for the DOM content to fully load before attaching event listeners
document.addEventListener("DOMContentLoaded", () => {
    // Select the form and the input elements we need to validate
    const orderForm = document.querySelector("#order-form form");
    const nameInput = document.getElementById("customer-name");
    const quantityInput = document.getElementById("quantity");

    // Helper function to display an error message below an input
    const showError = (inputElement, message) => {
        // Check if an error message already exists immediately following this input
        let errorSpan = inputElement.nextElementSibling;
        
        if (!errorSpan || !errorSpan.classList.contains("error-message")) {
            // Create a new error span if it doesn't already exist
            errorSpan = document.createElement("span");
            errorSpan.classList.add("error-message");
            // Optional: apply a basic inline style so it's visibly an error (red text)
            errorSpan.style.color = "red";
            errorSpan.style.fontSize = "0.9rem";
            
            // Insert the error span right after the input field
            inputElement.insertAdjacentElement("afterend", errorSpan);
        }
        
        // Update the text content of the error span
        errorSpan.textContent = message;
    };

    // Helper function to remove an error message if the field is valid
    const removeError = (inputElement) => {
        const errorSpan = inputElement.nextElementSibling;
        if (errorSpan && errorSpan.classList.contains("error-message")) {
            errorSpan.remove();
        }
    };

    // Handle form submission
    orderForm.addEventListener("submit", (event) => {
        // Stop the page from reloading
        event.preventDefault();

        let isValid = true;

        // Validate the customer name field
        // We trim whitespace to ensure the user didn't just type spaces
        const nameValue = nameInput.value.trim();
        if (nameValue === "") {
            showError(nameInput, "Please enter your name.");
            isValid = false;
        } else {
            removeError(nameInput);
        }

        // Validate the quantity field
        // Ensure it's a number and greater than or equal to 1
        const quantityValue = parseInt(quantityInput.value, 10);
        if (isNaN(quantityValue) || quantityValue < 1) {
            showError(quantityInput, "Please enter a valid quantity of 1 or more.");
            isValid = false;
        } else {
            removeError(quantityInput);
        }

        // If both validations pass, log success
        if (isValid) {
            console.log("Form is valid");
            // Future logic for summarizing the order can go here
        }
    });
});
