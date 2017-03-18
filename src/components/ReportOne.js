import React, { PropTypes } from 'react';

// Report one is super lame....
const ReportOne = ({ users }) => {
  /* eslint-disable no-param-reassign*/
  const charReport = users.reduce((accumlator, value) => {
    const letter = value.name.toLowerCase().charAt(0);
    if (!accumlator[letter]) {
      accumlator[letter] = 0;
    }
    accumlator[letter] +=1;
    return accumlator;
  }, {});
  /* eslint-enable no-param-reassign*/

  return (
    <div>{
      Object.keys(charReport)
        .map(character =>
          (<div key={character}>
            <h2>{character}</h2>
            <div>{charReport[character]}</div>
          </div>)
        )}
    </div>
  );
};

ReportOne.propTypes = {
  users: PropTypes.array,
};

export default ReportOne;
