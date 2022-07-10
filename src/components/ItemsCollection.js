import React, {useState,useEffect} from 'react';
import Item from './Item';
import axios from "axios";

const Items = () => {
    const [items, setItems] = useState([]);

    const url = "https://rearmedtierlist-node-backend.azurewebsites.net/getAllItems";

    const getItems = () => {
        axios.get(url)
        .then(res => {
            const items = res.data;
            setItems(items);
        });
    }

    useEffect(()=> {
        getItems();
    },[]);

    return (
        <>
            {
                items.map((item, index) => {
                    return (
                        <Item key={index} 
                        itemName={item.item_name} 
                        itemImageUrl={item.item_image} 
                        itemCategory={item.item_category}
                        sellPrice={item.sell_price}
                        buyPrice={item.buy_price}
                        slotSize={item.slot_size}
                        />
                    );
                })  
            }
        </>
    );
}

export default Items;