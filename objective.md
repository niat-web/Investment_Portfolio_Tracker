# Investment_Portfolio_Tracker

## Objective
This project provides a simple, client-side investment portfolio tracker using JavaScript, HTML, and CSS with Bootstrap for styling. It allows users to add, track, and delete investment holdings, calculating total portfolio value, gain/loss, and a simplified annual return. Data is persisted using local storage. The application also features a dark mode toggle and form validation. While a real API is not included for live stock data, the code is structured to accommodate one with a placeholder function that simulates API data retrieval.

## Output
<iframe src="https://github.com/niat-web/Investment_Portfolio_Tracker" height="1000" width="300" title="Investment_Portfolio_Tracker"></iframe>

## Project Requirements
**Technologies:** HTML, CSS, JavaScript, Bootstrap

## Features to Implement
- Add new investment holdings with ticker symbol, quantity, purchase price, and date.
- Display current investment holdings in a table.
- Calculate and display total portfolio value and total gain/loss.

## UI Enhancements
- Implement a dark mode toggle for user preference.
- Add form validation to ensure data integrity.

## Project Tasks & Expected Outcomes
| Task | Expected Outcome |
|------|------------------|
| Implement dark mode toggle | The application switches between light and dark themes when the toggle is clicked, updating the `data-theme` attribute on the `body` element. |
| Implement form validation |  The investment form validates user input before submission, providing visual feedback for invalid fields and preventing submission of incomplete or incorrect data. |
| Implement adding investments | The application captures user input from the investment form, creates a new investment object, adds it to the `investmentHoldings` array, saves it to local storage, and re-renders the holdings table. |
| Implement deleting investments | When the delete button is clicked, the application removes the corresponding investment from the `investmentHoldings` array, saves the updated array to local storage, and re-renders the holdings table. |
| Implement displaying total investment value | The application accurately calculates the total value of all holdings based on current price, displaying it in the specified UI element. |

## JavaScript Concepts
| Concept | Implementation |
|---------|----------------|
| DOM Manipulation | Used to access and modify HTML elements, such as toggling dark mode, displaying investment holdings, and handling form submissions. |
| Event Listeners | Used to respond to user interactions, such as form submissions, button clicks, and scroll events. |
| Local Storage | Used to persist investment data between sessions by storing and retrieving the `investmentHoldings` array as a JSON string. |
| Asynchronous Functions (async/await) | Used to simulate fetching current stock prices from an API, allowing the UI to remain responsive while waiting for the data. |
| Array Methods (e.g., `filter`, `reduce`, `push`) | Used to manipulate the `investmentHoldings` array, such as adding, deleting, and calculating totals. |
| Bootstrap Modals | Used to display non-blocking notifications to the user, such as success or error messages. |
| Form Validation | Uses Bootstrap's built-in validation to check if the inputs are valid before submitting. |

## API Details
| API | Endpoint | Description |
|-----|----------|-------------|
| Simulated Stock Price API | N/A (Simulated) | The `fetchCurrentPrice` function simulates fetching the current stock price for a given ticker symbol. It returns a random price after a short delay, mimicking an API call.  **Note:** This is a placeholder and should be replaced with a real stock price API for production use. |