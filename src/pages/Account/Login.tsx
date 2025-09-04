import { Button, Card, CardBody } from '@heroui/react';
import { Field, Form, Formik } from "formik";
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ILoginRequestModel, ILoginResponseModel } from '../../models/account';
import { Routing } from "../../routes/routing";
import accountService from '../../services/account-service';
import { CustomInput } from "../../shared/customFormField";
import { adminLogin } from '../../store/slices/authSlice';
import { LoginValidationSchema } from "../../validation/account";
import './login.scss';

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const initialValues: ILoginRequestModel = {
    email: "admin@gmail.com",
    password: "admin@1234",
  };

  const handleSubmit = async (values: ILoginRequestModel) => {
    await accountService
      .login(values)
      .then(async (response) => {
        const responseData: ILoginResponseModel = response?.data?.data;
        if (response?.data?.status) {
          toast.success(response?.data?.message);
          dispatch(adminLogin(responseData));
          navigate(Routing.Dashboard)
        }
      })
      .catch((error: Error) => console.log(error?.message));
  };

  return (
    <div className='login-section bg-background'>

      <div className="login-form-section">

        <Card className="login-form">
          <div className="login-img-section">
            <div className="login-img">
              <img src="/images/property_bacho_logo.png" alt='' />
            </div>
            {/* <div className="login-heading">
              <p className="text-2xl font-bold">Property Bacho</p>
            </div> */}
          </div>
          <CardBody className="p-0 mt-10 login-form-content">
            <p className="mb-5 text-center text-xl font-semibold">Login</p>
            <Formik
              initialValues={initialValues}
              onSubmit={handleSubmit}
              validationSchema={LoginValidationSchema}
              validateOnBlur={false}
              validateOnChange={true}
              enableReinitialize={true}
            >
              {({ values, setFieldValue, handleSubmit }) => {
                return (

                  <Form onSubmit={handleSubmit} className='form-data'>

                    <div className="mb-3 form-group">
                      <Field
                        name="email"
                        type="email"
                        value={values?.email}
                        label="Email"
                        onChange={(value: string) => setFieldValue('email', value)}
                        component={CustomInput}
                      />

                    </div>

                    <div className="mb-3 form-group">
                      <Field
                        name="password"
                        type="password"
                        value={values?.password}
                        label="Password"
                        onChange={(value: string) => setFieldValue('password', value)}
                        component={CustomInput}
                      />

                    </div>

                    <div className="form-group forgot text-right">
                      <p className="text-muted hover:cursor-pointer text-primary-100 text-sm inline-block" onClick={() => navigate(Routing.ForgotPassword)}>
                        Forgot password?
                      </p>
                    </div>

                    <Button variant="solid" className="w-full mt-10 bg-gradient-to-r from-primary-100 to-secondary-50 h-[50px] text-lg" type='submit'>
                      Login
                    </Button>

                  </Form>

                )
              }}
            </Formik>
          </CardBody>
        </Card>


      </div>

      {/* <img className='bg-img' src="/images/login-img.svg" alt='' /> */}
    </div>
  )
}

export default Login
