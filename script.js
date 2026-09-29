const password =
    document.getElementById("password");

const togglePassword =
    document.getElementById("togglePassword");

const strengthBar =
    document.getElementById("strengthBar");

const strengthText =
    document.getElementById("strengthText");

const scoreElement =
    document.getElementById("score");

const scoreMessage =
    document.getElementById("scoreMessage");

const securityLevel =
    document.getElementById("securityLevel");

const statusIndicator =
    document.getElementById("statusIndicator");

const complexity =
    document.getElementById("complexity");

const passwordLength =
    document.getElementById("passwordLength");

const requirementCount =
    document.getElementById("requirementCount");


/* SHOW / HIDE PASSWORD */

togglePassword.addEventListener(
    "click",
    function () {

        if (
            password.type === "password"
        ) {

            password.type = "text";

            togglePassword.textContent =
                "🙈";

        } else {

            password.type = "password";

            togglePassword.textContent =
                "👁";

        }

    }
);


/* PASSWORD ANALYSIS */

password.addEventListener(
    "input",
    function () {

        const value =
            password.value;


        /* CONDITIONS */

        const hasLength =
            value.length >= 8;

        const hasUppercase =
            /[A-Z]/.test(value);

        const hasLowercase =
            /[a-z]/.test(value);

        const hasNumber =
            /[0-9]/.test(value);

        const hasSpecial =
            /[^A-Za-z0-9\s]/.test(value);

        const hasNoSpaces =
            !/\s/.test(value);


        /* UPDATE REQUIREMENTS */

        updateRequirement(
            "length",
            hasLength
        );

        updateRequirement(
            "uppercase",
            hasUppercase
        );

        updateRequirement(
            "lowercase",
            hasLowercase
        );

        updateRequirement(
            "number",
            hasNumber
        );

        updateRequirement(
            "special",
            hasSpecial
        );

        updateRequirement(
            "space",
            hasNoSpaces
        );


        /* SCORE */

        let score = 0;

        if (hasLength)
            score += 20;

        if (hasUppercase)
            score += 20;

        if (hasLowercase)
            score += 20;

        if (hasNumber)
            score += 20;

        if (hasSpecial)
            score += 20;


        if (!hasNoSpaces)
            score -= 10;


        if (score < 0)
            score = 0;


        /* REQUIREMENT COUNT */

        let count = 0;

        if (hasLength)
            count++;

        if (hasUppercase)
            count++;

        if (hasLowercase)
            count++;

        if (hasNumber)
            count++;

        if (hasSpecial)
            count++;

        if (hasNoSpaces)
            count++;


        requirementCount.textContent =
            count;


        /* LENGTH */

        passwordLength.textContent =
            value.length;


        /* COMPLEXITY */

        if (value.length === 0) {

            complexity.textContent =
                "--";

        } else if (count <= 2) {

            complexity.textContent =
                "Low";

        } else if (count <= 4) {

            complexity.textContent =
                "Medium";

        } else {

            complexity.textContent =
                "High";

        }


        /* SCORE */

        scoreElement.textContent =
            score;


        /* STRENGTH */

        updateStrength(score);

    }
);


/* REQUIREMENT FUNCTION */

function updateRequirement(
    id,
    valid
) {

    const element =
        document.getElementById(id);

    if (valid) {

        element.classList.add(
            "valid"
        );

    } else {

        element.classList.remove(
            "valid"
        );

    }

}


/* STRENGTH FUNCTION */

function updateStrength(score) {

    if (
        password.value.length === 0
    ) {

        strengthBar.style.width =
            "0%";

        strengthBar.style.background =
            "#334155";

        strengthText.textContent =
            "Waiting...";

        strengthText.style.color =
            "#64748b";

        securityLevel.textContent =
            "WAITING";

        securityLevel.style.color =
            "#64748b";

        statusIndicator.style.background =
            "#64748b";

        statusIndicator.style.boxShadow =
            "none";

        scoreMessage.textContent =
            "Enter a password to begin analysis.";

        return;
    }


    strengthBar.style.width =
        score + "%";


    if (score < 40) {

        /* WEAK */

        strengthBar.style.background =
            "#ef4444";

        strengthText.textContent =
            "Weak";

        strengthText.style.color =
            "#ef4444";

        securityLevel.textContent =
            "WEAK";

        securityLevel.style.color =
            "#ef4444";

        statusIndicator.style.background =
            "#ef4444";

        statusIndicator.style.boxShadow =
            "0 0 10px rgba(239,68,68,0.7)";

        scoreMessage.textContent =
            "Your password needs stronger security.";

    }

    else if (score < 80) {

        /* MEDIUM */

        strengthBar.style.background =
            "#f59e0b";

        strengthText.textContent =
            "Medium";

        strengthText.style.color =
            "#f59e0b";

        securityLevel.textContent =
            "MEDIUM";

        securityLevel.style.color =
            "#f59e0b";

        statusIndicator.style.background =
            "#f59e0b";

        statusIndicator.style.boxShadow =
            "0 0 10px rgba(245,158,11,0.7)";

        scoreMessage.textContent =
            "Good start, but your password can be stronger.";

    }

    else {

        /* STRONG */

        strengthBar.style.background =
            "#22c55e";

        strengthText.textContent =
            "Strong";

        strengthText.style.color =
            "#22c55e";

        securityLevel.textContent =
            "STRONG";

        securityLevel.style.color =
            "#22c55e";

        statusIndicator.style.background =
            "#22c55e";

        statusIndicator.style.boxShadow =
            "0 0 10px rgba(34,197,94,0.7)";

        scoreMessage.textContent =
            "Your password meets the basic security requirements.";

    }

}