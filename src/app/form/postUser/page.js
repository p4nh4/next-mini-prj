// 'use client'
// import axios from "axios";
// import { Formik, Form, Field, ErrorMessage } from "Formik"
// import { useRouter } from "next/router";
// import { useState } from "react";
// import * as Yup from 'yup'
// import { BASE_URL } from "@/app/utils/constant";
// export default function Users(){
//     const [isLoading, setIsLoading] = useState(true);
//     const [imageURL, setImageURL] = useState("");

//     const FILE_SIZE = 1024 * 1024 * 10; // 10MB
//     const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];

//     const validateSchema = Yup.object().shape({
//         name: Yup.string().required("Required username"),
//         email: Yup.string().email("Invalid email address"),
//         password: Yup.string().min(4, "Must be at least 4 characters long"),
//         confirmPassword: Yup.string().oneOf([Yup.ref("password"), null], "Passwords must match").required("Required"),
//         file: Yup.mixed().test("fileSize", "File too large", (value) => {
//             console.log("value", value);
//             if(!value){
//                 return true
//             }
//             return value.size <= FILE_SIZE;
//         }).test("fileFormat", "Unsupported Format", (value) => {
//             if(!value){
//                 return true
//             }
//             return SUPPORTED_FORMATS.includes(value.type);
//         }).required("Required")
//     })
//     const uploadImage = async (values) => {
//         try {
//             const response = await axios.post(
//               `${BASE_URL}files/upload`,
//               values.file
//             );
//             console.log(response);
//             setIsLoading(false);
//             return response.data.location;
//           } catch (error) {
//             console.log(error.message);
//             alert(error.message)
//           }
//     }

//     const insertUser = async (data) => {
//         let {name, email, password, role, avatar} = data
//         let myHeaders = new Headers();
//         myHeaders.append("Content-Type", "application/json");
//         const userData = JSON.stringify({
//             name,
//             email,
//             password,
//             role,
//             avatar
//         })
    
//         let requestData = {
//             method: "POST",
//             headers: myHeaders,
//             body: userData,
//         }
//         const resp = await fetch(`${BASE_URL}users`, requestData)
//         return resp.json()
//     }
//     return(
//         <Formik
//             initialValues={{
//                 name: "",
//                 email: "",
//                 password: "",
//                 role: "customer",
//                 confirmPassword: "",
//                 file: null
//             }}
//             validationSchema={validateSchema}
//             onSubmit={async (values, {setSubmitting}) => {
//                 const formData = new FormData();
                
//                 formData.append("file", values.file);
//                 const avatar = await uploadImage({file: formData});
//                 console.log("avatar", avatar);
//                 console.log(values.file)
//                 values.avatar = avatar;

//                 setTimeout(() => {
//                     // alert(JSON.stringify(values, null, 2));
//                     insertUser(values)
//                     setSubmitting(false);
//                   }, 1000);
//             }}
//         >
//             {
//                 ({isSubmitting}) => (
//                     <section className="bg-gray-50 dark:bg-gray-900">
//                         <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                          
//                             <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
//                                 <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
//                                     <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
//                                         Create a user account
//                                     </h1>
//                                         <Form 
//                                             className="space-y-4 md:space-y-6"
//                                         >
//                                             <div>
//                                                 <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your fullname</label>
//                                                 <Field type="text" name="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="eg. Go Eunhyuk" />
//                                                 <ErrorMessage 
//                                                     name="name"
//                                                 >
//                                                     {msg => <div className="text-red-600">{msg}</div>}
//                                                 </ErrorMessage>
//                                             </div>
//                                             <div>
//                                                 <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
//                                                 <Field type="email" name="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="eg. ehyuck@gmail.com" required="" />
//                                                 <ErrorMessage 
//                                                     name="email"
//                                                 >
//                                                     {msg => <div className="text-red-600">{msg}</div>}
//                                                 </ErrorMessage>

//                                             </div>
//                                             <div>
//                                                 <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
//                                                 <Field type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
//                                                 <ErrorMessage 
//                                                     name="password"
//                                                 >
//                                                     {msg => <div className="text-red-600">{msg}</div>}
//                                                 </ErrorMessage>
//                                             </div>
//                                             <div>
//                                                 <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
//                                                 <Field type="confirmPassword" name="confirmPassword" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
//                                                 <ErrorMessage 
//                                                     name="confirmPassword"
//                                                 >
//                                                     {msg => <div className="text-red-600">{msg}</div>}
//                                                 </ErrorMessage>
//                                             </div>

//                                             <div className="flex items-center justify-center w-full">
//                                                 <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-25 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
//                                                     <div className="flex flex-col items-center justify-center pt-5 pb-6">
//                                                         <svg aria-hidden="true" className="w-7 h-7 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
//                                                         <p className="mb-2 text-sm text-gray-500 dark:text-gray-400" class="font-semibold">Click to upload</p>
//                                                         <p className="text-xs text-gray-500 dark:text-gray-400">(SVG, PNG, JPG or GIF only )</p>
//                                                     </div>
//                                                     <Field 
//                                                         id="dropzone-file" 
//                                                         name="file" 
//                                                         type="file" 
//                                                         className="hidden"
//                                                         component={DropFileZone}
//                                                     />
                                                    
//                                                 </label>
                                                
//                                             </div> 
//                                             <ErrorMessage 
//                                                 name="file"
//                                             >
//                                                 {msg => <div className="text-red-600">{msg}</div>}
//                                             </ErrorMessage>
                                            
//                                             <button 
//                                                 disabled={isSubmitting}
//                                                 type="submit" class="text-white w-full bg-[#2557D6] hover:bg-[#2557D6]/90 focus:ring-4 focus:ring-[#2557D6]/50 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#2557D6]/50 mr-2 mb-2">
//                                                 Create user 
//                                             </button>
                                            
//                                         </Form>
//                                 </div>
//                             </div>
//                         </div>
//                     </section>
//                 )
//             }
//         </Formik>
//     )
// }

// function DropFileZone({field, form}){
//     const [previewImage, setPreviewImage] = useState(null);
//     const handleChange = (event) => {
//         const file = event.currentTarget.files[0];
//         form.setFieldValue(field.name, file);
//         setPreviewImage(URL.createObjectURL(file));
//     }
//     return(
//         <> 
//             <input
//                 id="dropzone-file" 
//                 type="file"
//                 name="file"
//                 onChange={handleChange}
//                 className="hidden"
//             />
//             {previewImage && (
//                 <img 
//                     src={previewImage} 
//                     alt="preview" 
//                     // className="mt-2 h-20 w-full" 
//                     />
//             )}
//         </>
//     )
// }


// // practical
// // * all pages need metadata
// // 1/ : HomePage
// // NavBar
// // a. fetching 20 products (image, title, price)
// // b. fetching all categories(image, name)
// // c. fetching 8 users (image, name)
// // Footer
// // 2. : DetailPage
// // a. product  by ID (generateMetadata)
// // 3. : Insert Product(title,price,description,categoryID, images:[])
// // 4. : Deploy - on versel to test SEO score0


// // 'use client'

// // import Link from 'next/link';
// // import React from 'react';
// // import { Formik, Form, Field, ErrorMessage } from 'formik';
// // import * as Yup from 'yup';

// // export default function Users(){
// //     //insert user
// //     const postUser = (user) => {
// //       fetch("https://api.escuelajs.co/api/v1/users/", {
// //         method: "POST",
// //         headers: {
// //           "Content-type": "application/json"
// //         },
// //         body: JSON.stringify(user),
// //       })
// //       .then(resp => resp.json())
// //       .then(resp => console.log(resp))
// //     }   
      

// //     //define validationSchema to define rule and error message
// //     const validationSchema = Yup.object({
// //         name: Yup.string().required("username cannot be blank"),
// //         email: Yup.string().email("email is invalid"),
// //         password: Yup.string().min(4,"cannot less than 4").required(),
// //         avatar: Yup.string().required(),
// //         role: Yup.string().required(),
// //     })

// //     return(
// //         <>
     
// //         <Formik
// //       initialValues={{
// //         name: "",
// //         email: "",
// //         password: "",
// //         avatar: "",
// //         role:"",
// //       }}
// //       validationSchema={validationSchema}

// //       onSubmit={(values, { setSubmitting , resetForm}) => {
// //           setTimeout(() => {
// //           alert(JSON.stringify(values, null, 2));
// //           setSubmitting(false);
// //           resetForm();
// //           postUser(values);
// //         }, 400);

// //       }}>
// //       {
// //         ({ isSubmitting }) => (
            
// // <Form method="POST">
// //   <div class="mb-6">
// //     <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
// //     <Field type="name" name="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  />
// //     <ErrorMessage name="name"/>
// //   </div>
// //   <div class="mb-6">
// //     <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
// //     <Field type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" />
// //     <ErrorMessage name="email"/>
// //   </div>
// //   <div class="mb-6">
// //     <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
// //     <Field type="password" name="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
// //     <ErrorMessage name="password" />
// //   </div>
  
// // <label for="avatar" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Avatar</label>
// // <Field type="avatar" name="avatar" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
// // <ErrorMessage name="avatar"/>



// // <label for="role" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Role</label>
// // <Field type="role" name="role" class="mb-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
// // <ErrorMessage name="role"/>

// //   <button type="submit" disabled={isSubmitting} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Post</button>
// //   <Link type="button" href="/form"  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Back</Link>

// // </Form>
// //         )
// //       }
       
// //     </Formik>
// //         </>
// //     )
// // }
