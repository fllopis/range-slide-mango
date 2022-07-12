import React, { useState, useEffect } from 'react'
import Range from '../../../../src/components/range-picker/Range';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

describe('Testing <Range /> component', () => {
    
    const history = createMemoryHistory();
    
    test('Should load the component', () => {
        
        const wrapper = render(
            <Router location={history.location} navigator={history}> 
                <Range min={'1'} max={'10000'} />
            </Router>);
            expect(wrapper).toMatchSnapshot();
        }
    );
})