# 🌟 React GitHub Profile Explorer

![React](https://img.shields.io/badge/React-18.2.0-blue)
![Vite](https://img.shields.io/badge/Vite-5.1.5-lightblue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3.3-blue)
![License](https://img.shields.io/badge/license-MIT-green)

![Demo1](https://github.com/techno-trace/GithubProfileExplorer/blob/master/demo/Screen1Demo.PNG)
![Demo2](https://github.com/techno-trace/GithubProfileExplorer/blob/master/demo/Screen1Demo2.PNG)
![Demo3](https://github.com/techno-trace/GithubProfileExplorer/blob/master/demo/Screen2Demo1.PNG)
![Demo4](https://github.com/techno-trace/GithubProfileExplorer/blob/master/demo/Screen3Demo1.PNG)


Explore GitHub profiles effortlessly with this React-based application. Built with Vite, TypeScript, and TailwindCSS, this app provides a fast and responsive interface to search and view GitHub user profiles.

## 🚀 Features

- 🔍 Search GitHub profiles by username
- 📊 View detailed user information and statistics
- 🗂️ Responsive design with TailwindCSS
- ⚡ Fast build and development setup with Vite
- ✅ Type-safe codebase with TypeScript

## 📋 Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (version 18 or newer)
- pnpm (version 7 or newer is recommended)

## 🛠️ Installation

Follow these steps to set up and run the project locally:

1. **Clone the Repository:**
```sh
   git clone https://github.com/techno-trace/GithubProfileExplorer.git
   cd GithubProfileExplorer
```

Install PNPM(Optional):

It's fast and efficient than any other package managers out there!
Checkout PNPM at - https://pnpm.io/

```sh
    
    npm i -g pnpm # only if you don't have pnpm already installed

```
Install Dependencies:

Using PNPM

```sh

    pnpm i

```

Or Using NPM

```sh

    npm i

```

Set Up Environment Variables:
Create a .env file in the root directory and add your GitHub token:

![Generate Github Token](https://github.com/settings/tokens/new?description=GithubProfileExplorerApp&scopes=public_repo)

VITE_GITHUB_TOKEN="your_github_token_here"
VITE_API_BASE_URL="https://localhost:5174"

Run the Development Server:

```sh
    pnpm dev

    Open http://localhost:5174 to view it in your browser.
```
OR

```sh
    npm dev

    Open http://localhost:5174 to view it in your browser.
```

📦 Building for Production

To build the project for production, run:

```sh
    pnpm build
```
OR

```sh
    npm build
```

This will produce optimized files in the dist directory.
🔄 Previewing the Build

After building the project, you can preview it using Vite's preview command:

```sh
    pnpm preview
```
OR 

```sh
    npm preview
```

🔄 Testing the App

You can run the test command which will open playwright test in ui and if you want more info on playwright
you can visit [Playwright](https://playwright.dev/docs/intro#running-the-example-test):

```sh
    pnpm test
```
OR 

```sh
    npm test
```

![Chrome](https://github.com/techno-trace/GithubProfileExplorer/blob/master/demo/TestResults.PNG)
![Firefox](https://github.com/techno-trace/GithubProfileExplorer/blob/master/demo/TestResultsFirefox.PNG)
![Safari](https://github.com/techno-trace/GithubProfileExplorer/blob/master/demo/TestResultsSafari.PNG)

🤝 Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are greatly appreciated.

    Fork the Project
    Create your Feature Branch (git checkout -b feature/AmazingFeature)
    Commit your Changes (git commit -m 'Add some AmazingFeature')
    Push to the Branch (git push origin feature/AmazingFeature)
    Open a Pull Request

📝 License

Distributed under the MIT License. See LICENSE for more information.
✨ Acknowledgements

    React
    Vite
    Tailwind CSS

📧 Contact

Digambar Saha - loveanimesh143@gmail.com

Project Link: https://github.com/techno-trace/GithubProfileExplorer
