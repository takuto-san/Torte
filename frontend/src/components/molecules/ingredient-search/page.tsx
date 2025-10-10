import { useState, useEffect } from 'react';
import { Food } from '@/types/foodTypes';
import styles from './IngredientSearch.module.scss';

interface IngredientSearchProps {
  onSelect: (food: Food) => void;
}

export const IngredientSearch = ({ onSelect }: IngredientSearchProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [foods, setFoods] = useState<Food[]>([]);
  const [filteredFoods, setFilteredFoods] = useState<Food[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // 食品データの読み込み
  useEffect(() => {
    const loadFoods = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/data.json');
        const data = await response.json();
        setFoods(data);
      } catch (error) {
        console.error('食品データの読み込みに失敗しました:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadFoods();
  }, []);

  // 検索処理
  useEffect(() => {
    if (!searchTerm) {
      setFilteredFoods([]);
      return;
    }

    const filtered = foods.filter(food => 
      food.name.includes(searchTerm) || 
      food.category.includes(searchTerm)
    );
    setFilteredFoods(filtered.slice(0, 10)); // 最大10件まで表示
  }, [searchTerm, foods]);

  return (
    <div className={styles.container}>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="具材を検索..."
        className={styles.searchInput}
      />
      
      {isLoading && <div className={styles.loading}>読み込み中...</div>}
      
      {filteredFoods.length > 0 && (
        <ul className={styles.results}>
          {filteredFoods.map((food) => (
            <li
              key={food.id}
              onClick={() => {
                onSelect(food);
                setSearchTerm('');
                setFilteredFoods([]);
              }}
              className={styles.resultItem}
            >
              <span className={styles.name}>{food.name}</span>
              <span className={styles.category}>{food.category}</span>
              <div className={styles.nutrition}>
                <span>カロリー: {food.nutrition.calories}kcal</span>
                <span>タンパク質: {food.nutrition.protein}g</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
