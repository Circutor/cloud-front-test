import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';

describe('App', () => {
  it('renders component', () => {
    render(
      <Router>
        <App />
      </Router>
    );
  });

  
})
