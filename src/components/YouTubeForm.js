import React, { useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';

let renderCount = 0;

const YouTubeForm = () => {

    //version - 1
    // const form = useForm();

    //version - 2 : With default values
    const form = useForm({
        defaultValues: {
            username: "Sample",
            email: "",
            channel: "",
            social: {
                twitter: "",
                facebook: ""
            },
            phoneNumbers: ["", ""],
            phNumbers: [{ number: '' }],
            age: 0,
            dob: new Date()
        }
    });

    //version - 3 : with data from API
    // const form = useForm({
    //     defaultValues: async () => {
    //         const response = await fetch("https://jsonplaceholder.typicode.com/users/1");
    //         const data = await response.json();
    //         return {
    //             username: data.name,
    //             email: data.email,
    //             channel: ""
    //         };
    //     }
    // })

    const { register, control, handleSubmit, formState, watch } = form;
    const { errors } = formState;

    //This is one possible way to use register.
    // const { name, ref, onChange, onBlur } = register("username")

    const { fields, append, remove } = useFieldArray({
        name: 'phNumbers',
        control
    })

    const onSubmit = (data) => {
        console.log("Form Submitted", data);
    }

    // const watchUsername = watch("username");
    // const watchForm = watch();

    useEffect(() => {
        const subscription = watch((value) => {
            console.log(value);
        });

        // return () => subscription.unsubscribe();
    })

    renderCount++;
    return (
        <div>
            <h2>YouTube Form ({renderCount / 2})</h2>
            {/* <h3>Watchedvalue: {JSON.stringify(watchForm)}</h3> */}
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className='form-control'>
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        {...register("username", {
                            required: "Username is required",
                        })}
                    />
                    <p className='error'>{errors.username?.message}</p>
                </div>

                {/* <input
                    type="text"
                    id="username"
                    name={name}
                    ref={ref}
                    onChange={onChange}
                    onBlur={onBlur}
                /> */}

                <div className='form-control'>
                    <label htmlFor="email">E-mail</label>
                    <input
                        type="email"
                        id="email"
                        {...register("email", {
                            required: {
                                value: true,
                                message: "Email is required"
                            },
                            pattern: {
                                value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                                message: "Invalid email format"
                            },
                            // validate: (fieldValue) => {
                            //     return fieldValue === "admin@example.com" ? "Enter a different email address" : true;
                            // }
                            validate: {
                                notAdmin: (fieldValue) => {
                                    return (
                                        fieldValue === "admin@example.com" ? "Enter a different email address" : true
                                    );
                                },
                                notBlackListed: (fieldValue) => {
                                    return (
                                        fieldValue.endsWith("baddomain.com") ? "This domain is not supported" : true
                                    );
                                }
                            }
                        })}
                    />
                    <p className='error'>{errors.email?.message}</p>
                </div>

                <div className='form-control'>
                    <label htmlFor="channel">Channel</label>
                    <input
                        type="text"
                        id="channel"
                        {...register("channel", {
                            required: "Channel is required"
                        })}
                    />
                    <p className='error'>{errors.channel?.message}</p>
                </div>

                <div className='form-control'>
                    <label htmlFor="twitter">Twitter</label>
                    <input
                        type="text"
                        id="twitter"
                        {...register("social.twitter")}
                    />
                </div>

                <div className='form-control'>
                    <label htmlFor="facebook">Facebook</label>
                    <input
                        type="text"
                        id="facebook"
                        {...register("social.facebook")}
                    />
                </div>

                <div className='form-control'>
                    <label htmlFor="primary-phone">Primary phone number</label>
                    <input
                        type="text"
                        id="primary-phone"
                        {...register("phoneNumbers.0")}
                    />
                </div>

                <div className='form-control'>
                    <label htmlFor="secondary-phone">Secondary phone number</label>
                    <input
                        type="text"
                        id="secondary-phone"
                        {...register("phoneNumbers.1")}
                    />
                </div>

                <div>
                    <label>List of phone numbers</label>
                    <div>
                        {fields.map((field, index) => (
                            <div className='form-control' key={field.id}>
                                <input type='text' {...register(`phNumbers.$(index).name`)} />
                                {
                                    index > 0 && (
                                        <button type='button' onClick={() => remove(index)}>Remove</button>
                                    )
                                }
                            </div>
                        ))}
                        <button type='button' onClick={() => append({ number: "" })}>Add phone number</button>
                    </div>
                </div>

                <div className='form-control'>
                    <label htmlFor="age">Age</label>
                    <input
                        type="number"
                        id="age"
                        {...register("age", {
                            valueAsNumber: true,
                            required: {
                                value: true,
                                message: "Age is required"
                            }
                        })}
                    />
                    <p className='error'>{errors.age?.message}</p>
                </div>

                <div className='form-control'>
                    <label htmlFor="dob">Date of birth</label>
                    <input
                        type="date"
                        id="dob"
                        {...register("dob", {
                            valueAsDate: true,
                            required: {
                                value: true,
                                message: "Date of birth is required"
                            }
                        })}
                    />
                    <p className='error'>{errors.dob?.message}</p>
                </div>

                <button>Submit</button>
            </form>
            <DevTool control={control} />
        </div>
    )
}

export default YouTubeForm;