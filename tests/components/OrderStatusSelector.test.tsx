import OrderStatusSelector from '../../src/components/OrderStatusSelector';
import { render, screen } from '@testing-library/react';
import { Theme } from "@radix-ui/themes";
import userEvent from '@testing-library/user-event'

describe('OrderStatusSelector', () => {
    const renderComponent = () => {
        const onChange = vi.fn();
        render(
            <Theme>
                <OrderStatusSelector onChange={onChange} />
            </Theme>
        )   

        return {
            onChange,
            getOptions: () => screen.findAllByRole("option"),
            getOption: (label: RegExp) => screen.findByRole('option', { name: label}),
            button: screen.getByRole('combobox'),
            user: userEvent.setup(),
        }
    }
    it("Should render new as the default value ", () => {
        const { button } = renderComponent();
        expect(button).toHaveTextContent(/new/i)
    })

    it("Should render correct status", async () => {
        const { button, getOptions, user } = renderComponent(); 
        expect(button).toHaveTextContent(/new/i)

        await user.click(button);

        const options = await getOptions();
        expect(options).toHaveLength(3);
        const labels = options.map(option => option.textContent);
        expect(labels).toEqual(['New', 'Processed', 'Fulfilled'])
    })

    it.each([
        { label: /processed/i, value: 'processed', },
        { label: /fulfilled/i, value: 'fulfilled', }
    ])(`Should call onchange with $value when the $label option is selected`, async ({label, value}) => {
        const { button, onChange, user, getOption } = renderComponent();
        await user.click(button);
        // at this process our option box is open  now we need to find role

        const option = await getOption(label);
        await user.click(option);
        expect(onChange).toHaveBeenCalledWith(value)
    })

    it("should call onChange with 'new' when the New option is selected", async () => {
        const { button, onChange, user, getOption } = renderComponent();
        await user.click(button);

        const processedOption = await getOption(/processed/i)
        await user.click(processedOption);

        await user.click(button)
        const newOption = await getOption(/new/i);
        await user.click(newOption);
    
        expect(onChange).toHaveBeenCalledWith('new');
    });

})
