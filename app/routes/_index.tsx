import type { MetaFunction } from "@remix-run/node";
import { Board } from "~/components/Board";
import { LinksFunction } from "@remix-run/node";
import mainStyles from "../styles/main.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: mainStyles },
];

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="main-component">
      <Board />
    </div>
  );
}
