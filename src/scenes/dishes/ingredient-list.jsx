import React, { useState, useEffect } from 'react';
import { List, StyleService, Layout, Button } from '@ui-kitten/components';
import IngredientListItem from './ingredient-list-item';
import { ShoppingCartAddIcon } from '../../assets/icons';
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
    <Layout style={styles.layout}>
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
      <Button
        style={styles.shopButton}
        status="primary"
        size="large"
        icon={ShoppingCartAddIcon}
      />
    </Layout>
  );
};

const styles = StyleService.create({
  layout: {
    flex: 1,
    height: 600,
    position: 'relative'
  },
  list: {
    flex: 1,
    backgroundColor: 'background-basic-color-1',
    marginBottom: 45
  },
  item: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingHorizontal: 12
  },
  shopButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    height: 60,
    width: 60,
    borderRadius: 50
  }
});

export default IngredientList;
