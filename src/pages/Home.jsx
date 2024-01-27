function Home() {    
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
        </div>
    </div>

    )
}

export default Home