import './App.css';
import Items from './components/ItemsCollection';
import Header from './components/Header';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';

function App() {
  return (
    <>
      <Header/>
      <Container fluid>
      <Row><Items/></Row>
      </Container>
    </>
  );
}

export default App;
