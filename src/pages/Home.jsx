import { useState } from "react"
import { CiTrash } from "react-icons/ci";
import { useEffect } from "react"

function Home() {  
    const [inputIngredients, setInputIngredients] = useState(["","","",""])

    useEffect(()=>{
        console.log(inputIngredients)
    },[inputIngredients])
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

    return (
    <div>
        <div className="w-full max-w-md mx-auto">
            <h1 className="text-2xl font-bold text-center mb-4">Upload an image of your ingredients:</h1>
                <div className="grid w-full items-center gap-4">
                    <input type="file" className="file-input file-input-bordered file-input-primary w-full" />
                    <button className="btn btn-secondary mx-20">Identify Ingredients </button>
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
        </div>
    </div>

    )
}

export default Home