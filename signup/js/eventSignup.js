const { createApp } = Vue;

createApp({
    data() {
        return {
            fname: "",
            lname: "",
            email: "",
            password: "",
            cpassword: "",
            errors: {}
        };
    },
    methods: {
        validateForm() {
            this.errors = {}; // Reset errors before validation

            // Name validation
            if (!/^[a-zA-Z]+$/.test(this.fname)) {
                this.errors.fname = "First name is invalid";
            }
            if (!/^[a-zA-Z]+$/.test(this.lname)) {
                this.errors.lname = "Last name is invalid";
            }

            // Email validation
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) {
                this.errors.email = "Email is invalid";
            }

            // Password validation
            if (this.password.length < 6) {
                this.errors.password = "Password must be at least 6 characters";
            }
            if (this.password !== this.cpassword) {
                this.errors.cpassword = "Passwords do not match";
            }

            // If no errors, submit the form
            if (Object.keys(this.errors).length === 0) {
                alert("Form submitted successfully!");
            }
        }
    }
}).mount("#app");