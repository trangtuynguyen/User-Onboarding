import React, {useState, useEffect} from "react";
import {Form, Field, withFormik} from "formik"
import * as Yup from "yup";
import axios from "axios"


function OnBoardForm({values, errors, touched, status}){
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // status sometimes comes through as undefined
        if (status) {
          setUsers([...users, status])
        }
    }, [status]);

    console.log(users);

    return(
        <div>
            <Form>
                <div>
                    {touched.name && errors.name && <p>{errors.name}</p>}
                    <Field type="text" name="name" placeholder="Name"/>
                </div>
                <div>
                    {touched.email && errors.email && <p>{errors.email}</p>}
                    <Field type="email" name="email" placeholder="Email"/>
                </div>
                <div>
                    {touched.password && errors.password && <p>{errors.password}</p>}
                    <Field type="password" name="password" placeholder="Password"/>
                </div>
                <div>
                    <p>Read Term and Conditions</p>
                    <Field type="checkbox" name="tos" checked={values.tos}/>
                </div>
                <button>Submit</button>
            </Form>
            {users.map(user =>(
                <div>
                    <h2>Your Sign Up Information Is</h2>
                    <p>{user.name}</p>
                    <p>{user.email}</p>
                    <p>{user.username}</p>
                    <p>{user.password}</p>
                </div>
            ))}

        </div>
    )

}

const FormikOnBoardForm = withFormik({

    mapPropsToValues({name, email ,password, tos}){
        return{
            name: name || "",
            email: email || "",
            password: password || "",
            tos: tos || false,
        }
    },

    validationSchema: Yup.object().shape({
        name: Yup.string().required("Please Enter a name!"),
        email: Yup.string()
            .email("Your email is not valid.")
            .required("Please enter an email"),
        password: Yup.string()
            .min(6,"Password must be 6 characters or longer")
            .required("Password is required.")
      }),

    handleSubmit(values, {resetForm,setErrors, setSubmitting, setStatus}) {
        if (values.email === "alreadytaken@atb.dev") {
            setErrors({ email: "That email is already taken" });
          }
        else {
            axios
              .post("https://reqres.in/api/users", values)
              .then(res => {
                console.log(res);
                setStatus(res.data)// Data was created successfully and logs to console
                resetForm();
                setSubmitting(false);
              })
              .catch(err => {
                console.log(err); // There was an error creating the data and logs to console
                setSubmitting(false);
              });
          }
        console.log(values)

    }

})(OnBoardForm);

export default FormikOnBoardForm;