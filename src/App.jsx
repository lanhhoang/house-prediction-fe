import React, { useState } from "react";
import {
  Button,
  ButtonGroup,
  Card,
  Col,
  Container,
  Form,
  Navbar,
  Row,
} from "react-bootstrap";
import axios from "axios";

const baseUrl = import.meta.env.VITE_API_URL;

function App() {
  const [data, setData] = useState({
    aveRooms: "",
    aveBedrms: "",
  });
  const [result, setResult] = useState({
    rSquare: null,
    predicted: null,
  });
  const [isLoading, setLoading] = useState(false);

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const { aveRooms, aveBedrms } = data;
    const response = await axios.post(`${baseUrl}/predict`, {
      aveRooms,
      aveBedrms,
    });
    setResult({
      ...result,
      rSquare: response.data.r_square,
      predicted: response.data.y_pred,
    });
    setLoading(false);
  };

  return (
    <Container>
      <Navbar bg="light" variant="light" expand="lg">
        <Container>
          <Navbar.Brand>Group 4: Housing Price Prediction</Navbar.Brand>
        </Container>
      </Navbar>
      <Row>
        <Col xs={3}></Col>
        <Col xs={6}>
          <Card border="primary" className="mt-3">
            <Card.Header>
              <strong>Description</strong>
            </Card.Header>
            <Card.Body>
              <Card.Text>
                The full-stack AI application is built by using Python, Flask,
                Scikit-learn, Pandas, NumPy, and React. The project uses Linear
                Regression and Polynomial Regression to preprocesss, train and
                test the real estate data. The dataset is from California
                housing data. The application uses only the two features
                AveRooms and AveBedrms out of the eight features.
              </Card.Text>
              <Card.Text>
                Enter values in the two below inputs and click the Predict
                button to receive the predicted response.
              </Card.Text>
            </Card.Body>
          </Card>

          <Form onSubmit={handleSubmit} className="mt-3">
            <Form.Group className="mb-3" controlId="formAveRooms">
              <Form.Label>Average Rooms:</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter number of average rooms, e.g. 5.0 "
                name="aveRooms"
                value={data.aveRooms}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formAveBedrms">
              <Form.Label>Average Bedrooms:</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter number of average bedrooms, e.g. 2.0"
                name="aveBedrms"
                value={data.aveBedrms}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <ButtonGroup className="d-flex justify-content-end">
              <Button variant="primary" disabled={isLoading} type="submit">
                {isLoading ? "Loading..." : "Predict"}
              </Button>
            </ButtonGroup>
          </Form>

          <Card border="success" className="mt-3">
            <Card.Header>
              <strong>Result</strong>
            </Card.Header>
            <Card.Body>
              {result.rSquare && (
                <Card.Text>
                  R-Square (Coefficient of determination): {result.rSquare}
                </Card.Text>
              )}
              {result.predicted && (
                <Card.Text>Predicted Result: {result.predicted}</Card.Text>
              )}
            </Card.Body>
          </Card>
        </Col>
        <Col xs={3}></Col>
      </Row>
    </Container>
  );
}

export default App;
