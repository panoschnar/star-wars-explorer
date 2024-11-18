# Star Wars Explorer

**Star Wars Explorer** is a single-page application (SPA) built with **Next.js** and **TypeScript**, consuming the **Star Wars API (SWAPI)**. It enables users to explore characters, planets, and starships with advanced features like search, infinite scrolling, favorites, and caching.

## Features

- **Search:** Explore characters, planets, and starships using a search bar.
- **Details:** View detailed information about each entity.
- **Infinite Scrolling:** Seamlessly load more results as you scroll.
- **Favorites:** Mark entities as favorites and persist them using `localStorage`.
- **Dynamic UI:** Includes hover effects, border animations, and smooth transitions.
- **Responsive Design:** Fully optimized for desktop and mobile devices.
- **Accessibility:** Built with accessible components and features.

---

## Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or later)
- npm, yarn, pnpm, or bun (package managers)

### Installation

1. Clone the repository:

```bash
   git clone https://github.com/panoschnar/star-wars-explorer.git
   cd star-wars-explorer
```

2. Install dependencies:

```bash
  npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Run the development server:

```bash npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   Open your browser and navigate to: http://localhost:3000
```

## How to Use

### Searching

- Enter keywords in the search bar to find characters, planets, or starships.
- Press **Enter** or click the **Search** button to initiate the search.
- Clear the search field by clicking the ✖ button.

### Viewing Details

- Click on any search result to view its detailed information.
- For planets and starships, additional information like climate, population, or manufacturer is displayed.

### Infinite Scroll

- Scroll down on the search results page to load more results dynamically.

### Favorites

- Click the heart icon (❤️) to mark an entity as a favorite.
- Favorites are saved automatically and persist across sessions.

---

## Challenges Faced

- **Optimizing API Calls**: Implemented caching and deduplication to minimize redundant API requests.
- **State Management**: Used React Context for global state, managing search results, favorites, and loading states efficiently.
- **Infinite Scrolling**: Handled performance optimizations to render large datasets seamlessly.
- **Dynamic UI/UX**: Created engaging hover effects, animations, and a responsive layout.

---

## Technologies Used

- **Framework**: Next.js
- **Language**: TypeScript
- **UI Library**: Custom components with dynamic animations
- **API**: Star Wars API (SWAPI)
- **State Management**: React Context
- **Storage**: localStorage for persisting favorites
