import {cleanup, render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';


// components
import LoginPage from '../src/app/login/page';

// was causing an error so mock it, see: https://nextjs.org/docs/messages/next-router-not-mounted
jest.mock("next/navigation");
describe("Displays Login Page Components on Screen", () => {

    beforeEach(() => {
        render(<LoginPage />);
        // we can confirm we have some element on the page
        // console.log('before cleanup: ', !!screen.getByText(/disabled/i, { selector: 'button' }));
    });

    afterEach(() => {
        cleanup();
        // after cleanup the element will cease to exist and this will error
        // console.log('after cleanup: ', !!screen.getByText(/disabled/i, { selector: 'button' }));
    });


    it('renders Login heading', () => {
        const loginHeading = screen.getByText('Login');
        expect(loginHeading).toBeInTheDocument();
    })

    it('renders email label', () => {
        const emailLabel = screen.getByLabelText('email');
        expect(emailLabel).toBeInTheDocument();
    })

    it('renders email input', () => {
        const emailInput = screen.getByPlaceholderText('email');
        expect(emailInput).toBeInTheDocument();
        expect(emailInput).toBeEmptyDOMElement();
    })

    it('renders password label', () => {
        const emailLabel = screen.getByLabelText('password');
        expect(emailLabel).toBeInTheDocument();
    })

    it('renders password input', () => {
        const passwordInput = screen.getByPlaceholderText('password');
        expect(passwordInput).toBeInTheDocument();
        expect(passwordInput).toBeEmptyDOMElement();
    })

    it('renders login button with disabled text', () => {
        const loginButton = screen.getByText(/disabled/i, { selector: 'button' });
        expect(loginButton).toBeInTheDocument();
    })

});

// {
//     debug: [Function: debug],
//     logTestingPlaygroundURL: [Function: logTestingPlaygroundURL],
//     findAllByLabelText: [Function: bound ],
//     findByLabelText: [Function: bound ],
//     getAllByLabelText: [Function: bound ],
//     getByLabelText: [Function: bound ],
//     queryAllByLabelText: [Function: bound ],
//     queryByLabelText: [Function: bound ],
//     findAllByPlaceholderText: [Function: bound ],
//     findByPlaceholderText: [Function: bound ],
//     getAllByPlaceholderText: [Function: bound ],
//     getByPlaceholderText: [Function: bound ],
//     queryAllByPlaceholderText: [Function: bound ],
//     queryByPlaceholderText: [Function: bound ],
//     findAllByText: [Function: bound ],
//     findByText: [Function: bound ],
//     getAllByText: [Function: bound ],
//     getByText: [Function: bound ],
//     queryAllByText: [Function: bound ],
//     queryByText: [Function: bound ],
//     findAllByDisplayValue: [Function: bound ],
//     findByDisplayValue: [Function: bound ],
//     getAllByDisplayValue: [Function: bound ],
//     getByDisplayValue: [Function: bound ],
//     queryAllByDisplayValue: [Function: bound ],
//     queryByDisplayValue: [Function: bound ],
//     findAllByAltText: [Function: bound ],
//     findByAltText: [Function: bound ],
//     getAllByAltText: [Function: bound ],
//     getByAltText: [Function: bound ],
//     queryAllByAltText: [Function: bound ],
//     queryByAltText: [Function: bound ],
//     findAllByTitle: [Function: bound ],
//     findByTitle: [Function: bound ],
//     getAllByTitle: [Function: bound ],
//     getByTitle: [Function: bound ],
//     queryAllByTitle: [Function: bound ],
//     queryByTitle: [Function: bound ],
//     findAllByRole: [Function: bound ],
//     findByRole: [Function: bound ],
//     getAllByRole: [Function: bound ],
//     getByRole: [Function: bound ],
//     queryAllByRole: [Function: bound ],
//     queryByRole: [Function: bound ],
//     findAllByTestId: [Function: bound ],
// }