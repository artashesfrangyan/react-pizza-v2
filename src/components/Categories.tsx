import React from 'react';

type CategoriesProps = {
  value: number;
  handleCategory: any;
};

const Categories: React.FC<CategoriesProps> = ({ value, handleCategory }) => {
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Микс'];

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
};

export default Categories;
