import R from 'ramda';
import React, { Component, PropTypes } from 'react';

import { REPORT_STATES, REPORT_RENDER_FUNCTIONS, REPORT_STATE_EVALUATORS } from './BlockableReportHelpers';
import makeMemesWithCompanyCatchPhrases from '../../service/memeGenerator';

const preReportMessage = `This Report is blocked by a button click because this creates entropy for memegenerator and probably lowers
      the count of requests that the sample User + your IP can submit.`;

const renderReportWaiting = generatorFunction => REPORT_RENDER_FUNCTIONS.renederReportWaiting(generatorFunction, preReportMessage);

// The images prop is pulled from state which is the second arg passed to the R.cond function exec.
const renderReportDone = R.curry((users, { images }) => images.map(({ instanceImageUrl }, index) => {
  const { id, name } = users[index];
  return (
    <div key={id}>
      <h2>{name}</h2>
      <img src={instanceImageUrl} alt={`meme for ${name}`} />
    </div>);
}));

class ReportThree extends Component {
  constructor() {
    super();

    this.state = {
      images: [],
      loading: false,
      result: REPORT_STATES.WAITING,
    };

    this.handleLoadImages = this.handleLoadImages.bind(this);
  }

  handleLoadImages() {
    this.setState({ loading: true });

    const onSuccess = (images) => {
      this.setState({ images, result: REPORT_STATES.SUCCESS, loading: false });
    };

    const onFailure = (err) => {
      // TODO: a nicer thing to do would be to do something with this error...
      console.error(err);
      this.setState({ result: REPORT_STATES.FAILURE, loading: false });
    };

    makeMemesWithCompanyCatchPhrases(this.props.users, onSuccess, onFailure);
  }

  render() {
    const isLoading = R.propEq('loading', true);
    const reportIsInWaitingState = R.propEq('result', REPORT_STATES.WAITING);
    const reportIsInDoneState = R.propEq('result', REPORT_STATES.SUCCESS);

    return R.cond([
      [isLoading, REPORT_RENDER_FUNCTIONS.renderThrobber],
      [reportIsInWaitingState, renderReportWaiting(this.handleLoadImages)],
      [reportIsInDoneState, renderReportDone(this.props.users)],
    ])(this.state);
  }
}

ReportThree.propTypes = {
  users: PropTypes.array,
};

export default ReportThree;
