import React from 'react';

type CategoriesProps = {
  value: number;
  handleCategory: (i: number) => void;
};

const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Микс'];

const Categories: React.FC<CategoriesProps> = React.memo(({ value, handleCategory }) => {
  return (
    <div className="categories">
      <ul>
        {categories.map((category, i) => (
          <li key={i} onClick={() => handleCategory(i)} className={value == i ? 'active' : ''}>
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
});

export default Categories;
