import { render, screen } from '@testing-library/react'
import { User } from "../../src/entities";
import UserList from '../../src/components/UserList';

describe("UserList", () => {
    it("Should return 'No users available.' if users.lenght is zero", () => {
        render(<UserList users={[]} />)
        
        expect(screen.queryByText(/No users available./i)).toBeInTheDocument();
    });

    it("Should render a user list", () => {
        const users: User[] = [
            { id: 1, name: 'haris' },
            { id: 2, name: 'abdullah' }
        ];

        render(<UserList users={users} />)

        users.forEach(user => {
            const link = screen.getByRole('link', { name: user.name });
            expect(link).toBeInTheDocument();
            expect(link).toHaveAttribute('href', `/users/${user.id}`);
        })

    })
});