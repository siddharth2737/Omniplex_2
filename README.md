Omniplex Project Updates
This project involves several modifications made to the Omniplex application, including changes to the login page UI, sidebar updates, and the integration of an API to fetch motivational quotes on the main page.

How to Set Up and Run the Project Locally
Prerequisites
Node.js (version 14 or higher)
npm or yarn
Steps to Run the Project Locally
Clone the repository: git clone <repository-url>

Navigate to the project directory: cd <project-directory>

Install the necessary dependencies: npm install

or if you're using yarn: yarn install

Run the application: npm start

or with yarn: yarn start

The application should now be running on http://localhost:3000.

Approach and Changes Made
Login Page UI Modifications: The login page UI was updated to improve its layout and user experience.
Sidebar Updates: The sidebar was modified to enhance navigation, making it more intuitive and visually appealing.
API Integration for Quotes: An API was integrated to fetch a random motivational quote, which is displayed on the main page. The API fetches quotes and randomly selects one to be shown to the user.
Challenges Faced
API Integration: One of the main challenges was integrating the motivational quotes API into the existing project. We overcame this by carefully managing API requests and handling possible errors gracefully.
UI Changes: Making non-intrusive changes to the login page and sidebar without disrupting the overall structure of the Omniplex application took some careful planning and testing.