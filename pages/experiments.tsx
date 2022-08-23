import Link from "next/link";
import React from "react";

type Props = {};

const Experiments = (props: Props) => {
  return (
    <div>
      <Link href="/">Home</Link>

      <h1>Experiments</h1>
      <ul>
        <li>
          <Link href="/experiments/circleEyes">Circle Eye</Link>
        </li>
        <li>
          <Link href="/experiments/octopus">Octopus</Link>
        </li>
        <li>
          <Link href="/experiments/radar">Radar</Link>
        </li>
      </ul>
    </div>
  );
};

export default Experiments;
