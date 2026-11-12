import { Suspense } from "react";
import CreateTokenClient from "./CreateTokenClient";

export default function CreateTokenPage() {
  return (
    <Suspense fallback={null}>
      <CreateTokenClient />
    </Suspense>
  );
}
