import React from 'react';
import '@styles/App.scss';

const DataTable = ({ data }) => {
  // Function to render table rows
  
    const renderRows = () => {
        return data.map((item, index) => (
            <tr key={index}>
                <td>{item.id}</td>
                <td>
                <div>
                    <img src={item.images[0]} alt ="" style={{width:'50px',height:'50px'}}></img>
                    {item.name}
                </div>
                </td>
                <td className='price'>{item.price}</td>
                <td className='productkey'>{item.productKey}</td>
                <td className='madeat'>{item.madeAt}</td>
                <td>{item.productUrl}</td>
            </tr>
        ));
    };

    return (
        <table>
            <thead>
                <tr>
                <th>ID</th>
                <th>Name</th>
                <th className='price'>Price</th>
                <th className='productkey'>ProductKey</th>
                <th className='madeat'>madeAt</th>
                <th>ProductUrl</th>
                </tr>
            </thead>
            <tbody>
                {data.length === 0?<p>No Items</p>
                :renderRows()}
            </tbody>
        </table>
    );
};

export default DataTable;