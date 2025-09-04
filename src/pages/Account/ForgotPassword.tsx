import { Button, Card, CardBody } from '@heroui/react';
import { Field, Form, Formik } from 'formik';
import React from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IForgotPasswordEmailModel, IForgotPasswordOTPModel, IForgotPasswordPasswordModel, ILoginResponseModel } from '../../models/account';
import { Routing } from '../../routes/routing';
import accountService from '../../services/account-service';
import { CustomInput } from '../../shared/customFormField';
import CustomOtpInput from '../../shared/customFormField/CustomOtpInput';
import { adminLogin } from '../../store/slices/authSlice';
import { ForgotEmailValidationSchema, ForgotOTPValidationSchema, ForgotPasswordValidationSchema } from '../../validation/account';
import './login.scss';

const ActionType = {
  Email: 'Email',
  Otp: 'Otp',
  Password: 'Password',
} as const;

type ActionType = typeof ActionType[keyof typeof ActionType];

const ForgotPassword = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();


  const [actionType, setActionType] = React.useState<ActionType>(ActionType.Email);


  const emailState: IForgotPasswordEmailModel = { email: "" };

  const otpState: IForgotPasswordOTPModel = { otp: '' };

  const passwordState: IForgotPasswordPasswordModel = {
    password: '',
    confirmPassword: ''
  };


  const handleEmailSubmit = async (values: IForgotPasswordEmailModel) => {
    await accountService
      .forgotPassword(values)
      .then((response) => {
        const responseData: ILoginResponseModel = response?.data?.data;
        if (response?.data?.status) {
          dispatch(adminLogin(responseData));
          setActionType(ActionType.Otp);
        }
      })
      .catch((error: Error) => console.log(error?.message));
  };

  const handleOtpSubmit = async (values: IForgotPasswordOTPModel) => {
    await accountService
      .varifyOTP(values)
      .then((response) => {
        const responseData: ILoginResponseModel = response?.data?.data;
        if (response?.data?.status) {
          dispatch(adminLogin(responseData));
          setActionType(ActionType.Password);
        }
      })
      .catch((error: Error) => console.log(error?.message));
  };

  const ResendOTP = async () => {
    await accountService
      .resendOTP()
      .then((response) => {
        const responseData: ILoginResponseModel = response?.data?.data;
        if (response?.data?.status) {
          dispatch(adminLogin(responseData));
        }
      })
      .catch((error: Error) => console.log(error?.message));
  };

  const handlePasswordSubmit = async (values: IForgotPasswordPasswordModel) => {
    await accountService
      .resetPassword(values)
      .then((response) => {
        if (response?.data?.status) {
          navigate(Routing.Login)
        }
      })
      .catch((error: Error) => console.log(error?.message));
  };


  return (
    <div>

      <div className='login-section bg-background'>

        <div className="login-form-section">

          <Card className='login-form' >

            <IoIosArrowBack className='back-icon' onClick={() => navigate(Routing.Login)} />

            <div className="login-img-section">
              <div className="login-img">
                <img src="/images/property_bacho_logo.png" alt='' />
              </div>
              {/* <div className="login-heading">
                <p className="text-2xl font-bold">Property Bacho</p>
              </div> */}
            </div>

            <CardBody>
              {actionType === ActionType.Email && (
                <>
                  <p className='mb-2 text-center text-xl font-semibold'>Forgot password</p>
                  <p className="text-muted text-base text-center text-primary-100">
                    Enter your register mail id to reset your password
                  </p>

                  <Formik
                    initialValues={emailState}
                    onSubmit={handleEmailSubmit}
                    validationSchema={ForgotEmailValidationSchema}
                    validateOnBlur={false}
                    validateOnChange={true}
                    enableReinitialize={true}
                  >
                    {({ values, setFieldValue, handleSubmit }) => {
                      return (

                        <Form onSubmit={handleSubmit} className='form-data mt-5'>

                            <div className="mb-5 form-group">
                            <Field
                              name="email"
                              type="email"
                              value={values?.email}
                              label="Email"
                              onChange={(value: string) => setFieldValue('email', value)}
                              component={CustomInput}
                            />
                            </div>

                          <Button variant="solid" className="w-full bg-gradient-to-r from-primary-100 to-secondary-50 h-[50px] text-lg" type="submit">
                            Submit
                          </Button>

                        </Form>
                      )
                    }}
                  </Formik>
                </>
              )}

              {actionType === ActionType.Otp && (
                <>
                  <p className='mb-2 text-center text-xl font-semibold'>Forgot password</p>
                  <p className="text-muted text-base text-center text-primary-100">
                    Enter 6 digit code that you received in your mail
                  </p>
                  <Formik
                    initialValues={otpState}
                    onSubmit={handleOtpSubmit}
                    validationSchema={ForgotOTPValidationSchema}
                    validateOnBlur={false}
                    validateOnChange={true}
                    enableReinitialize={true}
                  >
                    {({ values, setFieldValue, handleSubmit }) => {
                      return (

                        <Form onSubmit={handleSubmit} className='form-data'>
                          <div className='mt-5'>
                            <Field
                              name="otp"
                              numInputs={6}
                              value={values?.otp}
                              label="OTP"
                              onChange={(value: string) => setFieldValue('otp', value)}
                              component={CustomOtpInput}
                            />

                            <div className="form-group forgot text-right mt-5">
                              <p className="text-muted hover:cursor-pointer text-primary-100 text-sm inline-block" onClick={ResendOTP}>
                                Resend Otp
                              </p>
                            </div>
                            <Button variant="solid" className="w-full bg-gradient-to-r from-primary to-secondary-50 h-[50px] text-lg mt-8" type="submit">
                              Submit
                            </Button>

                          </div>
                        </Form>
                      )
                    }}
                  </Formik>
                </>
              )}

              {actionType === ActionType.Password && (
                <>
                  <p className='mb-2 text-center text-xl font-semibold'>Reset password</p>
                  <p className="text-muted text-base text-center text-primary-100">
                    Reset your password for re-login in your account
                  </p>
                  <Formik
                    initialValues={passwordState}
                    onSubmit={handlePasswordSubmit}
                    validationSchema={ForgotPasswordValidationSchema}
                    validateOnBlur={false}
                    validateOnChange={true}
                    enableReinitialize={true}
                  >
                    {({ values, setFieldValue, handleSubmit }) => {
                      return (

                        <Form onSubmit={handleSubmit} className='form-data mt-5'>

                          <div className="mb-5 form-group">
                            <Field
                              type="password"
                              name="password"
                              value={values?.password}
                              label="Password"
                              onChange={(value: string) => setFieldValue('password', value)}
                              component={CustomInput}
                            />
                          </div>

                          <div className="mb-4 form-group">
                            <Field
                              type="password"
                              name="confirmPassword"
                              value={values?.confirmPassword}
                              label="Confirm Password"
                              onChange={(value: string) => setFieldValue('confirmPassword', value)}
                              component={CustomInput}
                            />
                          </div>

                          <Button variant="solid" className="w-full bg-gradient-to-r from-primary to-secondary-50 h-[50px] text-lg mt-8" type="submit">
                            Submit
                          </Button>

                        </Form>
                      )
                    }}
                  </Formik>
                </>
              )}
            </CardBody>
          </Card>
        </div>

        {/* <img className='bg-img' src="/images/login-img.svg" alt='' /> */}
      </div>

    </div>
  )
}

export default ForgotPassword
