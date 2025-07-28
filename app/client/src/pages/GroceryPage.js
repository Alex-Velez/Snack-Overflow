import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Page from '../components/Page/Page';
import './GroceryPage.css';

const CATEGORY_LABELS = {
  'Vegetables': 'vegetable',
  'Snacks': 'snack',
  'Breads': 'bread',
  'Fruits': 'fruit',
  'Meats': 'meat',
  'Dairy': 'dairy'
};

export default function GroceryPage({ activeUser }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const search = searchParams.get('search')?.toLowerCase() || '';
  const categories = searchParams.get('categories')?.split(',') || [];

  async function updateCart(sku){
    if(!activeUser){
      navigate('/login');
    }
    else{
      let body = {
        "userId": activeUser,
        "sku": sku,
        "count": 1
      }
      
      await fetch("/api/cart/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      })
    }
  }

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const search = searchParams.get('search')?.toLowerCase() || '';
        const categories = searchParams.get('categories')?.split(',') || [];
        var data;
        if(search){
          let res = await fetch(`/api/items/search/${search}`);
          data = await res.json()
        }
        else if(categories.length > 0 && categories[0] !== ''){
          data = []
          for(const cat of categories){
            let thisQuery = await fetch(`/api/items/category/${cat}`);
            data = data.concat(await thisQuery.json())
          }
        }
        else{
          let res = await fetch('/api/items/');
          data = await res.json();
        }
        
        if (categories.length > 0 && categories[0] !== '') {
          data = data.filter(item =>
            categories.includes(item.category.toLowerCase())
          );
        }

        console.log(data)
        
        setItems(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Error fetching items:', err);
        setItems([]);
      }
      setLoading(false);
    }

    load();
  }, [searchParams]);


  const handleCategoryChange = (catLabel) => {
    let updatedCategories = [...categories];
    const categoryKey = catLabel.toLowerCase();

    if (updatedCategories.includes(categoryKey)) {
      updatedCategories = updatedCategories.filter(c => c !== categoryKey);
    } else {
      updatedCategories.push(categoryKey);
    }

    const newParams = {};
    if (search) newParams.search = search;
    if (updatedCategories.length) newParams.categories = updatedCategories.join(',');

    setSearchParams(newParams);
  };

  return (
    <Page activeUser={activeUser}>
      <div className="gp-container">
        <aside className="gp-sidebar">
          <h3 className="gp-filters-title">Filters</h3>
          {Object.entries(CATEGORY_LABELS).map(([key, value]) => {
            return (
              <label key={key} className="gp-checkbox-label">
                <input
                  type="checkbox"
                  checked={categories.includes(value)}
                  onChange={() => handleCategoryChange(value)}
                />
                {key}
              </label>
              
            );
          })}
        </aside>
        <main className="gp-main">
          {loading && <p>Loading...</p>}
          {!loading && items.length === 0 && <p>No items found.</p>}
          <div className="gp-grid">
            {items.map(item => (
              <GroceryCard key={item.sku} item={item} handleUpdate={updateCart}/>
            ))}
          </div>
        </main>
      </div>
    </Page>
  );
}

function GroceryCard({ item, handleUpdate }) {
  return (
    <div className="gp-card">
      {item.img_path && (
        <img src={item.img_path} alt={item.item_name} className="gp-img" />
      )}
      <h3 className="gp-name">{item.item_name}</h3>
      <p className="gp-price">${Number(item.price).toFixed(2)}</p>
      <button className="gp-btn" onClick={() => handleUpdate(item.sku)}>Add to Cart</button>
    </div>
  );

}