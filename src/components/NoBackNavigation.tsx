import { useRouter } from "next/router";
import { useEffect } from "react";

const NoBackNavigation = () => {
  const router = useRouter();

  useEffect(() => {
    const handlePopState = () => {
      location.reload;
    };
    window.addEventListener("popstate", handlePopState);

    return () => {};
  });
};
