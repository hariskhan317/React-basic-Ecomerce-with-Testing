import { render, screen } from '@testing-library/react';
import Greet from '../../src/components/Greet'


describe('Greet', () => {
    it('should render hello with the name when the name render', () => {
        render(<Greet name="Mosh" />);

        const heading = screen.getByRole("heading");
        expect(heading).toBeInTheDocument();
        expect(heading).toHaveTextContent(/mosh/i);
    })

    it('show login button if name is not render', () => {
        render(<Greet/>);

        const button = screen.getByRole("button");
        expect(button).toBeInTheDocument(); 
        expect(button).toHaveTextContent(/login/i);
    })
})                                  


// import React from 'react';
// import "@testing-library/jest-dom" 
// import { describe, it, expect } from 'vitest';