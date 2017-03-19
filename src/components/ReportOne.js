import React, { PropTypes } from 'react';
import { Table, TableHeader, TableBody, TableRow, TableHeaderColumn, TableRowColumn } from 'material-ui';

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
    <div style={{ margin: '0px 20px' }}>
      <h1>Letter Count Report</h1>
      <p> A table of letters and counts of the contacts first letter of their first name</p>
      <Table selectable={false}>
        <TableHeader displaySelectAll={false}>
          <TableRow >
            <TableHeaderColumn>Letter</TableHeaderColumn>
            <TableHeaderColumn>Count</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>{
          Object.keys(charReport).map(character =>
            (<TableRow key={character}>
              <TableRowColumn>{character}</TableRowColumn>
              <TableRowColumn>{charReport[character]}</TableRowColumn>
            </TableRow>)
          )}
        </TableBody>
      </Table>
    </div>);
};

ReportOne.propTypes = {
  users: PropTypes.array,
};

export default ReportOne;
