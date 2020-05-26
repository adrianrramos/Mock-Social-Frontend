// Dependencies
import React, { useEffect } from "react";
import PropTypes from "prop-types";
// Components
import Grid from "@material-ui/core/Grid";
import Scream from "../components/screams/Scream";
import Profile from "../components/profile/Profile";
// Redux
import { connect } from "react-redux";
import { getScreams } from "../redux/actions/dataActions";

const Home = ({ data: { screams, loading }, getScreams }) => {
  useEffect(() => {
    getScreams();
  }, []);

  let recentScreamsMarkup = !loading ? (
    screams.map(scream => <Scream scream={scream} key={scream.screamId} />)
  ) : (
    <p>Loading...</p>
  );

  return (
    <Grid container spacing={0}>
      <Grid item md={3} sm={4} xs={12}>
        <Profile />
      </Grid>
      <Grid item md={6} sm={8} xs={12}>
        {recentScreamsMarkup}
      </Grid>
      <Grid item md={3} sm={0} xs={12}></Grid>
    </Grid>
  );
};

Home.propTypes = {
  getScreams: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  data: state.data,
});

export default connect(mapStateToProps, { getScreams })(Home);
