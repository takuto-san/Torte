import { useState } from 'react';
import { IngredientSearch } from '@/components/molecules/ingredient-search/page';
import { Food } from '@/types/foodTypes';
import styles from './page.module.css';

export const RecipeForm = () => {
  const [ingredients, setIngredients] = useState<Food[]>([]);

  const handleIngredientSelect = (food: Food) => {
    setIngredients(prev => [...prev, food]);
  };

  return (
    <div>
      <h2>具材の追加</h2>
      <IngredientSearch onSelect={handleIngredientSelect} />
      
      <div className={styles.ingredientsList}>
        {ingredients.map((ingredient, index) => (
          <div key={index} className={styles.ingredientItem}>
            <span>{ingredient.name}</span>
            <input
              type="number"
              min="0"
              step="0.1"
              placeholder="量"
            />
            <select>
              <option value="g">g</option>
              <option value="個">個</option>
              <option value="本">本</option>
              {/* 他の単位も追加 */}
            </select>
            <button onClick={() => {
              setIngredients(prev => prev.filter((_, i) => i !== index));
            }}>
              削除
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
