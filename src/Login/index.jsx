import React from 'react';
import { Formik, Form, Field } from 'formik';
import { GetContext } from '../_main/context';
import { EMPTY_LOGIN_NAME, EMPTY_PASSWORD } from '../_main/errorConstants';
import { PASSWORD_REGEX, NOT_EMPTY_REGEX } from '../_main/constants';
import { Button } from '@material-ui/core';
import { useImmer } from 'use-immer';
import { LIST_ROUTE } from '../_main/routeConstants';
import { getUser, getuserid } from './action';

import './style.css';

function Login({ history }) {
    const { state , dispatch } = GetContext();
    const [store, updateStore] = useImmer({
        errorMsg: '',
    });
    const removeMsg = () => {
        updateStore((draft) => {
            draft.errorMsg = '';
           })
    }
    const handleSubmit = (form) => {
        getUser(form, dispatch)
            .then(({ isSuccess }) => {
                if (isSuccess) {
                   history.push(LIST_ROUTE);
                }
            })
            .catch(({ error }) => {
                updateStore((draft) => {
                    draft.errorMsg = 'Sorry, unrecognized username or password';
                   })
            });
    };

    return (
        <div id="login-container">
            <div className="body-container flex flex-center">
                <div className="login-form-container flex">
                    <div className="login-form">
                        <div className="name">Welcome</div>
                        <i>Mandatory fields are marked with an asterisk.</i>
                        <Formik
                            enableReinitialize
                          initialValues={{ email: '', password: '' }}
                            onSubmit={handleSubmit}
                            validate={(values) => {
                                const errors = {};
                                for (const obj in values) {
                                    switch (obj) {
                                        case 'name':
                                            !RegExp(NOT_EMPTY_REGEX, 'g').test(values[obj])
                                                && (errors.email = EMPTY_LOGIN_NAME);
                                            break;
                                        case 'pass':
                                            !RegExp(NOT_EMPTY_REGEX, 'g').test(values[obj])
                                                && (errors.password = EMPTY_PASSWORD);
                                            break;
                                    }
                                }
                                return errors;
                            }}
                        >
                            {({ submitForm, errors }) => (
                                <Form>
                                    <div className="pt-1">
                                        <div className="user-name">
                                            E-mail <span className="asterisk">*</span>
                                        </div>
                                        <Field
                                            className="user-name-field"
                                            name="email"
                                            type="text"
                                            label="email"
                                            variant="outlined"
                                            size="small"
                                            onInput={removeMsg}
                                            disabled={false}
                                        />
                                        {errors.email && <div className="error-message">{errors.email}</div>}
                                        <div className="pt-1 password-label">
                                            Password <span className="asterisk">*</span>
                                        </div>

                                        <Field
                                            className="password-field"
                                            name="password"
                                            type="text"
                                            label="password"
                                            variant="outlined"
                                            size="small"
                                            onInput={removeMsg}
                                            disabled={false}
                                        />
                                        {errors.password && <div className="error-message">{errors.password}</div>}
                                        { store.errorMsg !== '' && <div className="invalidUser">{store.errorMsg}</div> }
                                        <div className="submit-container">
                                        <Button
                                            className='submit-button'
                                            variant='contained'
                                            color='primary'
                                            type='submit'
                                            disabled={false}
                                            onClick={submitForm}>
                                            Log In
                                        </Button>
                                        </div>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
