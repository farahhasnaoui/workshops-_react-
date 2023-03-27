import { useState } from "react";
import { Alert, Button, Container, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addProductReducer, setErrors } from "../redux/slices/productsSlice";
import { addProduct } from "../service/api";

export default function AddProduct() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const errors = useSelector(state=>state.products.errors);

  const [product, setProduct] = useState({
    name: "",
    price: 0,
    img: "",
    like: 0,
    quantity: 0,
    description: "",
  });
  const { name, price, img, like, quantity, description } = product;
  const onValueChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };
  const onFileHandle = (e) => {
    console.log(e.target.files);
    setProduct({ ...product, [e.target.name]: e.target.files[0].name });
  };
  const addNewP = async () => {
    addProduct(product)
    .then((response)=>{
      dispatch(setErrors(null))
      dispatch(addProductReducer(response.data));
      navigate("/products/list");
    }).catch((error)=>{
      dispatch(setErrors(error))
    })
    
  };
  return (
    <Container style={{ marginTop: "30px" }}>
      <h2>Add a new Product to your store</h2>
     {errors !== null && <Alert key="danger" variant="danger">
          {errors.message}
      </Alert>} 
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            onChange={(e) => onValueChange(e)}
            name="name"
            value={name}
            type="text"
            placeholder="Enter a Name"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>

          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter description "
            onChange={(e) => onValueChange(e)}
            name="description"
            value={description}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            onChange={(e) => onValueChange(e)}
            name="price"
            value={price}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Quantity</Form.Label>
          <Form.Control
            type="number"
            onChange={(e) => onValueChange(e)}
            name="quantity"
            value={quantity}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Image</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => onFileHandle(e)}
            name="img"
          />
        </Form.Group>
        <Button variant="primary" onClick={() => addNewP()}>
          Add Product
        </Button>
        <Button onClick={() => navigate("/products")} variant="secondary">
          Cancel
        </Button>
      </Form>
    </Container>
  );
}
