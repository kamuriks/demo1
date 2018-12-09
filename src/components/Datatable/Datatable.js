import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import checkboxHOC from "react-table/lib/hoc/selectTable";

const CheckboxTable = checkboxHOC(ReactTable);

class Datatable extends Component {
  state = {
    selection: []
  };

  toggleSelection = key => {
    let selection = [...this.state.selection];
    const keyIndex = selection.indexOf(key);
    const user = this.props.users[key - 1];

    if (keyIndex >= 0) {
      selection = [
        ...selection.slice(0, keyIndex),
        ...selection.slice(keyIndex + 1)
      ];
      this.props.removeMarkers(user.id);
      this.props.removePie(user.id);
    } else {
      this.props.addPie(user.name, user.id);
      this.props.addMarkers({ ...user.address.geo, userId: user.id });
      selection.push(key);
    }

    this.setState({ selection });
  };

  toggleAll = () => {
    const selectAll = this.state.selectAll ? false : true;

    const selection = [];

    if (selectAll) {
      const wrappedInstance = this.checkboxTable.getWrappedInstance();

      const currentRecords = wrappedInstance.getResolvedState().sortedData;

      currentRecords.forEach(item => {
        selection.push(item._original.id);
      });
      this.props.addAllMarkers();
      this.props.addAllPie();
    } else {
      this.props.removeAllMarkers();
      this.props.removeAllPie();
    }
    this.setState({ selectAll, selection });
  };

  isSelected = key => {
    return this.state.selection.includes(key);
  };

  render() {
    const { toggleSelection, toggleAll, isSelected } = this;
    const { selectAll } = this.state;

    const checkboxProps = {
      selectAll,
      isSelected,
      toggleSelection,
      toggleAll,
      selectType: "checkbox"
    };

    const columns = [
      {
        Header: "ID",
        accessor: "id",
        width: 40
      },
      {
        Header: "Username",
        accessor: "username"
      },
      {
        Header: "Name",
        accessor: "name"
      },
      {
        Header: "Email",
        accessor: "email"
      },
      {
        Header: "Phone",
        accessor: "phone"
      },
      {
        Header: "Website",
        accessor: "website"
      },
      {
        Header: "Company",
        accessor: "company",
        Cell: props => {
          return (
            <span>
              {" "}
              {props.row.company.bs} - {props.row.company.catchPhrase} -{" "}
              {props.row.company.name}{" "}
            </span>
          );
        }
      },
      {
        Header: "Address",
        accessor: "address",
        Cell: props => {
          return (
            <span>
              {props.row.address.city} - {props.row.address.street} -{" "}
              {props.row.address.suite} - {props.row.address.zipcode} -{" "}
              {props.row.address.geo.lat} - {props.row.address.geo.lng}
            </span>
          );
        }
      }
    ];

    return (
      <CheckboxTable
        ref={r => (this.checkboxTable = r)}
        keyField="id"
        className="-striped -highlight"
        key={this.props.users.id}
        columns={columns}
        showPagination={false}
        defaultPageSize={10}
        data={this.props.users}
        {...checkboxProps}
      />
    );
  }
}

export default Datatable;
