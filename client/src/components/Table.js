import React from "react";
import PropTypes from "prop-types";
import { useHistory } from 'react-router-dom';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
// core components
import styles from "./../styles/tableStyle";

const useStyles = makeStyles(styles);

function changePointer(e) {
  e.target.style.cursor = "pointer";
}

function obtenerDatos(tabla) {
  let array = [];
  for (let row of tabla) {
    let rowArray = [];
    for (let i = 0; i < 4; i++) {
      rowArray.push(row[i]);
    }
    array.push(rowArray);
  }
  return array;
}

export default function CustomTable(props) {
  const classes = useStyles();
  let history = useHistory();
  const _Registro = (e) => { 
    history.push(`/${tableType}/?id=${e.target.id}`);
    window.location.reload();
  }
  const { tableHead, tableHeaderColor, tableType } = props;
  const tableData = obtenerDatos(props.tableData);
  const ids = props.tableData.map(x => x[4]);
  let c = -1;
  return (
    <div className={classes.tableResponsive}>
      <Table className={classes.table}>
        {tableHead !== undefined ? (
          <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
            <TableRow className={classes.tableHeadRow}>
              {tableHead.map((prop, key) => {
                return (
                  <TableCell
                    className={classes.tableCell + " " + classes.tableHeadCell}
                    key={key}>
                    {prop}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
        ) : null}
        <TableBody>
          {tableData.map((prop, key) => {
            c++
            return (
              <TableRow key={key} className={classes.tableBodyRow} hover onMouseOver={changePointer} onClick={_Registro}>
                {prop.map((prop, key) => {
                  return (
                    <TableCell className={classes.tableCell} key={key} id={ids[c]}>
                      {prop}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

CustomTable.defaultProps = {
  tableHeaderColor: "gray"
};

CustomTable.propTypes = {
  tableHeaderColor: PropTypes.oneOf([
    "warning",
    "primary",
    "danger",
    "success",
    "info",
    "rose",
    "gray"
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.string),
  tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))
};
