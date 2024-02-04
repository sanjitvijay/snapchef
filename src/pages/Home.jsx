import { useState } from "react"
import { CiTrash } from "react-icons/ci";
import { useEffect } from "react"
import {v4 as uuidv4} from 'uuid'
import {toast} from 'react-toastify'
import { createClient } from "@supabase/supabase-js";
import OpenAI from 'openai';
 
function Home() {  
    const [inputIngredients, setInputIngredients] = useState(["","","",""])
    const [image, setImage] = useState(null)
    const [imageURL, setImageURL] = useState("")
    const [imageLoading, setImageLoading] = useState(false)
    const [responseLoading, setResponseLoading] = useState(false)

    const supabaseUrl = 'https://iypnuqzdeqeenutmzenq.supabase.co'
    const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml5cG51cXpkZXFlZW51dG16ZW5xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY0MjM5MDgsImV4cCI6MjAyMTk5OTkwOH0.hJp0l9-AsfBKrrwbW1_5onaQ63pXMK68awewEbdgm4g"
    const supabase = createClient(supabaseUrl, supabaseKey)

    const API_KEY = "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";
    const openai = new OpenAI({
        apiKey: API_KEY, dangerouslyAllowBrowser: true
    });

    const [ingredients, setIngredients] = useState("")

    const handleAdd = () => {
        const updated = [...inputIngredients,""]
        setInputIngredients(updated)
    }

    const handleChange = (onChangeValue, i)=> {
        const inputData=[...inputIngredients]
        inputData[i]=onChangeValue.target.value
        setInputIngredients(inputData)
    }

    const handleDelete = (i) => {
        const deleteInput = [...inputIngredients]
        deleteInput.splice(i,1)
        setInputIngredients(deleteInput)
    }

    const onImageChange = (e) => {
        setImage(e.target.files[0])
    }

    const getImageURL = async() => {
        const fileName = `public/${image.name}-${uuidv4()}`
        if(image){
            setImageLoading(true);
            const {data, error} = await supabase.storage
            .from('images')
            .upload(fileName, image)
            setImageLoading(false);
        }

        const { data } = supabase
        .storage
        .from('images')
        .getPublicUrl(`public/${fileName}`)
        console.log(data)
        setImageURL(data)
    }

    const fetchIngredients = async() => {
        setResponseLoading(true)
        getImageURL()
        const response = await openai.chat.completions.create({
            model: "gpt-4-vision-preview",
            max_tokens: 1000,
            messages: [
                {
                    role: "user",
                    content: [
                        { type: "text", text: "Identify the edible ingredients in the photo in a list separated by comma" },
                        {
                            type: "image_url",
                            image_url: {
                                "url": imageURL,
                            },
                        },
                    ],
                },
            ],
        });
        
        const ingredientList = response.choices[0].message.content
        const ingredientsArray = ingredientList.split(',').map(ingredient => ingredient.trim());
        setIngredients(ingredientList)
        setInputIngredients([...ingredientsArray])

        const completion = await openai.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: "You are a helpful assistant designed to output JSON.",
                },
                { role: "user", content: "Tell detailed recipes with steps I can make using the following ingredients: " + ingredientList },
            ],
            model: "gpt-3.5-turbo-1106",
            response_format: { type: "json_object" },
        });

        setResponseLoading(false)
        console.log(completion.choices[0]);
    }
    

    return (
    <div>
        <div className="w-full max-w-md mx-auto">
            <h1 className="text-2xl font-bold text-center mb-4">Upload an image of your ingredients:</h1>
                <div className="grid w-full items-center gap-4">
                    <input 
                        type="file" 
                        className="file-input file-input-bordered file-input-primary w-full" 
                        id='image'
                        onChange={onImageChange}
                        accept='.jpg,.png,.jpeg,.heic'
                    />
                    {imageLoading && <p>Loading...</p>}
                    <button 
                        className="btn btn-secondary mx-20"
                        onClick={fetchIngredients}
                    >Identify Ingredients </button>
                </div>
        </div>

        <div className="divider mx-5">
            <span className="text-2xl"> OR </span>    
        </div>

        <div>
            <h1 className="text-2xl font-bold text-center mb-4">Type in ingredients manually:</h1>
            <div className="grid w-full items-center gap-4 justify-center">
                {inputIngredients.map((data, i) => {
                    return(
                        <div className="flex">
                            <input 
                                value = {data}
                                type="text" 
                                placeholder="Type here" 
                                className="input input-bordered input-secondary w-full max-w-xs" 
                                onChange={(e)=>handleChange(e,i)}
                            />
                            <button className="btn btn-ghost rounded-full ml-2" onClick={(i)=>handleDelete(i)}>
                                <CiTrash size={25} fill="red"/>
                            </button>
                        </div>  
                    )
                })}
            </div>

            <div className="flex justify-center mt-4">
                <button className="btn btn-primary rounded-full" onClick={()=>handleAdd()}>Add</button> 
            </div>

            {responseLoading && 
                <div className="flex justify-center mt-4">
                    <p>Loading...</p>
                </div>
            }

            <div className="flex justify-center mt-4">
                <button className="btn btn-secondary w-80" onClick={()=>fetchIngredients()}>Generate Recipes</button> 
            </div>
        </div>
    </div>

    )
}

export default Home