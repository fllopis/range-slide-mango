import React from 'react'
import Exercise1 from '../../../src/pages/Exercise1'
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

describe('Testing page Exercise1', () => {
    
    const history = createMemoryHistory();
    
    test('Should load the page Exercise1', () => {
        
        const wrapper = render(
            <Router location={history.location} navigator={history}> <Exercise1 /> </Router>);
            expect(wrapper).toMatchSnapshot();
        }
    );
})