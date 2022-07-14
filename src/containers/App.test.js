import React from 'react'
import App from './App'
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

describe('Testing loading App', () => {
    
    const history = createMemoryHistory();
    
    test('Should load App content that loads /page/Home', () => {
        
        const wrapper = render(
            <Router location={history.location} navigator={history}> <App /> </Router>);
            expect(wrapper).toMatchSnapshot();
        }
    );
})