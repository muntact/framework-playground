import React, { Component, PropTypes } from 'react';
import { CircularProgress, RaisedButton } from 'material-ui';
import makeMemesWithCompanyCatchPhrases from '../../service/memeGenerator';

class ReportThree extends Component {
  constructor() {
    super();

    this.state = {
      images: [],
      loading: false,
      result: 'waiting',
    };

    this.handleLoadImages = this.handleLoadImages.bind(this);
  }

  handleLoadImages() {
    this.setState({ loading: true });

    const onSuccess = (images) => {
      this.setState({ images, result: 'success', loading: false });
    };

    const onFailure = (err) => {
      // TODO: a nicer thing to do would be to do something with this error...
      console.error(err);
      this.setState({ result: 'failure', loading: false });
    };

    makeMemesWithCompanyCatchPhrases(this.props.users, onSuccess, onFailure);
  }

  render() {
    // TODO: R.cond this?
    const { images, loading, result } = this.state;
    const isWaiting = result === 'waiting';

    return (
      <div>
        { loading &&
          <CircularProgress size={80} thickness={5} />
        }
        { !loading && isWaiting &&
          <div>
            <p>
              This Report is blocked by a button click because this creates entropy for memegenerator and probalby lowers
              the count of requests that the sample User + your IP can submit.
            </p>
            <RaisedButton label={'Call API'} onClick={this.handleLoadImages} />
          </div>
        }
        { !loading && !isWaiting &&
          images.map(({ instanceImageUrl }, index) => {
            const { id, name } = this.props.users[index];
            return (
              <div key={id}>
                <h2>{name}</h2>
                <img src={instanceImageUrl} alt={`meme for ${name}`} />
              </div>);
          })
        }
      </div>);
  }
}

ReportThree.propTypes = {
  users: PropTypes.array,
};

export default ReportThree;
