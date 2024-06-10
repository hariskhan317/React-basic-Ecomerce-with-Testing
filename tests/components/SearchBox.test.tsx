import { render, screen } from '@testing-library/react'
import SearchBox from '../../src/components/SearchBox'
import userEvent from '@testing-library/user-event'

describe("SearchBox", () => {
    const renderComponent = () => {

        const onChange = vi.fn();
        render(<SearchBox onChange={onChange} />);

        return {
            inputBox: screen.getByRole('textbox'),
            onChange
        }
    }

    it("Should Render Search Box", () => {
        const { inputBox } =  renderComponent();
        expect(inputBox).toBeInTheDocument();
    })

    it("Should call onChange on clicking enter", async() => {
        const { inputBox, onChange } =  renderComponent();
        const searchTerm = "SearchTerm"; 
        const user = userEvent.setup();
        await user.type(inputBox, searchTerm + "{enter}");
        expect(onChange).toHaveBeenCalledWith(searchTerm)
    })

    it("Should not call onChange on input is empty", async() => {
        const { inputBox, onChange } =  renderComponent();
        const user = userEvent.setup();
        const searchTerm = " "; 
        // we wrote enter here because the type will work when user will press the enter
        await user.type(inputBox, searchTerm + "{enter}");
        expect(onChange).not.toHaveBeenCalledWith()
    })
})
