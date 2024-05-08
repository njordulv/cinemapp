## CinemApp - An Application for Movie Enthusiasts

### Description

CinemApp is a comprehensive web application that provides users with a rich set of features to explore the world of cinema. Built using cutting-edge technologies such as Next.js and NextUI and extensively utilizing TailwindCSS for styling, this application ensures a smooth and impressive user experience.

The application is deployed on Vercel and can be accessed at [https://cinemapp-movie.vercel.app/]

### Key Features

1. Extensive Database of Movies, TV Shows, and Celebrities
   CinemApp is integrated with The Movie Database (TMDB) API, allowing access to an extensive database containing information about movies, TV shows, actors, creators, related movies, videos and much more.
2. Intelligent Search with Autocomplete
   One of the key highlights of CinemApp is its intelligent search system with autocomplete. As users type in a movie title or celebrity name, the application instantly suggests relevant options, streamlining the search process.
3. User Authentication with Firebase
   CinemApp provides a user authentication system implemented using the Firebase SDK. Users can easily register, log in, and manage their profiles through convenient login, registration, and dashboard pages.
4. Personalized User Experience
   Once registered, users gain access to personalized features such as the ability to manage their profile, update their name, avatar, and add movies to their Watchlist and Favorites lists. All this data is securely stored in Firebase.
5. State Management with Redux Toolkit and Redux Persist
   - CinemApp employs Redux Toolkit and Redux Persist for efficient state management within the application. Redux Toolkit provides a centralized data store, while Redux Persist allows data to persist across application reloads, ensuring a seamless user experience.
   - To further optimize performance and prevent unnecessary re-renders, CinemApp utilizes memoization for Redux selectors using the createSelector function from the reselect library. Memoization caches the results of selector functions, avoiding redundant computations when called with the same arguments.
6. Dynamic Content Fetching Methods
   The application utilizes several methods for fetching and working with the TMDB API:
   - API Routes using NextResponse to fetch data on the server-side (SSR);
   - Utility Fetch Function via 'use server' directive (SSR);
   - SWR Hook from the swr library to fetch data and handle caching via 'use client' (CSR).

### Technologies

- React framework: Next.js
- UI design system: Next UI, TailwindCSS
- State Management: Redux Toolkit, Redux Persist
- Сloud Database: Firestore SDK
- Movie Database: TMDB API
- Languages: TypeScript
- Add Libraries: @nextui-org, firebase, framer-motion, lodash, react-parallax, react-show-more-text, react-toastify, react-youtube, reselect, swr

### Installation

1. Clone the repository:

git clone [https://github.com/njordulv/cinemapp.git]
cd cinemapp

2. Install dependencies:

yarn install

3. After cloning the repository, you need to set up the environment variables in the .env.local file for the application to work correctly.
   Here are the required variables:

NEXT_PUBLIC_API_KEY = 'your_tmdb_api_key_here'
NEXT_PUBLIC_BASE_URL = 'https://api.themoviedb.org/3/'
NEXT_PUBLIC_BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/'
NEXT_PUBLIC_NO_IMAGE = '/no-image.svg'
NEXT_PUBLIC_FIREBASE_API_KEY = ''
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN = ''
NEXT_PUBLIC_FIREBASE_PROJECT_ID = ''
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET = ''
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID = ''
NEXT_PUBLIC_FIREBASE_APP_ID = 'your_firebase_app_id_here'
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID = ''

4. Start the application:

yarn start

5. Open your web browser and navigate to [http://localhost:3000](http://localhost:3000) to access the app.

### Contributing

Contributions are welcome! Please fork the repository and submit pull requests to the develop branch. For substantial changes, please open an issue first to discuss what you would like to change. Ensure to update tests as appropriate.

### Disclaimer

The application includes a Terms of Use modal that appears upon the user's first visit to the website. This modal displays information about the usage of The Movie Database (TMDB) API and its branding. The modal is implemented using the NextUI library and leverages React hooks and local storage to ensure it only appears once per user session.

### License

This project is licensed under the [MIT License](LICENSE).

This project was bootstrapped with
[Create React App](https://github.com/facebook/create-react-app).
