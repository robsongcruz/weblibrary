/* eslint-disable object-shorthand */
/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-else-return */
/* eslint-disable prefer-template */
/* eslint-disable dot-notation */
/* eslint-disable func-names */
/* eslint-disable prefer-const */
/* eslint-disable prefer-destructuring */
/* eslint-disable camelcase */

import React from 'react'
import { Table, Icon, Input, Button, message, Tag, Badge } from 'antd'
import { Helmet } from 'react-helmet'
import configServer from "config.json"
// import moment from 'moment'
// import Moment from 'react-moment'

// import table from './data.json'

// import styles from './style.module.scss'

class TitleList extends React.Component {

  page_limit = 10
  
  state = {
    pagination: {}, 
    tableData: [],
    data: [],

    filterDropdownVisible: false,
    searchText: '',
    filtered: false,
    
    loading: false,
  }
  
  componentDidMount() {
    this.getAuthorList(1)
  }

  getAuthorList = (page) => {

    let self = this;
    let url = ""
    
    url = "http://" + configServer.ip + ":" + configServer.port + "/api/exemplary?currentPage=" + page + "&pageSize=" + self.page_limit
    
    self.setState({ loading: true });

    fetch(url, {
      method: 'GET',
    }).then(function (response) {
      if (response.status >= 400) {
        self.setState({loading: false})
        message.error('Bad response from server')
        throw new Error("Bad response from server")
      }
      return response.json();
    }).then(function (data_loaded) {

      // let pagination = {current: page, next: data_loaded.links.next, previous: data_loaded.links.previous, total: data_loaded.count}

      let pagination = self.state.pagination
      
      pagination = {current: page, total: data_loaded.count}
      
      self.setState({ data: data_loaded.results, tableData: data_loaded.results, loading: false, pagination })

    }).catch(function (err) {
      self.setState({ loading: false });
      console.log(err);
    });

  }

  edit_author = (record) => {
    this.props.history.push({
      pathname: '/author-edit',
      data: record
    })
  }

  delete_author = (record) => {
    
    const self = this
    const { form } = self.props

    const data = {"id": record.id}

    const url = "http://" + configServer.ip + ":" + configServer.port + "/api/author/rem"

    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(function (response) {
      if (response.status >= 400) {
        
        message.error('Bad response from server')
        throw new Error("Bad response from server")
      }
      return response.json();
    }).then(function (dataLoaded) {
    
      message.success("Completed Action", self.handleDeleteRow(record.id))

    }).catch(function (err) {
      
      self.setState({ loading: false })
      console.log(err)
    })
    
  }

  handleDeleteRow = id => {
    const {data} = this.state;
    this.setState({ data: data.filter(item => item.id !== id) })
  }

  // onHandleTable = (pagination, filters, sorter)
  onHandleTable = (pagination, filters) => {  
    const pag = this.state.pagination

    if (pagination.current !== pag.current) {
      this.getAuthorList(pagination.current)
    }
    
  }


  render() {
    const { data, searchText, filtered, filterDropdownVisible, pagination, genre_list, loading, is_genre_filtered, genre_filter_list} = this.state

    const columns = [

      {
        title: 'Id',
        dataIndex: 'id',
        key: 'id',
        width: '10%',
        render: text => (
          <a className="utils__link--underlined" href="">
            {`#${text}`}
          </a>
        ),
        sorter: (a, b) => a.id - b.id,
      },
      {
        title: 'First Name',
        dataIndex: 'first_name',
        // key: 'start_year',
        width: '20%',
        align: 'left',
        ellipsis: true,
        sorter: (a, b) => a.first_name.charCodeAt(0) - b.first_name.charCodeAt(0),
        render: record => { return (record !== null) ? record : "-" }
      },
      {
        title: 'Last Name',
        dataIndex: 'last_name',
        // key: 'start_year',
        width: '30%',
        align: 'left',
        ellipsis: true,
        sorter: (a, b) => a.last_name.charCodeAt(0) - b.last_name.charCodeAt(0),
        render: record => { return (record !== null) ? record : "-" }
      },
      {
        title: 'Birth Place',
        dataIndex: 'birth_place',
        // key: 'genre',
        width: '25%',
        ellipsis: true,  
      },
      {
        title: 'Action',
        width: '15%',
        render: (record) => (
          <span>
            <Button icon="edit" className="mr-1" size="small" onClick={() => this.edit_author(record)}>
              Edit
            </Button>
            <Button icon="cross" className="mr-1" size="small" onClick={() => this.delete_author(record)}>
              Delete
            </Button>
          </span>
        ),
      },

    
  ]

    return (
      <div>
        <Helmet title="Author List" />
        <div className="card">
          <div className="card-header">
            <div className="utils__title">
              <strong>Authors</strong>
            </div>
          </div>
          <div className="card-body">
            <Table
              rowKey="id"
              className="utils__scrollTable"
              scroll={{ x: '100%' }}
              columns={columns}
              dataSource={data}
              onChange={this.onHandleTable}
              pagination={{ current: pagination.current, total: pagination.total }}
              loading={loading}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default TitleList
