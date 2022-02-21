// import React from "react";

function App() {
  const [allProducts, setAllProducts] = React.useState([]);
  const [products, setProduct] = React.useState([]);
  const [categories, setCategories] = React.useState([]);
  const [color, setColor] = React.useState("");
  const [size, setSize] = React.useState("");
  const [shape, setShape] = React.useState("");
  const [filteredProd, setFilteredProd] = React.useState([]);
  React.useEffect(() => {
    loadProducts();
    test();
    console.log("first");

    setCategories([
      {
        id: 1,
        catName: "Color",
        catValue: ["Red", "Blue", "White", "Pink"],
      },
      {
        id: 2,
        catName: "rating",
        catValue: [3.9, 4.7, 4.8, 2.9],
      },
      {
        id: 3,
        catName: "Shape",
        catValue: ["Round", "square", "oval", "triangle"],
      },
      {
        id: 4,
        catName: "category",
        catValue: [
          "electronics",
          "jewelery",
          "men's clothing",
          "women's clothing",
        ],
      },
    ]);
  }, []);

  const test = async () => {
    const resp = await fetch("https://fierce-island-28572.herokuapp.com/api/pipe/pipe_70x82s");

    console.log(resp.json());
  };

  const loadProducts = async () => {
    const resp = await fetch("https://fakestoreapi.com/products");
    const data = await resp.json();
    setAllProducts(data);
    setProduct(data);
  };

  function changeHandler(e, catName) {
    // setProduct([...allProducts]);
    console.log(catName);
    console.log(e.target.value);

    if (catName == "rating") {
      const newData = allProducts.filter(
        (product) => eval(`product.${catName}.rate`) == e.target.value
      );
      setProduct([...newData]);
    } else {
      const newData = allProducts.filter(
        (product) => eval(`product.${catName}`) == e.target.value
      );

      setProduct([...newData]);
    }
  }
  let prod = products;

  filteredProd.length > 0 ? (prod = filteredProd) : (prod = products);

  return (
    <div>
      <div>
        {categories.map((cat) => {
          return (
            <select
              key={cat.id}
              className="custom-select"
              id={`inputGroupSelect${cat.id}`}
              onChange={(e) => changeHandler(e, cat.catName)}
            >
              <option selected> Select One </option>
              {cat.catValue.map((data, ind) => {
                return (
                  <option key={ind} value={data}>
                    {data}
                  </option>
                );
              })}
            </select>
          );
        })}
      </div>
      <div className="d-flex flex-row flex-wrap align-items-between">
        {prod.map((product) => {
          return (
            <div
              key={product.id}
              className="card m-2"
              style={{ width: "200px", height: "400px", overflow: "hidden" }}
            >
              <img
                className="card-img-top"
                src={product.image}
                alt="Card image"
                style={{ width: "100%", height: "200px" }}
              />
              <div
                style={{ overflow: "hidden" }}
                className="card-body d-flex justify-content-between flex-column"
              >
                <h6 className="card-title">{product.title.slice(0, 30)}</h6>
                <p>{product.category}</p>
                <h5 className="card-text">
                  Rs. {product.price}/- <span> *{product.rating.rate}</span>{" "}
                </h5>
                <a href="#" className="btn btn-primary">
                  Enquire Now
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// export default App;
