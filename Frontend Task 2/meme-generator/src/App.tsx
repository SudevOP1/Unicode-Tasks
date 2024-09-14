import { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MemeInfoComponent from "./components/MemeInfoComponent";
import MemeCreate from "./components/MemeCreate";
import "./App.css";

interface Meme {
  id: string;
  name: string;
  url: string;
}

function App() {
  const URL_get_memes = "https://api.imgflip.com/get_memes";

  const [memes, setMemes] = useState<Meme[]>([]);
  const [error, setError] = useState();

  const fetchMemes = async () => {
    try {
      const response = await fetch(`${URL_get_memes}`);
      const data = await response.json();
      setMemes(data.data.memes);
    } catch (e: any) {
      setError(e);
    }
  };

  useEffect(() => {
    fetchMemes();
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <div>
          <h1 className="mx-5 my-4">All Meme Templates</h1>
          <div className="container mt-4">
            <div className="row row-cols-1 row-cols-md-3 g-4">
              {memes.map((meme) => (
                <MemeInfoComponent
                  id={meme.id}
                  name={meme.name}
                  url={meme.url}
                  key={meme.id}
                />
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      path: "/memecreate/:id",
      element: <MemeCreate />,
    },
  ]);

  if (error) {
    return (
      <div>
        <h2>Something went wrong! Please try again!</h2>;
        <p>
          <b>Error:</b>
        </p>
        <p>{error}</p>
      </div>
    );
  }
  return <RouterProvider router={router} />;
}

export default App;
