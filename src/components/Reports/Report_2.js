import R from 'ramda';
import React, { Component, PropTypes } from 'react';
import { Gmaps, Marker } from 'react-gmaps';
import { RaisedButton } from 'material-ui';

// deliberately outside the class as it relies on a side effect...
const params = { v: '3.exp', key: window.apiKey };

const REPORT_STATES = {
  WAITING: 'WAITING',
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE',
};

const renderReportWaiting = handleLoadMap => () => (
  <div>
    <p>
      This Report is blocked by a button click because this report calls the google maps API.
      Therefore we don&quot;t want to create unnecessary errors / fetches if we don&quot;t need to.
    </p>
    <RaisedButton label={'Generate report API'} onClick={handleLoadMap} />
  </div>
);

// The images prop is pulled from state which is the second arg passed to the R.cond function exec.
const renderReportDone = R.curry((that, { focusedUser }) => {
  // TIL: don't pull this.props off of props, the linter isn't smart enough to follow this '-_-
  const { onMapCreated, handleFocusThisUser } = that;
  const markers = that.props.users.map(({ address: { geo }, id: key, name }) => {
    const { lat, lng } = geo;
    return (<Marker {...{ key, lat, lng, onMouseOver: () => handleFocusThisUser(name) }} />);
  });

  // must set a default lat, lng so the map can be centered
  // I am using the first user for these coords.
  const centerMapUser = that.props.users[0];
  const { lat, lng } = centerMapUser.address.geo;

  return (
    <div>
      <p><b>The last focused user was:</b> {focusedUser}</p>
      <Gmaps {...{ width: '600px', height: '375px', zoom: 3, loadingMessage: 'loading', lat, lng, params, onMapCreated }}>
        {markers}
      </Gmaps>
    </div>
  );
});

class ReportTwo extends Component {
  constructor() {
    super();

    this.state = {
      focusedUser: '',
      loading: false,
      result: REPORT_STATES.WAITING,
    };

    this.onMapCreated = this.onMapCreated.bind(this);
    this.handleFocusThisUser = this.handleFocusThisUser.bind(this);
    this.handleLoadMap = this.handleLoadMap.bind(this);
  }

  onMapCreated(map) { // eslint-disable-line class-methods-use-this
    map.setOptions({ disableDefaultUI: true });
  }

  handleLoadMap() {
    this.setState({ result: REPORT_STATES.SUCCESS });
  }

  handleFocusThisUser(focusedUser) {
    this.setState({ focusedUser });
  }

  render() {
    // This report doesn't actually need a loading state - because google maps is pretty responsive
    const reportIsInWaitingState = R.propEq('result', REPORT_STATES.WAITING);
    const reportIsInDoneState = R.propEq('result', REPORT_STATES.SUCCESS);
    // TODO: report failed state - should proably fall into an R.T state and be eval'd last.

    return R.cond([
      [reportIsInWaitingState, renderReportWaiting(this.handleLoadMap)],
      [reportIsInDoneState, renderReportDone(this)],
    ])(this.state);
  }
}

ReportTwo.propTypes = {
  users: PropTypes.array,
};

export default ReportTwo;
