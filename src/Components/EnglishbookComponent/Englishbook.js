import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Englishbook() {
  return (
    <Container>
      <Row>
        <Col sm={4}>sm=8</Col>
        <Col sm={8}>sm=4</Col>
      </Row>
      
    </Container>
  );
}

export default Englishbook;