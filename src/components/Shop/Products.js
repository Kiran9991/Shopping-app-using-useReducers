import ProductItem from './ProductItem';
import classes from './Products.module.css';

const Products = (props) => {
  const testItems = [
    { id: 1, title: 'Test 1', price: 6, description: 'This is a first product - amazing!'},
    { id: 2, title: 'Test 2', price: 8, description: 'This is a second product - not nice!'},
    { id: 3, title: 'Test 3', price: 10, description: 'This is a third product - but good!'}
  ]
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {testItems.map((item =>
          <ProductItem
          key={item.id}
          id={item.id}
          title={item.title}
          price={item.price}
          description={item.description}
        />))}
      </ul>
    </section>
  );
};

export default Products;
