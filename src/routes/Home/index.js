import React, { useState, useContext, useEffect } from "react";
import SideNav from "../../components/SideNav";
import Card from "../../components/Card";
import Context from "../../components/Context";
import Header from "../../components/Header";
import loadedQuery from "./loadedQuery";

// Experience is in window.experiences
// SideNavFilters is in window.sideNavFilters

const Home = () => {
  const [state, dispatch] = useContext(Context);
  const { loggedIn, jsforce, experiences } = state;

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
        <div className="grid-x grid-margin-x grid-margin-y">
          {experiences.filtered.map((exp, i) => (
            <Card key={exp.Id} sort={i} experience={exp} />
          ))}
        </div>
      </main>
    </React.Fragment>
  );
};

export default Home;
