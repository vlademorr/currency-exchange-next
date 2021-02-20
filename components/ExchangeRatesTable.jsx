import React from 'react';
import { Container, Row, Col, Table } from 'react-bootstrap';

import { TableContainer } from '../styled';


const ExchangeRatesTable = ({ exchangeRates }) =>
  <Container>
    <Row>
      <Col/>
      <Col>
        <TableContainer>
          <h6>
            <b>USD</b>
            <br />
            CURRENCY EXCHANGE RATES
          </h6>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Currency</th>
                <th>Rate</th>
              </tr>
            </thead>
            <tbody>
              {
                exchangeRates.map(currency =>
                  <tr key={currency.currency}>
                    <td>{currency.currency}</td>
                    <td>{Math.round(currency.rate * 100 + Number.EPSILON) / 100}</td>
                  </tr>
                )
              }
            </tbody>
          </Table>
        </TableContainer>
      </Col>
      <Col/>
    </Row>
  </Container>
;

export default ExchangeRatesTable;
