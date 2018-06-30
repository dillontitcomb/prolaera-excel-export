import React from 'react';
import ReactExport from 'react-data-export';
import certificates from '../json/certificates.json';
import profile from '../json/profile.json';
import regulators from '../json/regulators.json';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelSheet;
const ExcelColumn = ReactExport.ExcelColumn;

const multiDataSet = [
  {
    name: 'Johson',
    amount: 30000,
    sex: 'M',
    is_married: true
  },
  {
    name: 'Monika',
    amount: 355000,
    sex: 'F',
    is_married: false
  },
  {
    name: 'John',
    amount: 250000,
    sex: 'M',
    is_married: false
  },
  {
    name: 'Josef',
    amount: 450500,
    sex: 'M',
    is_married: true
  }
];

const exRegName = regulators;
const cert = certificates;
const prof = profile;

const name = profile.first + ' ' + profile.last;
const regName = regulators[0].name;
const licenseNum = regulators[0].license_number;
const date = new Date(regulators[0].date);
const cycleEnd = `${date.getMonth() +
  1}/${date.getDate()}/${date.getFullYear()}`;
const cycleStart = cycleEnd;
const cycleYears = regulators[0].cycleYears;

class Download extends React.Component {
  render() {
    return (
      <div>
        <div
          style={{ maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto' }}
        >
          <h1>JSON Object Parsing:</h1>
          <ol>
            <li>Reg Name: {regName}</li>
            <li>Person Name: {name}</li>
            <li>License #: {licenseNum}</li>
            <li>Cycle End Date: {cycleEnd}</li>
            <li>Cycle Years: {cycleYears}</li>
            <li>Reporting Period: {cycleStart}</li>
            <li />
          </ol>
        </div>
        <ExcelFile>
          <ExcelSheet data={multiDataSet} name="Placeholder">
            <ExcelColumn label="Name" value="name" />
            <ExcelColumn label="Wallet Money" value="amount" />
            <ExcelColumn label="Gender" value="sex" />
            <ExcelColumn
              label="Marital Status"
              value={col => (col.is_married ? 'Married' : 'Single')}
            />
          </ExcelSheet>
        </ExcelFile>
      </div>
    );
  }
}

export default Download;
