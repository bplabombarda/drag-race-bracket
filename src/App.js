import { useEffect, useState } from "react";
import { Header, Footer } from "./components/HeaderFooter";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Enter from "./pages/Enter";
import Submission from "./pages/Submission";
import NewSubmission from "./pages/NewSubmission";
import MTQ from "./pages/MTQ";
import Standings from "./pages/Standings";
import ThankYou from "./pages/ThankYou";
import Rules from "./pages/Rules";
import About from "./pages/About";
import firebase from "./utilities/firebase";
import NotAvailable from "./pages/NotAvailable";
import UnderConstruction from "./pages/UnderConstruction";
import Loading from "./components/Loading";

const db = firebase.firestore();

async function addSubmission(season, formState) {
  try {
    await db
      .collection("seasons")
      .doc(season)
      .collection("submissions")
      .doc(formState.email)
      .set(formState);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`Could not add submission.: ${error}`);
  }
}

export default function App() {
  const [season, setSeason] = useState({ queens: [] });
  const [isLoading, setLoading] = useState(true);

  async function fetchSeasons() {
    const seasonsRef = await db
      .collection("seasons")
      .where("active", "==", true)
      .get();

    const activeSeason = seasonsRef.docs[0].data();
    setSeason(activeSeason);
    setLoading(false);

    // const dev = { ...activeSeason, submissionsOpen: false };
    // setSeason(dev);
  }
  useEffect(() => {
    fetchSeasons(setSeason);
  }, []);

  return (
    <>
      {sessionStorage.getItem("entered") !== "true" &&
        window.innerWidth / window.innerHeight <= 0.65 && <Enter />}
      <Header season={season} />
      <div className="app-container">
        <Routes>
          {!isLoading ? (
            <>
              <Route
                path="/"
                element={
                  season.submisssionsOpen ? (
                    <HomePage season={season} />
                  ) : (
                    <Standings season={season} db={db} />
                  )
                }
              />
              <Route
                path="/submission/:name"
                element={<Submission season={season} db={db} />}
              />
              <Route
                path="/submissions/new"
                element={
                  <NewSubmission
                    season={season}
                    addSubmission={addSubmission}
                  />
                }
              />
              <Route path="/construction" element={<UnderConstruction />} />
              <Route path="/thanks" element={<ThankYou season={season} />} />
              <Route path="/rules" element={<Rules season={season} />} />
              <Route path="/mtq" element={<MTQ season={season} />} />
              <Route path="/about" element={<About season={season} />} />
              <Route path="*" element={<NotAvailable />} />
            </>
          ) : isLoading ? (
            <Route path="*" element={<Loading />} />
          ) : (
            <Route path="*" element={<NotAvailable />} />
          )}
        </Routes>
      </div>
      <Footer />
    </>
  );
}
