import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Scream from "../components/screams/Scream";
import StaticProfile from "../components/profile/StaticProfile";
// Material UI
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";
import globalTheme from "../util/theme";
//Redux
import { connect } from "react-redux";
import { getUserScreamData } from "../redux/actions/dataActions";

const styles = makeStyles({ ...globalTheme });

const User = ({ data: { screams, loading }, getUserScreamData, match }) => {
  const [profile, setProfile] = useState(null);
  const [screamIdParam, setScreamIdParam] = useState(null);

  useEffect(() => {
    const handle = match.params.handle;
    const screamId = match.params.screamId;

    if (screamId) setScreamIdParam(screamId);

    getUserScreamData(handle);

    axios
      .get(`/user/${handle}`)
      .then(res => setProfile(res.data.user))
      .catch(err => console.log(err));
  }, []);

  const screamsMarkup = loading ? (
    <p>Loading Data...</p>
  ) : screams === null ? (
    <p>Sorry, this person has yet to post an Oink!</p>
  ) : !screamIdParam ? (
    screams.map(scream => <Scream key={scream.screamId} scream={scream} />)
  ) : (
    screams.map(scream => {
      if (scream.screamId !== screamIdParam) {
        return <Scream key={scream.screamId} scream={scream} />;
      } else {
        return (
          <Scream key={scream.screamId} scream={scream} openDialog={true} />
        );
      }
    })
  );

  const classes = styles();
  return (
    <Grid container spacing={0}>
      <Grid item md={3} sm={2} xs={12}></Grid>
      <Grid item md={6} sm={8} xs={12}>
        {screamsMarkup}
      </Grid>
      <Grid item md={3} sm={2} xs={12}>
        {profile ? (
          <StaticProfile profile={profile} />
        ) : (
          <p>Loading Profile...</p>
        )}
      </Grid>
    </Grid>
  );
};

User.propTypes = {
  getUserScreamData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  data: state.data,
});

export default connect(mapStateToProps, { getUserScreamData })(User);
