import {cleanup, fireEvent, render, act, screen, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import {createRoot,Root} from "react-dom/client";
import React from 'react';

// components
import LoginPage from '../src/app/login/page';

// was causing an error so mock it, see: https://nextjs.org/docs/messages/next-router-not-mounted
jest.mock("next/navigation");

describe("Displays Login Page Components on Screen", () => {
    let container;
    let root;

    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
        root = createRoot(container);
        act(() => {
            root.render(
                <LoginPage />
            )
        })
        // we can confirm we have some element on the page
        // console.log('before cleanup: ', !!screen.getByText(/disabled/i, { selector: 'button' }));
    });

    afterEach(() => {
        act(() => {
            root.unmount();
            jest.clearAllMocks();
            cleanup();
        })
        // after cleanup the element will cease to exist and this will error
        // console.log('after cleanup: ', !!screen.getByText(/disabled/i, { selector: 'button' }));
    });


    test('it renders Login heading on screen', () => {
        const allByLoginText = screen.getAllByText(/Login/i);
        const loginHeading = allByLoginText[0];
        expect(loginHeading.nodeName).toEqual('H1');
        expect(loginHeading).toBeInTheDocument();
    })

    test('The Login heading is h1', () => {
        const headings = document.querySelectorAll('body h1');
        const loginHeadingText = headings[0].textContent;
        expect(loginHeadingText).toEqual('Login');
    })

    test('it renders email label on screen', () => {
        const emailLabel = screen.getByLabelText('email');
        expect(emailLabel).toBeInTheDocument();
    })

    test('the labels rendered have correct text', () => {
        const labels = document.querySelectorAll('label');

        const emailLabel = labels[0].textContent;
        expect(emailLabel).toEqual('email');

        const passwordLabel = labels[1].textContent;
        expect(passwordLabel).toEqual('password');
    });

    test('it renders email input on screen', () => {
        const emailInput = screen.getByPlaceholderText('email');
        expect(emailInput).toBeInTheDocument();
        expect(emailInput).toBeEmptyDOMElement();
    })

    test('it renders password label on screen', () => {
        const emailLabel = screen.getByLabelText('password');
        expect(emailLabel).toBeInTheDocument();
    })

    test('it renders password input on screen', () => {
        const passwordInput = screen.getByPlaceholderText('password');
        expect(passwordInput).toBeInTheDocument();
        expect(passwordInput).toBeEmptyDOMElement();
    })

    test('it renders login button with disabled text on screen', () => {
        const loginButton = screen.getByText(/disabled/i, { selector: 'button' });
        expect(loginButton).toBeInTheDocument();
    })

    test('it renders Visit Signup Page Link ', () => {
        const links = document.querySelectorAll('a');
        const visitSignupPageLink = links[0];
        expect(visitSignupPageLink.innerHTML).toEqual('Visit Signup Page');
    })

    test('it checks Login action when email and password fields have input', async () => {
        const user = {email: "test@test.com", password: '123456'};
        const url = '/api/users/login';

        function postMock() {
            return new Promise((resolve) =>
                setTimeout(() => {
                    resolve({
                        json: () =>
                            Promise.resolve({
                                data: "success",
                            }),
                    });
                }, 1000)
            );
        }

        jest.spyOn(axios, "post").mockImplementation(postMock);

        const inputs = document.querySelectorAll('input');
        const emailInput = inputs[0];
        const passwordInput = inputs[1];

        // fill fields
        act(() => {
            fireEvent.change(emailInput, {target: {value: user.email}});
            fireEvent.change(passwordInput, {target: {value: user.password}});
        });

        // this works with disable text below; we need it to work with /login/i
        const buttons = await waitFor(() => {
            return screen.findAllByText(
                /login/i,
                { selector: 'button' },
                { timeout: 3000 }
            );
        });

        const LoginButton = buttons[0];
        expect(LoginButton.textContent).toEqual('Login');

        // click Login button
        act(() => {
            fireEvent.click(LoginButton);
        });

        expect(axios.post).toHaveBeenCalledWith(
            url, user, {headers: {Authorization: expect.stringMatching(/.+/)}}
        )
    });
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