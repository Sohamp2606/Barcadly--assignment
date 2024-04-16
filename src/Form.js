import { useState } from "react";
import { useNavigate } from "react-router-dom";

// -->>  form component
export default function Form() {
  // state for data
  const [formData, setFormData] = useState({
    userName: "",
    age: "",
    phoneNo: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // state for errors
  const [formErrors, setFormErrors] = useState({});

  // state for submittion status
  const [isSubmitted, setSubmitted] = useState(false);

  // -->> function that contain validation function
  const validteData = () => {
    let newErrors = {};

    // email validation functions using regex
    const isValidEmail = (email) => {
      const emailCode = /^\S+@\S+\.\S/;
      return emailCode.test(email);
    };

    // phone no validation funtion
    const isValidNumber = (phoneNo) => {
      const numCode = /^\d{10}$/;
      return numCode.test(phoneNo);
    };

    // password validation
    const isValidpassword = (password) => {
      const passwordCode =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      return passwordCode.test(password);
    };

    // confirmPassword validation funtion
    const isvalidConfirmPassword = (confirmPassword) => {
      return formData.password === confirmPassword;
    };

    // age validation funtion
    const isValidAge = (age) => {
      return parseInt(age) >= 10 && parseInt(age) <= 120;
    };

    // -->>   here i check the conditions and send data to validation funtion
    if (!formData.userName) {
      newErrors.userName = "Username is Required";
    }

    if (!formData.email) {
      newErrors.email = "Email is Required";
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "Invalid Email format";
    }

    if (!formData.phoneNo) {
      newErrors.phoneNo = "Phone number is Required";
    } else if (!isValidNumber(formData.phoneNo)) {
      newErrors.phoneNo = "Enter valid 10 digit Number ";
    }

    if (!formData.password) {
      newErrors.password = "password is Required";
    } else if (!isValidpassword(formData.password)) {
      newErrors.password =
        "password must be 5 digit with number,uppercase and lowecase alphabet and sysmbol ";
    }

    if (!formData.age) {
      newErrors.age = "Age is Required";
    } else if (!isValidAge(formData.age)) {
      newErrors.age = "Enter valid Age";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm password is Required";
    } else if (!isvalidConfirmPassword(formData.confirmPassword)) {
      newErrors.confirmPassword = "password does not match";
    }

    // now assign all errors from newErros to error state
    setFormErrors(newErrors);

    // if there is any feild empty then return false 
    if (
      !formData.userName ||
      !formData.age ||
      !formData.phoneNo ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      return false; // Return false if any required field is empty
    }

    // if errors object has 0 errors means form is valid with 0 errors
    return Object.keys(formErrors).length === 0;
  };

  // -->>  handler funtions
  const handleChange = (e) => {
    const { name, value } = e.target;

    // set the data when user type in input
    setFormData({ ...formData, [name]: value });
  };

  const navigate = useNavigate();

  // handle the submittion of form
  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = validteData();
    if (isValid) {
      setSubmitted(true);

      // here i want condition
      if (isValid) {
        // if form valid then go to next page
        navigate("/nextPage");
      }

      // after successful submittion reset the form
      setFormData({
        userName: "",
        age: "",
        phoneNo: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    }
  };

  return (
    // onSubmit={handleSubmit}
    <form className="form" onSubmit={handleSubmit}>
      <h2 className="title">Fill the Form</h2>
      <div className="feild">
        <label>User Name : </label>
        <input
          type="text"
          name="userName"
          value={formData.userName}
          onChange={handleChange}
        />
      </div>
      {/* error message conditional rendering */}
      {formErrors.userName && (
        <span className="error">{formErrors.userName}</span>
      )}

      <div className="feild">
        <label>Age : </label>
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
        />
      </div>
      {/* error message conditional rendering */}
      {formErrors.age && <span className="error">{formErrors.age}</span>}

      <div className="feild">
        <label>Email : </label>
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Example@gmail.com"
        />
      </div>
      {formErrors.email && <span className="error">{formErrors.email}</span>}

      <div className="feild">
        <label>Mobile No : </label>
        <input
          type="text"
          name="phoneNo"
          value={formData.phoneNo}
          onChange={handleChange}
        />
      </div>
      {formErrors.phoneNo && (
        <span className="error">{formErrors.phoneNo}</span>
      )}

      <div className="feild">
        <label>password : </label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </div>
      {formErrors.password && (
        <span className="error">{formErrors.password}</span>
      )}

      <div className="feild">
        <label>Confirm password : </label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
      </div>
      {formErrors.confirmPassword && (
        <span className="error">{formErrors.confirmPassword}</span>
      )}

      {isSubmitted && Object.keys(formErrors).length === 0 && (
        <span className="success">Form Submited Successfully</span>
      )}

      <button type="submit" className="button">
        Save
      </button>
    </form>
  );
}
