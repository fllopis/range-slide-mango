import React from 'react'
import Exercise2 from '../../../src/pages/Exercise2'
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

describe('Testing page Exercise2', () => {
    
    const history = createMemoryHistory();
    
    test('Should load the page Exercise2', () => {
        
        const wrapper = render(
            <Router location={history.location} navigator={history}> <Exercise2 /> </Router>);
            expect(wrapper).toMatchSnapshot();
        }
    );
})