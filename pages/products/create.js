import { useState } from 'react';
const initialState={name:'',price:0}

function Create(){

    const [isLoading,setIsLoading]=useState(false)    
    const [product,setproduct]=useState(initialState)

    const handleChange=(e)=>{
        const fieldValue=e.target.value
        const fieldName=e.target.name
        setproduct({...product,[fieldName]:[fieldValue]})
    }

    const handleSubmit=(e)=>{
    e.preventDefault()    
    if(!product.name){
        console.log('Tienes que llenar el campo Nombre')
        return
    }
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products`,{
        method:"POST",
        headers:{
        "Content-Type":"application/json"
        },
        body: JSON.stringify(product),
    })
    .then((res)=>res.json())
    .then((data)=>{
        if(data.ok){
            setproduct(initialState)
            console.log("producto creado exitosamente!")     
        
        } else{
            console.log(data.message)
        }
        setIsLoading(false)
    })
    .catch((err)=>{
        console.log(err)
        setIsLoading(false)
    })
    } 

    return (
    <>
        <div>
            <h1>Crear nuevo producto</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    onChange={handleChange}
                    value={product.name}
                    type='text' 
                    name='name' 
                    placeholder='Nombre del producto...'/>
                <input
                    onChange={handleChange}
                    value={product.price}
                    type='number' 
                    name='price'
                    placeholder='Precio del producto '/>
                <button>{isLoading?'Creando producto...':'Crear producto'}</button>
            </form>
        </div>  
        <style jsx>
        {`
          form {
            display: flex;
            flex-direction: column;
            width: 20rem;
            margin: 0 auto;
          }

          input {
            margin-bottom: 0.5rem;
          }

          h1 {
            text-align: center;
          }
        `}
      </style>     
    </>
    );
};

export default Create;