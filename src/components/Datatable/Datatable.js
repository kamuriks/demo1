import React, { Component } from "react";
import axios from "axios";
import "./Datatable.css";
import ReactTable from "react-table";
import "react-table/react-table.css";
import checkboxHOC from "react-table/lib/hoc/selectTable";

const CheckboxTable = checkboxHOC(ReactTable);

class Datatable extends Component {
  state = {
    users: [],
    posts: [],
    selection: []
  };

  componentDidMount() {
    axios.get("https://jsonplaceholder.typicode.com/posts").then(res => {
      this.setState({
        posts: res.data
      });
    });
    axios.get("https://jsonplaceholder.typicode.com/users").then(response => {
      this.setState({
        users: response.data
      });
    });
  }

  toggleSelection = (key, shift, row) => {
    let selection = [...this.state.selection];
    const keyIndex = selection.indexOf(key);

    if (keyIndex >= 0) {
      selection = [
        ...selection.slice(0, keyIndex),
        ...selection.slice(keyIndex + 1)
      ];
    } else {
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
      <div>
        <CheckboxTable
          ref={r => (this.checkboxTable = r)}
          keyField="id"
          className="-striped -highlight"
          key={this.state.users.id}
          columns={columns}
          showPagination={false}
          defaultPageSize={10}
          data={this.state.users}
          {...checkboxProps}
        />
      </div>
    );
  }
}

export default Datatable;
