import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";

const DUMMY_MEALS = [
  {
    id: "m1",
    name: "Biryani",
    description: "Delicious Hyderabadi biryani!",
    price: 220,
  },
  {
    id: "m2",
    name: "Kadhai Paneer",
    description: "Chef's pecialty!",
    price: 150,
  },
  {
    id: "m3",
    name: "Chicken Burger",
    description: "Delicious, raw, meaty",
    price: 130,
  },
  {
    id: "m4",
    name: "Salad",
    description: "Healthy...and green...",
    price: 60,
  },
];

const AvailableMeals = () => {
  const mealsList = DUMMY_MEALS.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));
  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
