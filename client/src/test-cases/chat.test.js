// import { render } from "@testing-library/react"
// import { createStore } from "redux"
// import { Provider } from "react-redux"
// import Chat from "../component/Chat/Chat"
// import reducer from "../store/reducer"
// import store from "../store/store"
// import '@testing-library/jest-dom/extend-expect'

// import { screen, fireEvent } from "@testing-library/dom"
// function renderWithRedux(
//     ui,
//     { initialState, store = createStore(reducer, initialState) } = {},
// ) {
//     return {
//         ...render(<Provider store={store}>{ui}</Provider>),
//         // adding `store` to the returned utilities to allow us
//         // to reference it in our tests (just try to avoid using
//         // this to test implementation details).
//         store,
//     }
// }
// describe('', () => {
//     test('can render with redux with defaults', () => {
//         const { getByTestId } = renderWithRedux(
//             <Chat />,
//         )
//         const text = screen.getByTestId("count").textContent
//         console.log(text);
//         console.log("test", text);
//         expect(text).toEqual("1")
//     })
//     test('can render with redux event', () => {
//         const { getByTestId } = renderWithRedux(
//             <Chat />,
//         )
//         fireEvent.click(screen.getByText('+'))
//         const element = screen.getByTestId("count")
//         expect(getByTestId("count")).toHaveTextContent("1")
//     })
// })

