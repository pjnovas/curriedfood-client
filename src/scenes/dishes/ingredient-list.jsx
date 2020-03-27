import React, { useState, useEffect } from 'react';
import { List, StyleService, Layout } from '@ui-kitten/components';
import IngredientListItem from './ingredient-list-item';
import NumericSelector from '../../components/numeric-selector';

const servQuantity = (initServ, currServ) => (quantity) =>
  (quantity / initServ) * currServ;

const calcDiv = (calcQty, divisible) => (quantity) =>
  divisible ? calcQty(quantity) : Math.round(calcQty(quantity));

const IngredientList = ({ dish, ...props }) => {
  const [selectedServings, setSelectedServings] = useState(dish.servings || 1);
  const [ingredients, setIngredients] = useState(dish.ingredients || []);

  useEffect(() => {
    const calcQty = servQuantity(dish.servings, selectedServings);
    const divideQuantities = ({ quantity, alt_quantity, ...ingredient }) => {
      const calc = calcDiv(calcQty, ingredient.product.divisible);
      return {
        ...ingredient,
        quantity: calc(quantity),
        alt_quantity: calc(alt_quantity)
      };
    };

    setIngredients(dish.ingredients.map(divideQuantities));
  }, [dish.ingredients, dish.servings, selectedServings]);

  return (
    <Layout style={{ flex: 1 }}>
      <NumericSelector
        label="PORCIONES"
        selected={selectedServings}
        onChange={setSelectedServings}
        visibleItems={6}
        min={1}
      />
      <List
        style={styles.list}
        data={ingredients}
        renderItem={({ item }) => (
          <IngredientListItem style={styles.item} {...item} />
        )}
        {...props}
      />
    </Layout>
  );
};

const styles = StyleService.create({
  list: {
    flex: 1,
    backgroundColor: 'background-basic-color-1'
  },
  item: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingHorizontal: 12
  }
});

export default IngredientList;
