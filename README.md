# 🎥 AnimeDB

Welcome to the **AnimeDB**, a platform where users can explore trending, popular, top-rated, and seasonal anime. This project uses modern technologies to deliver a fast, interactive, and responsive experience, powered by [Svelte 5](https://svelte.dev/), [Tailwind CSS](https://tailwindcss.com/), and [shadcn-svelte](https://www.shadcn-svelte.com/).

## 🌟 Features

- **Anime Catalog**: Discover anime by trending, season, popularity, and rating.
- **Search Functionality**: Search for anime using keywords or filters.
- **Infinite Scrolling**: Automatically load more content as you scroll.
- **Responsive Design**: Optimized for all screen sizes.
- **Animations**: Enjoy interactive transitions and animations.
- **API Integration**: Powered by [Anilist GraphQL API](https://anilist.co/).
- **Dark Mode Support**: Toggle between light and dark modes as well as system preferred.

## 🛠️ Tech Stack

- **Frontend**: Svelte, TypeScript, TailwindCSS, Shadcn-svelte
- **State Management**: Svelte’s reactive stores
- **API**: Anilist GraphQL API
- **Icons**: shadcn-svelte UI & Lucide Icons,
- **Build Tools**: Vite
- **Deployment**: Cloudflare Pages

## 🚀 Live Demo

You can visit the live website here: [AnimeDB](https://animedbsvelte.pages.dev)

## 🔧 Installation and Setup

To get a local copy of the project up and running, follow these steps:

### Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/en/)
- [pnpm](https://pnpm.io/) (or npm, yarn)

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/Mnoker/animedbsvelte.git
   ```

2. Navigate to the project directory:

   ```sh
   cd animedbsvelte
   ```

3. Install dependencies using pnpm

   ```sh
   pnpm install
   ```

### Running the Development Server

1. Run the development server:

   ```sh
   pnpm dev
   ```

2. Build for production:

   ```sh
   pnpm build
   ```

   This will start the app on http://localhost:5173. You can now view it in your browser.

3. Preview the Production build:

```sh
pnpm preview
```

## ⚙️ Usage

- Browse Anime: Explore anime by different categories (Trending, Current Season, Most Popular, Top Rated).

- Search: Use the search bar to find anime titles.

- Infinite Scrolling: Scroll down the page to load more anime without clicking any buttons.

## 📚 API

This project fetches data from the [Anilist GraphQL API](https://anilist.co/).

## 📝 License

This project is licensed under the MIT License.
