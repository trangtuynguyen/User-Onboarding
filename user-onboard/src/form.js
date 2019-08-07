import React from "react"
import {Form, Field, withFormik, setNestedObjectValues} from "formik"

function onBoardForm(){

    return(
        <Form>
            <Field type="text" name="name" placeholder="Name"/>
            <Field type="email" name="email" placeholder="Email"/>
            <Field type="password" name="password" placeholder="Password"/>
            <Field type="checkbox" name="tos" checked={values.tos}/>
        </Form>
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
    }

})