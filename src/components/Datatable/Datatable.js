import React, { Component } from "react";
import axios from "axios";
import "./Datatable.css";
import ReactTable from "react-table";
import "react-table/react-table.css";

class Datatable extends Component {
  state = {
    users: [],
    posts: []
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

  render() {
    const columns = [
      {
        id: "checkbox",
        accessor: "",
        Cell: ({ original }) => {
          return <input type="checkbox" />;
        },
        Header: x => {
          return <input type="checkbox" />;
        },
        sortable: false,
        width: 25
      },
      {
        Header: "ID",
        accessor: "id",
        width: 30
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
      <ReactTable
        key={this.state.users.id}
        columns={columns}
        showPagination={false}
        defaultPageSize={10}
        data={this.state.users}
      />
    );
  }
}

export default Datatable;
