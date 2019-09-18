const formValidateNumeric = (function() {
    document.addEventListener("DOMContentLoaded", function() {
        function submit() {
            if (!document.getElementById("message").value)
                document.getElementById("message-error").innerHTML =
                    "Message required.";

            return false;
        }

        function validate(id, label) {
            const error = document.getElementById(id + "-error");
            if (document.getElementById(id).value) {
                error.innerHTML = "";
                error.setAttribute("aria-invalid", "false");
                error.setAttribute("aria-role", "alert");
            } else {
                error.innerHTML = label + " required.";
                error.setAttribute("aria-invalid", "true");
                error.removeAttribute("aria-role");
            }
        }

        // array of fields to be validated
        const validInputs = [
            ...document.querySelectorAll(".js-validate-numeric")
        ];

        // disable/enable save button
        function enableSaveBtn() {
            const saveBtn = document.querySelector("#js-save");
            const validErrors = [
                ...document.querySelectorAll(".validation-msg.visible")
            ];

            if (validErrors.length >= 1) {
                saveBtn.classList.add("disabled");
            } else {
                saveBtn.classList.remove("disabled");
            }
        }

        // target each input field to validate
        validInputs.forEach(function(validInput) {
            validInput.addEventListener(
                "input",
                function() {
                    const inputVal = validInput.value;
                    const valString = inputVal.match(/[a-z]/i);
                    const valSpecial = inputVal.match(
                        /[ !@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?]/
                    );
                    const parsedInputVal = parseFloat(validInput.value);
                    const minVal = validInput.dataset.numericMin;
                    const maxVal = validInput.dataset.numericMax;
                    const inputRow = validInput.closest(".row");
                    const valMsg = inputRow.querySelector(".validation-msg");

                    if (
                        parsedInputVal < minVal ||
                        parsedInputVal > maxVal ||
                        valString ||
                        valSpecial
                    ) {
                        validInput.classList.add("error", "error-bgcolor");
                        inputRow.classList.add("error");
                        valMsg.classList.remove("hidden");
                        valMsg.classList.add("visible");
                        enableSaveBtn();
                    } else {
                        validInput.classList.remove("error", "error-bgcolor");
                        inputRow.classList.remove("error");
                        valMsg.classList.add("hidden");
                        valMsg.classList.remove("visible");
                    }

                    if (parsedInputVal < minVal) {
                        valMsg.innerHTML = "Min is £" + minVal;
                    } else if (parsedInputVal > maxVal) {
                        valMsg.innerHTML = "Max is £" + maxVal;
                    } else if (valString || valSpecial) {
                        valMsg.innerHTML = "Should be a number";
                    } else {
                        valMsg.innerHTML = "";
                        enableSaveBtn();
                    }
                },
                true
            );
        });
    });
})();
