import { render, screen } from '@testing-library/react';
import Greet from '../../src/components/Greet'
import "@testing-library/jest-dom"
import { it, expect, describe } from 'vitest'
import React from 'react'; // Add this line

describe('Greet', () => {
    it('should render hello with the name when the name render', () => {
        render(<Greet name="Mosh" />);

        const heading = screen.getByRole("heading");
        expect(heading).toBeInTheDocument();
        expect(heading).toHaveTextContent(/mosh/i);
    })

    it('show login button if name is not render', () => {
        render(<Greet name="Mosh" />);

        const button = screen.getByRole("button");
        expect(button).toBeInTheDocument(); 
    })
})                                  