import { render, screen } from '@testing-library/react'
import TermsAndConditions from '../../src/components/TermsAndConditions'
import userEvent from '@testing-library/user-event'

describe("", () => {
    it("Should Return text when component got render", () => {
        render(<TermsAndConditions />)
        const heading = screen.getByRole('heading');
        expect(heading).toBeInTheDocument();
        expect(heading).toHaveTextContent('Terms & Conditions');

        const checkbox = screen.getByRole('checkbox');
        expect(checkbox).toBeInTheDocument();
        expect(checkbox).not.toBeChecked();

        const button = screen.getByRole('button');
        expect(button).toBeInTheDocument();
        expect(button).toBeDisabled();
    })
    it("Should enabled the button on Input checked", async() => {
        render(<TermsAndConditions />)

        const checkbox = screen.getByRole('checkbox');
        const user = userEvent.setup()
        await user.click(checkbox); 
        const button = screen.getByRole('button');
        expect(button).toBeEnabled();
    })
})