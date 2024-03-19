import { useState, useEffect } from 'react';
import axios from 'axios';

import { getProducts } from "@api";
import DataTable from '@components/DataTable';
import logosrc from '@assets/logo_bcw.png';
import ComboBox from '@components/Combobox';

import '@styles/App.scss';

function Home() {
    const [isLoading,setLoading] = useState(false);
    const [selectedOption, setSelectedOption] = useState('USD');
    const [isData,setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [isVisible,setIsVisible] = useState(false);
    const [username, setUsername] = useState('');
    const options = ['USD', 'HKD', 'KRW', 'SGB', 'GBP'];
   
    useEffect(() => {
        setLoading(true);
        getProducts()
            .then(response => {
                setData(response.data);
                setFilteredData(response.data.filter(
                    item => item.currency === selectedOption
                ));
            })
            .finally(() => setLoading(false));
    }, [selectedOption]);

    useEffect(() => {
        axios.post("http://192.168.80.12:5000/username/", {  }).then((res) => {
        setUsername(res.data.name);
      })
    })

    const handleclickok = () => {

    }

    const handleSelect = (option) => {
        setSelectedOption(option);
        setFilteredData(isData.filter(item => item.currency === selectedOption));
    };

    const ondivclick = () => {
        if(isVisible === true)
        {
            setIsVisible(false);
        }
    }

    const nameClick = () => {
        setFilteredData(sortedData);
    }

    const rankClick= () => {
        setFilteredData(sortedData1);
    }

    const sortedData = [...filteredData].sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      });

    const sortedData1 = [...filteredData].sort((a, b) => {
        const idA = a.id;
        const idB = b.id;
        if (idA < idB) return -1;
        if (idA > idB) return 1;
        return 0;
    });
    
    return (
        <div onClick={ondivclick} style={{height:'100vh'}}>
            <header>
                <button
                className='rofile'
                onClick={() => setIsVisible(!isVisible)}
                >
                Profile
                </button>
                {isVisible && (
                    <div className='profile-box' onClick={handleclickok} >
                        <p>
                        <b>{username}</b>
                        </p>
                    </div>
                )}
            </header>

            <div className='header'>
                <img src={logosrc}></img>
            </div>

            <div className='content1'>
                <div className='minicontent'>
                    <ComboBox options={options} onSelect={handleSelect} />
                    <button onClick={nameClick}>Sort by name</button>
                    <button onClick={rankClick}>Sort by rank</button>
                </div>

                {
                    isLoading ? (
                        <p>Loading....</p>
                    ) : (
                        <DataTable data={filteredData} />
                    )
                }
                
            </div>
        </div>
    );
}
export default Home;