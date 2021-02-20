import React from 'react';
import { Spinner as SpinnerBootstrap } from 'react-bootstrap';

import { SpinnerCentered } from '../styled/index';

const Spinner = () => <SpinnerCentered><SpinnerBootstrap animation="border" variant="primary"/></SpinnerCentered>;

export default Spinner;
