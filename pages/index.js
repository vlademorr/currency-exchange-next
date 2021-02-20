import React from 'react';
import { connect } from 'react-redux';

import { Spinner, ErrorAlert, ExchangeRatesTable } from '../components';

import { fetchExchangeRates, wrapper } from '../redux/ducks/exchange';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = ({ exchangeRates, loading, error }) =>
  loading ? (
    <Spinner />
  ) : (
    <>
      <ErrorAlert error={error} />
      <ExchangeRatesTable exchangeRates={exchangeRates} />
    </>
  )
;

export const getServerSideProps = wrapper.getStaticProps(async ({ store }) => {
  await store.dispatch(fetchExchangeRates('USD'))
});

const mapStateToProps = ({ exchangeRates }) => ({ exchangeRates });

export default connect(mapStateToProps)(Home);
