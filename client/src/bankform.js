import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  CardSubtitle,
  Button,
  NavItem,
} from "reactstrap";
import { Link } from "react-router-dom";

let disabledButton = {
  backgroundColor: "#e2e2e2",
  cursor: "not-allowed",
};

//VALIDATION 
function validateName(name) {
  let regex = /^[a-zA-Z\s]*$/g;
  if (name.length < 2 || regex.test(name) === false) {
    console.log("bad name");
    return false;
  } else {
    return true;
  }
}

function validateEmail(email) {
  const regex2 = /\S@\S/;
  if (!regex2.test(email) || email.length < 3) {
    console.log("bad email");
    return false;
  } else {
    return true;
  }
}

function validatePassword(password) {
  if (password.length < 8) {
    console.log("bad pw");
    return false;
  } else {
    return true;
  }
}
//END VALIDATION 

//SIGN-UP COMPONENT TO BE PASSED TO CREATEACCOUNT 

function BankForm({ bgcolor, label, handle, successButton }) {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [balance, setBalance] = React.useState(100, []);
  const [isError, setIsError] = React.useState(true);
  const [errors, setError] = React.useState({
    nameError: "",
    emailError: "",
    passwordError: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(true);

  function clearError() {
    setError({ nameError: "", emailError: "", passwordError: "" });
  }

  function handleCreate() {
    const isValidName = validateName(name);
    const isValidEmail = validateEmail(email);
    const isValidPassword = validatePassword(password);
  
    if (isValidName && isValidEmail && isValidPassword) {
      console.log("conditions met, isError is false");
      setIsError(false);
      handle({ name, email, password, balance });
  
      // send data to userRegister endpoint with fetch
      fetch("http://localhost:5000/register", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({ name, email, password, balance }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data, "userRegister");
        });
  
      setShow(false);
    } else {
      setIsError(true);
      setError({
        nameError: isValidName ? "" : "invalid name",
        emailError: isValidEmail ? "" : "invalid email",
        passwordError: isValidPassword ? "" : "invalid password",
      });
    }
  }
  

  function clearForm() {
    setName("");
    setEmail("");
    setPassword("");
    setShow(true);
  }
  return (
    <div>
      <Card style={{ width: '18rem', margin: 'auto', marginTop: '2rem' }}>
        <CardBody>
          <CardHeader style={{ width: 'auto', background: 'rebeccapurple' }}>
          <CardTitle tag="h5" style={{width: 'auto', color:'white'}}><b>Create Account</b></CardTitle>
          </CardHeader>
            <CardSubtitle className="mb-2 text-muted" tag="h6">
              <br/>
              Please fill out the form below
            </CardSubtitle>

          {show ? (
            <form>

              <div className="mb-3">
                Name
                <br />
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Enter Name"
                  value={name}
                  onChange={(e) => {
                    setName(e.currentTarget.value);
                    setButtonDisabled(false);
                    clearError();
                  }}
                />
                <div style={{ color: "red" }}>{errors.nameError}</div>
                Email Address
                <br />
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.currentTarget.value);
                    setButtonDisabled(false);
                    clearError();
                  }}
                />
                <div style={{ color: "red" }}>{errors.emailError}</div>
                Password <br />
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.currentTarget.value);
                    setButtonDisabled(false);
                    clearError();
                  }}
                />
                <div style={{ color: "red" }}>{errors.passwordError}</div>
              </div>

            </form>
          ) : (
            <div>
              <h3>
                Thank you for creating an account with BadBank! Here's $100 just
                for signing up. This is just on of the many benefits of doing
                business with BadBank.
              </h3>
              <br />
            </div>
          )}
          {show && buttonDisabled ? (
            <Button
              className="btn btn-dark"
              type="submit"
              onClick={handleCreate}
              style={disabledButton}
            >
              {label}
            </Button>
          ) : show && !buttonDisabled ? (
            <Button
              type="submit"
              className="btn btn-dark"
              onClick={handleCreate}
            >
              {label}
            </Button>
          ) : (
            <div>
              <Button
                type="submit"
                className="btn btn-dark"
                onClick={clearForm}
              >
                {successButton}
              </Button>
              <Button>
                <NavItem
                  tag={Link}
                  to="/Login"
                  style={{
                    textDecoration: "none",
                    color: "white",
                    margin: "2px",
                  }}
                >
                  Log In
                </NavItem>
              </Button>
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
}

export default BankForm;