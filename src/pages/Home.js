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
import PostSkeleton from "../components/layout/PostSkeleton";

const Home = ({ data: { screams, loading }, getScreams }) => {
  useEffect(() => {
    getScreams();
  }, []);

  let recentScreamsMarkup = !loading ? (
    screams.map(scream => <Scream scream={scream} key={scream.screamId} />)
  ) : (
    <PostSkeleton />
  );

  return (
    <Grid container spacing={0}>
      <Grid item md={3} sm={4} xs={0}>
        <Profile />
      </Grid>
      <Grid item md={6} sm={8} xs={12} spacing={0}>
        {recentScreamsMarkup}
      </Grid>
      <Grid item md={3} sm={0} xs={0}></Grid>
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
