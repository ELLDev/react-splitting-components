import { useEffect, useState } from "react";
import { Button } from "./Button";
import { api } from "../services/api";

interface SideBarProps {
  selectedGenreId: number;
  setSelectedGenreId: (id: number) => void;
}

export function SideBar(props: SideBarProps) {
  interface GenreResponseProps {
    id: number;
    name: "action" | "comedy" | "documentary" | "drama" | "horror" | "family";
    title: string;
  }

  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  function handleClickButton(id: number) {
    props.setSelectedGenreId(id);
  }

  useEffect(() => {
    api.get<GenreResponseProps[]>("genres").then((response) => {
      setGenres(response.data);
    });
  }, []);

  return (
    <nav className="sidebar">
      <span>
        Watch<p>Me</p>
      </span>

      <div className="buttons-container">
        {genres.map((genre) => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => handleClickButton(genre.id)}
            selected={props.selectedGenreId === genre.id}
          />
        ))}
      </div>
    </nav>
  );
}
