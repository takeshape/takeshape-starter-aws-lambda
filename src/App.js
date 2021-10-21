import { useState, useEffect } from 'react';

function App() {

  const [productList, setProductList] = useState(null);

  useEffect(() => {
    (async ()=>{
      try {
        const result = await fetch(process.env.REACT_APP_AWS_ENDPOINT);
        const resultJSON = await result.json();
        setProductList(resultJSON.products);
        console.log(resultJSON);
      } catch (err){
        console.log('Failed to get data from AWS lambda function', err);
      }
    })();
  }, [])

  return (
    <main style={{width:'50%',margin:'auto', display:'flex', flexDirection:'column'}}>
      {productList && productList.map(product=>(
        <div key={product._id} style={{display:'flex', flexDirection:'column'}}>
          <img alt={product.name} style={{maxWidth:'800px'}} src={product.image.sourceUrl}></img>
          <h2>{product.name}</h2>
          <b>{product.price}</b>
        </div>
      ))}
    </main>
  );
}

export default App;