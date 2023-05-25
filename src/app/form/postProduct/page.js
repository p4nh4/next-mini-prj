'use client'
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import * as Yup from 'yup'
import { BASE_URL } from "@/app/utils/constant";
import { images } from "../../../../next.config";
export default function Users(){

    const [isLoading, setIsLoading] = useState(true);
    const [imageURL, setImageURL] = useState("");
    const [category,setCategory]= useState()

    const FILE_SIZE = 1024 * 1024 * 10; // 10MB
    const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];

    const validateSchema = Yup.object().shape({
        title: Yup.string().required("Required username"),
        price: Yup.string().required("Please input price"),
        description: Yup.string().min(4, "Must be at least 4 characters long"),
        categoryId: Yup.number().positive().integer(),
        file: Yup.mixed().test("fileSize", "File too large", (value) => {
            console.log("value", value);
            if(!value){
                return true
            }
            return value.size <= FILE_SIZE;
        }).test("fileFormat", "Unsupported Format", (value) => {
            if(!value){
                return true
            }
            return SUPPORTED_FORMATS.includes(value.type);
        }).required("Required")
    })
    const uploadImage = async (values) => {
        try {
            const response = await axios.post(
              `${BASE_URL}files/upload`,
              values.file
            );
            console.log(response);
            setIsLoading(false);
            return response.data.location;
          } catch (error) {
            console.log(error.message);
            alert(error.message)
          }
    }

    const insertProduct = async (data) => {
        let {title,price,description,images} = data
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const userData = JSON.stringify({
            title,
            price,
            description,
            categoryId,
            images
        })
    
        let requestData = {
            method: "POST",
            headers: myHeaders,
            body: userData,
        }
        // useEffect(() => {
        //     fetch(`${BASE_URL}categories`)
        //     .then((resp)=> resp.json())
        //     .then((res)=> setCategory(res))
        // })
        const resp = await fetch(`${BASE_URL}products`, requestData)
        return resp.json()
        


        
    }
    return(
        <Formik
            initialValues={{
                title: "",
                price: "",
                description: "",
                categoryId: 0,
                file: null
            }}
            validationSchema={validateSchema}
            onSubmit={async (values, {setSubmitting}) => {
                const formData = new FormData();
                
                formData.append("file", values.file);
                const avatar = await uploadImage({file: formData});
                console.log("images", images);
                console.log(values.file)
                values.images = images;

                setTimeout(() => {
                    insertProduct(values)
                    setSubmitting(false);
                  }, 1000);
            }}
        >
            {
                ({isSubmitting}) => (
                    <section className="bg-gray-50 dark:bg-gray-900">
                         <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen sm:py-0">
                             <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                       <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
                                         Create a product
                                    </h1>
                                   
                                        <Form 
                                            className="space-y-4 md:space-y-6 mt-10"
                                        >
                                            <div>
                                                <label htmlFor="name" className="block mt-10 mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Name</label>
                                                <Field type="text" name="title" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="eg. WB Jacket" />
                                                <ErrorMessage 
                                                    name="title"
                                                >
                                                    {msg => <div className="text-red-600">{msg}</div>}
                                                </ErrorMessage>
                                            </div>
                                            <div className="grid grid-cols-2 md:grid-cols-2 gap-4">

                                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                                                <Field  name="price" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="eg. $30" required="" />
                                                <ErrorMessage 
                                                    name="price"
                                                >
                                                    {msg => <div className="text-red-600">{msg}</div>}
                                                </ErrorMessage>
                                                
                                                <Field as="select"  name="categoryId" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                               
                                                >
                                                   {/* {category.map((categories) => (
                      <option key={categories.id} value={categories.id}>
                        {categories.name}
                      </option>
                    ))} */}
                                                    </Field>                           
                                                {/* <ErrorMessage name="categoryId">
                                                    {msg => <div className="text-red-600">{msg}</div>}
                                                </ErrorMessage> */}

                                            </div>

                                            <div>
                                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Desc</label>
                                                <Field as="textarea" type="description" name="description" placeholder="eg. oversize jacket with monochrome color mostly seen in WB manhwa..." className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                                <ErrorMessage 
                                                    name="description"
                                                >
                                                    {msg => <div className="text-red-600">{msg}</div>}
                                                </ErrorMessage>
                                            </div>
                                           

                                            <div className="flex items-center justify-center w-full">
                                                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-25 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                        <svg aria-hidden="true" className="w-7 h-7 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400" class="font-semibold">Click to upload</p>
                                                        <p className="text-xs text-gray-500 dark:text-gray-400">(SVG, PNG, JPG or GIF ONLY)</p>
                                                    </div>
                                                    <Field 
                                                        id="dropzone-file" 
                                                        name="file" 
                                                        type="file" 
                                                        className="hidden"
                                                        component={DropFileZone}
                                                    />
                                                    
                                                </label>
                                                
                                            </div> 
                                            <ErrorMessage 
                                                name="file"
                                            >
                                                {msg => <div className="text-red-600">{msg}</div>}
                                            </ErrorMessage>
                                            
                                            <button 
                                                onClick={
                                                    alert.value


                                                }
                                                disabled={isSubmitting}
                                                type="submit" class="text-white w-full bg-[#2557D6] hover:bg-[#2557D6]/90 focus:ring-4 focus:ring-[#2557D6]/50 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#2557D6]/50 mr-2 mb-2">
                                                Create user 
                                            </button> 
                                        </Form>
                                 </div>
                             </div>
                         </div> 
                    </section>
                )
            }
        </Formik>
    )
}

function DropFileZone({field, form}){
    const [previewImage, setPreviewImage] = useState(null);
    const handleChange = (event) => {
        const file = event.currentTarget.files[0];
        form.setFieldValue(field.name, file);
        setPreviewImage(URL.createObjectURL(file));
    }
    return(
        <> 
            <input
                id="dropzone-file" 
                type="file"
                name="file"
                onChange={handleChange}
                className="hidden"
            />
            {previewImage && (
                <img 
                    src={previewImage} 
                    alt="preview" 
                    // className="mt-2 h-20 w-full" 
                    />
            )}
        </>
    )
}


// practical
// * all pages need metadata
// 1/ : HomePage
// NavBar
// a. fetching 20 products (image, title, price)
// b. fetching all categories(image, name)
// c. fetching 8 users (image, name)
// Footer
// 2. : DetailPage
// a. product  by ID (generateMetadata)
// 3. : Insert Product(title,price,description,categoryID, images:[])
// 4. : Deploy - on versel to test SEO score0
