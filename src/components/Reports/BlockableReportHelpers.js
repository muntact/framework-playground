import R from 'ramda';
import React from 'react';
import { CircularProgress, RaisedButton } from 'material-ui';

/*
* A file of general helpers for reports which are 'blocked' behind a button because they contain
* an API fetch.
*/

// State enums:
export const REPORT_STATES = {
  WAITING: 'WAITING',
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE',
};

// Common render functions for calling via R.cond.
const renderThrobber = () => <CircularProgress size={80} thickness={5} />;

const renderReportWaiting = (generateReport, preReportMessage) => () => (
  <div>
    <p>{preReportMessage}</p>
    <RaisedButton label={'Generate Report API'} onClick={generateReport} />
  </div>
);

export const REPORT_RENDER_FUNCTIONS = {
  renderThrobber,
  renderReportWaiting,
};

// Common state evaluation helpers.
const isLoading = R.propEq('loading', true);
const reportIsInWaitingState = R.propEq('result', REPORT_STATES.WAITING);
const reportIsInDoneState = R.propEq('result', REPORT_STATES.SUCCESS);

export const REPORT_STATE_EVALUATORS = {
  isLoading,
  reportIsInWaitingState,
  reportIsInDoneState,
};
