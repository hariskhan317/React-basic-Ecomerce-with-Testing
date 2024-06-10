import { render, screen } from '@testing-library/react'
import ExpandableText from '../../src/components/ExpandableText'
import userEvent from '@testing-library/user-event'

describe("ExpandableText", () => {
    const shortText = "short text"
    const longText="Lorem ipsum dolor sit, amet consectet beatae culpa dodio tempore minima quibusdam quo ullam ducimus cumque soluta! Error voluptas debitis maiores asperiores doloribus quae repellat ducimus! Quisquam quo nulla perferendis ea consequuntur maiores corporis, animi ratione culpa consectetur et neque consequatur, in ipsum vero quos facilis voluptates unde accusamus cupiditate expedita quis quidem dolor! Et facilis enim itaque, voluptates error dolore. Eligendi ducimus, expedita omnis optio alias unde commodi impedit autem laudantium deleniti est praesentium."
    const truncatedText = longText.substring(0, 255) + '...'
    
    it("Render the component if text is less than 255", () => {
        render(<ExpandableText text={shortText} />)
        expect(screen.getByText(shortText)).toBeInTheDocument();
    })

    it("should truncate text if longer than 255 characters and show button",  () => {

        render(<ExpandableText text={truncatedText} />)
  
        expect(screen.getByText(truncatedText)).toBeInTheDocument();
        const button = screen.getByRole('button');
        expect(button).toHaveTextContent(/Show More/i);

    })

    it("Should expand text when click on show less button", async() => {

        render(<ExpandableText text={longText} />)  
        const button = screen.getByRole('button');
        expect(button).toBeInTheDocument();
        const user = userEvent.setup();
        await user.click(button)
        expect(screen.getByText(longText)).toBeInTheDocument();
        expect(button).toHaveTextContent(/Show Less/i);
    })
  
    it("Should Collapsed text when click on show less button", async() => {

        render(<ExpandableText text={longText} />)  
        const MoreButton = screen.getByRole('button', {name: /more/i});
 
        const user = userEvent.setup();
        await user.click(MoreButton)

        const LessButton = screen.getByRole('button', { name: /less/i });

        await user.click(LessButton)

        expect(screen.getByText(truncatedText)).toBeInTheDocument();
        expect(MoreButton).toHaveTextContent(/Show More/i);
    })
})