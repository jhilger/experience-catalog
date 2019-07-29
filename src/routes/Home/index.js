import React, { useState, useContext, useEffect } from "react";
import SideNav from "../../components/SideNav";
import VisualExperienceList from "../../components/Experiences/View/List/Visual";
import Context from "../../components/Context";
import Header from "../../components/Header";
import loadedQuery from "./loadedQuery";

// Experience is in window.experiences
// SideNavFilters is in window.sideNavFilters

const Home = () => {
  const [state, dispatch] = useContext(Context);
  const { loggedIn, jsforce } = state;

  const [expanded, setExpanded] = useState(false);
  const [rendered, setRendered] = useState(false);

  useEffect(() => {
    setRendered(true);
  }, []); 

  useEffect(() => {
    if (rendered && loggedIn) {
      loadedQuery(jsforce, state, dispatch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rendered, loggedIn]);

  if (!rendered) return null;
  return (
    <React.Fragment>
      <SideNav onToggle={() => setExpanded(!expanded)} />
      <main className={expanded ? "expanded" : ""}>
        <Header />
        <VisualExperienceList />
      </main>
    </React.Fragment>
  );
};

export default Home;
