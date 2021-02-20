import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { HYDRATE, createWrapper } from 'next-redux-wrapper'
import thunk from 'redux-thunk';

import { getExchangeRates } from '../../services/exchangeRatesService';
import { ERROR, REQUEST, SUCCESS } from '../../constants';

const requestExchangeRates = () => ({
  type: REQUEST
});

const exchangeRatesSuccess = (data) => ({
  type: SUCCESS,
  payload: data
});

const exchangeRatesError  = (error) => ({
  type: ERROR,
  payload: error
});

const fetchExchangeRates = (baseCurrency) => (dispatch) => {
  dispatch(requestExchangeRates());

  return getExchangeRates(baseCurrency)
    .then(rates => dispatch(exchangeRatesSuccess(rates)))
    .catch(err => dispatch(exchangeRatesError(err)))
};

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension');

    return composeWithDevTools(applyMiddleware(...middleware))
  }

  return applyMiddleware(...middleware)
};

const initialState = {
  exchangeRates: [],
  loading: true,
  error: null,
};

const exchangeRatesReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        exchangeRates: [],
      };
    case SUCCESS:
      return {
        ...state,
        exchangeRates: action.payload,
        loading: false,
        error: null
      };
    case ERROR:
      return {
        ...state,
        exchangeRates: [],
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    };
    // if (state.count.count) nextState.count.count = state.count.count;
    return nextState
  } else {
    return exchangeRatesReducer(state, action)
  }
};

const initStore = () => {
  return createStore(reducer, bindMiddleware([thunk]))
};

const wrapper = createWrapper(initStore);

export {
  wrapper,
  fetchExchangeRates,
  requestExchangeRates
};
