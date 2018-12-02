import React, { Component } from "react";
import axios from "axios";
import "./Datatable.css";
import ReactTable from "react-table";
import "react-table/react-table.css";

class Datatable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      users: []
    };
  }

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
        width: 40
      },
      {
        Header: "ID",
        accessor: "id"
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
        accessor: "company"
      },
      {
        Header: "Address",
        accessor: "address"
      }
    ];

    return (
      <ReactTable
        key={this.state.users.id}
        columns={columns}
        showPagination={false}
        defaultPageSize={10}
        data={this.state.users.map(userdata => {
          return { userdata };
        })}
      />
    );
  }
}

export default Datatable;
