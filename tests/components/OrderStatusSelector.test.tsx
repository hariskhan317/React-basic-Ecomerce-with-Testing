import OrderStatusSelector from '../../src/components/OrderStatusSelector';
import { render, screen } from '@testing-library/react';
import { Theme } from "@radix-ui/themes";
import userEvent from '@testing-library/user-event'

describe('OrderStatusSelector', () => {
    it("Should render new as the default value ", () => {
        const onChange = vi.fn();
        render(
            <Theme>
                <OrderStatusSelector onChange={onChange} />
            </Theme>
        )
        const button = screen.getByRole('combobox');
        expect(button).toHaveTextContent(/new/i)
    })

    it("Should render correct status", async () => {
        const onChange = vi.fn();
        render(
            <Theme>
                <OrderStatusSelector onChange={onChange} />
            </Theme>
        )   
        const button = screen.getByRole('combobox');
        expect(button).toHaveTextContent(/new/i)

        const user = userEvent.setup();
        await user.click(button);

        const options = await screen.findAllByRole("option");
        expect(options).toHaveLength(3);

    })
})
