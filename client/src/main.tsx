import "./styles.css";

import { zodResolver } from "@hookform/resolvers/zod";
import { render } from "preact";
import { useForm } from "react-hook-form";
import * as z from "zod";

const schema = z.object({});

export function App() {
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  return (
    <>
      <h1>🏠 Energy Forecast</h1>
      <nav>
        <ul>
          <li>
            <a className="current" href="/new">
              New
            </a>
          </li>
          <li>
            <a className="current" href="/new">
              New
            </a>
          </li>
          <li>
            <a className="current" href="/new">
              New
            </a>
          </li>
        </ul>
      </nav>
      <form onSubmit={handleSubmit((data) => console.log(data))}>
        <label>
          CDD65
          <div>
            <input {...register("CDD65")} />
          </div>
        </label>
        <label>
          HDD65
          <div>
            <input {...register("HDD65")} />
          </div>
        </label>
        <button>Submit</button>
      </form>
    </>
  );
}

render(<App />, document.getElementById("app")!);
