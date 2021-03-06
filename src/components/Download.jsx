import ReactExport from '@prolaera/react-data-export-width';
import React from 'react';
import certificates from '../json/certificates.json';
import profile from '../json/profile.json';
import regulators from '../json/regulators.json';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelSheet;

//Header Info

const cycleYears = regulators[0].cycleYears;
const name = profile.first + ' ' + profile.last;
const regName = regulators[0].name;
const licenseNum = regulators[0].license_number;
const date = new Date(regulators[0].date);
const twoYearsPrior = new Date(date.getTime() - 31556952000 * cycleYears);

const cycleEnd = `${date.getMonth() +
  1}/${date.getDate()}/${date.getFullYear()}`;
const issueDate = cycleEnd;
const cycleStart = `${twoYearsPrior.getMonth() +
  1}/${twoYearsPrior.getDate()}/${twoYearsPrior.getFullYear()}`;
const reportingPeriod = `${cycleStart} - ${cycleEnd}`;
const cycleTotal = reportingPeriod;

const headerCols = [
  { title: '', width: { wpx: 200 } },
  { title: '', width: { wpx: 200 } },
  { title: '', width: { wpx: 200 } },
  { title: '', width: { wpx: 200 } },
  { title: '', width: { wpx: 200 } }
];
const headerRows = [];
headerRows.push([
  {
    value: regName,
    style: {
      font: { sz: '40', bold: true },
      alignment: { wrapText: true },
      fill: { patternType: 'none' }
    }
  },
  ' ',
  licenseNum,
  ' ',
  ' '
]);
headerRows.push([name, ' ', issueDate, ' ', ' ']);

//Table Body

const cols = ['DATE', 'TITLE', 'SPONSOR', 'DELIVERY METHOD', 'GENERAL'];

const dynamicColumns = [];
const keys = Object.keys(regulators[0].hour_categories);
keys.forEach(key => {
  if (key !== 'hours') {
    cols.push(key.replace('_', ' ').toUpperCase());
    dynamicColumns.push(key);
  }
});

//Give columns width
const newCols = cols.map(col => {
  return { title: col, width: { wpx: 200 } };
});

const exDate = certificates[0].date;
const exTitle = certificates[0].cert;
const exDelMeth = certificates[0].delivery;
const exSponsor = certificates[0].sponsor || certificates.sponsors.name;
const generalHours = regulators[0].hour_categories['hours'].cycle.actual;
const catHours = [];
dynamicColumns.forEach(cat => {
  catHours.push(regulators[0].hour_categories[cat].cycle.actual);
});

//Summary

const totalCreditsEarned = [];
const totalCreditsApplied = [];
const totalCPEReq = [];

//Create Excel Data

const rowOne = [
  [
    { value: exDate, style: { font: { sz: '24', bold: true } } },
    exTitle,
    exSponsor,
    exDelMeth,
    generalHours
  ]
];
catHours.forEach(cat => {
  rowOne[0].push(cat);
});

const rowDataSet = [
  {
    columns: headerCols,
    data: headerRows
  },
  {
    columns: newCols,
    data: rowOne
  }
];

console.log(headerCols);
console.log(headerRows);
console.log(newCols);
console.log(rowOne);

class Download extends React.Component {
  render() {
    return (
      <div>
        <div
          style={{ maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto' }}
        >
          <h1>JSON Object Parsing:</h1>
          <h6>Header Table:</h6>
          <ul>
            <li>Reg Name: {regName}</li>
            <li>Person Name: {name}</li>
            <li>License #: {licenseNum}</li>
            <li>Cycle End Date: {cycleEnd}</li>
            <li>Cycle Start: {cycleStart}</li>
            <li>Cycle Years: {cycleYears}</li>
            <li>Reporting Period: {reportingPeriod}</li>
            <li>Cycle Total: {cycleTotal}</li>
          </ul>
          <h6>Body Table:</h6>
          <ul>
            <li>Hour Categories: {cols.join(' ')}</li>
            <li>Example Date: {exDate}</li>
            <li>Example Title: {exTitle}</li>
            <li>Example Sponsor: {exSponsor}</li>
            <li>Example Delivery Method: {exDelMeth}</li>
            <li>Category Hours: {catHours}</li>
          </ul>
        </div>
        <ExcelFile>
          <ExcelSheet dataSet={rowDataSet} name="Compliance Report" />
        </ExcelFile>
      </div>
    );
  }
}

export default Download;
