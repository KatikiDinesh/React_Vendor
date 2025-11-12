import React,{useState,useEffect} from 'react';
import { API_URL } from '../helpers/ApiPath';

const AllProducts = () => {

    const [products,setProducts]=useState([]);

    const productHandler = async () => {
        let firmId = localStorage.getItem('firmId');

        // ✅ If firmId missing → stop
        if (!firmId) {
            alert("Firm not found — please select firm again.");
            return;
        }

        try {
            const response = await fetch(`${API_URL}/product/${firmId}/products`);
            const newProductsData = await response.json();
            
            setProducts(newProductsData.products);

            // ✅ Store firmId if page loads correctly
            localStorage.setItem("firmId", firmId);

            console.log(newProductsData);
        } catch (error) {
            console.error("failed to fetch products", error);
            alert('failed to fetch products')
        }
    }

    useEffect(() => {
        productHandler();
        console.log('useEffect triggered');
    }, []);

    const deleteProductById = async (productId) => {
        try {
            const response = await fetch(`${API_URL}/product/${productId}`, {
                method:'DELETE'
            });

            if (response.ok) {
                setProducts(products.filter(product => product._id !== productId));
                confirm("Are you sure before delete?");
                alert("Product deleted successfully");
            }
        } catch (error) {
            console.error('failed to delete the product');
            alert('failed to delete');
        }
    }

  return (
    <div>
        {products.length === 0 ? (
            <p>NO PRODUCTS ADDED IN THIS FIRM</p>
        ) : (
            <table className="producttable">
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Image</th>
                        <th>Delete</th>  
                    </tr>
                </thead>
                <tbody>
                    {products.map((item) => (
                        <tr key={item._id}> 
                            <td>{item.productName}</td>
                            <td>{item.price}</td>
                            <td>
                                {item.image && (
                                    <img 
                                        src={`${API_URL}/uploads/${item.image}`}
                                        alt={item.productName}
                                        style={{width:'50px',height:'50px'}}
                                    />
                                )}
                            </td>
                            <td>
                                <button onClick={() => deleteProductById(item._id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )}
    </div>
  )
}

export default AllProducts;
