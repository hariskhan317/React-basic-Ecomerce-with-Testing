import { render, screen } from '@testing-library/react'
import ProductDetail from '../../src/components/ProductDetail'
import { HttpResponse, http } from 'msw'
import { server } from '../mocks/server'; 

describe("ProductDetail", () => {
    it("Should render with Product Detail", async() => {
        const productId = 1;
        render(<ProductDetail productId={productId} />)

        const productName = await screen.findByText(/Name: /i);
        const productPrice = await screen.findByText(/Price: /i);

        expect(productName).toBeInTheDocument();
        expect(productPrice).toBeInTheDocument();
    })

    it("Should render 'The given product was not found.' if there is no product", async() => {
        const productId = 1;

        server.use(http.get('/products/1', () => HttpResponse.json(null)))

        render(<ProductDetail productId={productId} />)

        const message = await screen.findByText(/The given product was not found./i);

        expect(message).toBeInTheDocument(); 
    })

    it("Should render 'Invalid ProductId' if product id is invalid", async() => {
        const productId = 0;


        render(<ProductDetail productId={productId} />)

        const message = await screen.findByText(/Invalid ProductId/i);

        expect(message).toBeInTheDocument(); 
    })
})