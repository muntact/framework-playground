import React, { PropTypes } from 'react';
import { Table, TableHeader, TableBody, TableRow, TableHeaderColumn, TableRowColumn } from 'material-ui';
import { sortNamesAsc } from '../../lib/sortContacts';

const ReportOne = ({ users }) => {
  /* eslint-disable no-param-reassign*/
  const charReport = sortNamesAsc(users)
    .reduce((accumlator, { name }) => {
      const letter = name.toLowerCase().charAt(0);
      if (!accumlator[letter]) {
        accumlator[letter] = 0;
      }
      accumlator[letter] += 1;
      return accumlator;
    }, {});
  /* eslint-enable no-param-reassign*/

  return (
    <div>
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
