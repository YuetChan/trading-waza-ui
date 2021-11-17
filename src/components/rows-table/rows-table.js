import './rows-table.scss';

import { useTable } from 'react-table';

const RowsTable = ({columns, data}) => {
  const {
    getTableProps, 
    getTableBodyProps, 
    headerGroups, 
    rows, 
    prepareRow 
  } = useTable({columns, data});

  let tableBody = <tr><td colSpan={7}>No data matching the filter</td></tr>;
  
  if(rows.length === 0) {
    tableBody = <tr><td colSpan={7}>No data matching the filter</td></tr>;
  }else {
    tableBody = rows.map((row, i) => {
      prepareRow(row);
      return (
        <tr {...row.getRowProps()}>
          {row.cells.map(cell => {
            return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
          })}
        </tr>
      );
    });

  }

  return (
    <pre>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
                
        <tbody {...getTableBodyProps()}>   
          {tableBody}
        </tbody>
      </table>
    </pre>
  );
}

export default RowsTable;