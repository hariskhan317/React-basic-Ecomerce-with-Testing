import { render, screen } from '@testing-library/react';
import ProductImageGallery from '../../src/components/ProductImageGallery';
 

describe("ProductImageGallery", () => {
    it("Should return null if image Lenght is zero", () => {
        const { container } = render(<ProductImageGallery imageUrls={[]} />)
        expect(container).toBeEmptyDOMElement();
    })

    it("Should return img with src", () => {
        const imageUrls: string[] = ["url1","url2"]

        render(<ProductImageGallery imageUrls={imageUrls} />)
        const img = screen.getAllByRole("img");
        expect(img.length).toBe(imageUrls.length)
        imageUrls.forEach((url, index) => { 
            expect(img[index]).toHaveAttribute('src', url)
        })
    })  
})