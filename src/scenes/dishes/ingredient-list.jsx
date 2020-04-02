import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { List /*, Checkbox*/ } from 'react-native-paper';
import NumericSelector from '../../components/numeric-selector';
import Layout from '../../components/layout';
import MarketFab from './market-fab.jsx';
import { getText } from '../../utils/grocery';

const toDec2 = (value) => (value > 0 ? value.toFixed(2) : value);

const servQuantity = (initServ, currServ) => (quantity) =>
  (quantity / initServ) * currServ;

const calcDiv = (calcQty, divisible) => (quantity) =>
  divisible ? toDec2(calcQty(quantity)) : Math.round(calcQty(quantity));

const IngredientList = ({ dish }) => {
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
    <Layout>
      <NumericSelector
        label="PORCIONES"
        selected={selectedServings}
        onChange={setSelectedServings}
        visibleItems={6}
        min={1}
      />
      <ScrollView contentContainerStyle={styles.list}>
        {ingredients.map((ingredient) => (
          <List.Item
            key={ingredient.id}
            title={getText(ingredient)}
            // right={() => <Checkbox />}
          />
        ))}
      </ScrollView>
      <MarketFab ingredients={dish.ingredients} servings={selectedServings} />
    </Layout>
  );
};

const styles = StyleSheet.create({
  list: {
    paddingBottom: 80
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0
  }
});

export default IngredientList;
