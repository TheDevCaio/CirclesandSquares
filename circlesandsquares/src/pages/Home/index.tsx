import React from "react";
import { useEffect, useState } from "react";
import { Container } from "../../components/Global";
import LoadingScreen from "../../components/Loading";
import Start from "../../components/Start";


export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); 
    return () => clearTimeout(timer);
  }, []);

  return (
    <Container>
      {loading ? <LoadingScreen /> : <Start/>}
    </Container>
  );
}