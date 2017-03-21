import React, { Component, PropTypes } from 'react';
import { CircularProgress, RaisedButton } from 'material-ui';

// https://api.imgflip.com/get_memes
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
    const memeGeneratorRoot = 'http://version1.api.memegenerator.net/';
    const urlEncodeWS = text => text.replace((new RegExp(' ', 'g'), '%20'));
    const fetchInstace = (instanceId, companyCatchPhrase) =>
      fetch(`${memeGeneratorRoot}/Instance_Create?username=test8&password=test8&languageCode=en&generatorID=${instanceId}&text1=${companyCatchPhrase}`);
    const toJSON = response => response.json();
    const handleAPIResponse = ({ success, result }, errorText) => {
      if (success) {
        return result;
      } else { // eslint-disable-line no-else-return
        throw new Error(errorText);
      }
    };

    this.setState({ loading: true });
    fetch(`${memeGeneratorRoot}/Generators_Select_ByPopular?pageIndex=0&pageSize=12&days=1`)
      .then(toJSON)
      .then(response => handleAPIResponse(response, 'Failed to get the generators'))
      .then(memes => memes.splice(0, this.props.users.length))
      .then(memes =>
         Promise.all(
          this.props.users.map(({ company }, index) =>
            fetchInstace(memes[index].generatorID, urlEncodeWS(company.catchPhrase))
              .then(toJSON))))
      .then(generatedMemes =>
          generatedMemes.map((generatedMeme, index) => handleAPIResponse(generatedMeme, `failed at index: ${index}`)))
      .then((generatedMemes) => { debugger; this.setState({ images: generatedMemes, result: 'success', loading: false }); })
      .catch(() => { this.setState({ result: 'failure', loading: false }); });
  }

  render() {
    const { images, loading, result } = this.state;
    const isWaiting = result === 'waiting';

    return (
      <div>
        { loading &&
          <CircularProgress size={80} thickness={5} />
        }
        {/* eslint-disable react/jsx-indent */}
        { !loading && isWaiting &&
          <div>
            <p>
              This Report is blocked by a button click because this creates entropy for memegenerator and probalby lowers
              the count of requests that the sample User + your IP can submit.
            </p>
            <RaisedButton label={'Call API'} onClick={this.handleLoadImages} />
          </div>
        }
        {/* eslint-enable react/jsx-indent */}
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
