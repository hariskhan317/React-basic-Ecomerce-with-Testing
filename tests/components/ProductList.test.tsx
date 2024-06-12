import { render, screen } from '@testing-library/react'
import ProductList from '../../src/components/ProductList';
import { HttpResponse, http } from 'msw'
import { server } from '../mocks/server';

describe("ProductList", () => {
    it("Should return ProductsList", async() => {
        render(<ProductList />)
        const productList = await screen.findAllByRole('list');
        expect(productList.length).toBeGreaterThan(0)
    })

    it("Should return 'No products available.' if product lenght is zero", async () => {

        server.use(http.get('/products', () => HttpResponse.json([])))
        
        render(<ProductList />);

        const message = await screen.findByText(/No products./i);
        expect(message).toBeInTheDocument();
    })
})