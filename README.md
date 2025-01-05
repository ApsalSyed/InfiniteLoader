This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Infinite Loader Application  

This is a React Native application that features **infinite scrolling** using both `FlatList` and `ListView`. The application automatically loads the next set of data when the user scrolls to the end of the current list.  

---  

## Features  

- Implements **infinite scrolling** with two methods:  
  - `FlatList` for modern, efficient lists.  
  - `ListView` for legacy support.  
- Seamless and smooth loading of paginated data.  
- Optimized for large datasets with lazy loading.  
- Clean and user-friendly interface.  

---  

## Getting Started  

Follow these instructions to get the application up and running on your local machine.  

### Prerequisites  

Before you begin, ensure you have:  

- A system set up for [React Native Development](https://reactnative.dev/docs/environment-setup).  
- Node.js and npm/yarn installed.  
- Android Studio and/or Xcode installed for emulators.  

---  

### Installation  

1. Clone this repository:  

   ```bash  
   git clone https://github.com/ApsalSyed/InfiniteLoader.git  
   cd InfiniteLoader  

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Step 3: Application Workflow

Infinite Loader Implementation
The application initializes by fetching data from a mock API or server.

The list renders the initial set of data.

As the user scrolls to the bottom of the list:

An onEndReached event is triggered.
The application fetches the next page of data.
New data is appended to the existing list seamlessly.
The infinite loader implementation is provided through two components:

Infinite Scroll with FlatList: Located in src/scroll/infinite-scroll-flatlist.js.
Infinite Scroll with ListView: Located in src/scroll/infinite-scroll-list.js.

### Code Structure

📂 src  
├── 📂 scroll  
│   ├── 📄 infinite-scroll-flatlist.js  # Infinite scrolling with FlatList  
│   └── 📄 infinite-scroll-list.js      # Infinite scrolling with ListView  
├── 📄 App.tsx                          # Main entry point  
└── 📄 dataService.js                   # Handles paginated data fetching  

### How to Test

Navigate to either src/scroll/infinite-scroll-flatlist.js or src/scroll/infinite-scroll-list.js to switch between components.

Test with varying dataset sizes to observe performance.

### Modifying the App

To customize the app:

Open the App.js file in your text editor.
Make changes to the implementation or UI.
Reload the app:
For Android: Press <kbd>R</kbd> twice or open the Developer Menu (<kbd>Ctrl</kbd> + <kbd>M</kbd> on Windows/Linux, or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> on macOS).
For iOS: Press <kbd>Cmd ⌘</kbd> + <kbd>R</kbd> in the iOS Simulator.

### Troubleshooting

If you encounter issues:

Verify that your environment setup is complete by following the React Native Environment Setup Guide.
Check for dependencies or version mismatches.
Refer to the official Troubleshooting Guide.

# Learn More

Explore these resources to learn more about React Native:

React Native Documentation
FlatList Documentation
ListView Documentation
React Native Blog

# License
This project is licensed under the MIT License.


# Acknowledgements
Inspired by the React Native community.
Special thanks to contributors and developers for maintaining open-source libraries used in this project.
vbnet
Copy code


###### "This version uses `.js` files to reflect your JavaScript implementation. Let me know if you need further updates!"


- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
