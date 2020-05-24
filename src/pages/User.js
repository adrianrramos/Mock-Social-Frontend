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

  const getUserProfile = handle =>
    axios
      .get(`/user/${handle}`)
      .then(res => setProfile(res.data.user))
      .catch(err => console.log(err));

  useEffect(() => {
    const handle = match.params.handle;
    getUserScreamData(handle);
    getUserProfile(handle);
  }, []);

  const screamsMarkup = loading ? (
    <p>Loading Data...</p>
  ) : screams === null ? (
    <p>Sorry, this person has yet to post an Oink!</p>
  ) : (
    screams.map(scream => <Scream key={scream.screamId} scream={scream} />)
  );

  const classes = styles();
  return (
    <Grid container spacing={5}>
      <Grid item sm={8} xs={12}>
        {screamsMarkup}
      </Grid>
      <Grid item sm={4} xs={12}>
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
