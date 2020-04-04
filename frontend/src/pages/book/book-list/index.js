/* eslint-disable react/jsx-indent */
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
import { Table, Icon, Input, Button, message, Tag, Badge, Card, Typography, Descriptions } from 'antd'
import { Helmet } from 'react-helmet'
import configServer from "config.json"

const { Paragraph } = Typography
// import moment from 'moment'
// import Moment from 'react-moment'

// import table from './data.json'

// import styles from './style.module.scss'

class BookList extends React.Component {

  page_limit = 10
  
  state = {
    pagination: {}, 
    tableData: [],
    data: [],

    filterDropdownVisible: false,
    searchText: '',
    filtered: false,
    
    loading: false,

    expanded_data: []
  }
  
  componentDidMount() {
    // this.getCategories()
    this.getBookList(1)
  }

  getBookList = (page) => {

    let self = this;
    let url = ""

    url = "http://" + configServer.ip + ":" + configServer.port + "/api/exemplary/full?currentPage=" + page + "&pageSize=" + self.page_limit
    
    console.log(url)

    self.setState({ loading: true })

    fetch(url, {
      method: 'GET',
    }).then(function (response) {
      if (response.status >= 400) {
        self.setState({loading: false})
        console.log(response)
        message.error('Bad response from server')
        throw new Error("Bad response from server")
      }
      return response.json();
    }).then(function (data_loaded) {

      // let pagination = {current: page, next: data_loaded.links.next, previous: data_loaded.links.previous, total: data_loaded.count}

      let pagination = self.state.pagination
      
      pagination = {current: page, total: data_loaded.count}

      console.log("Success GET >>>>>")
      // console.log(data_loaded)
      
      self.setState({ data: data_loaded.results, tableData: data_loaded.results, loading: false, pagination })

    }).catch(function (err) {
      self.setState({ loading: false });
      console.log(err);
    });

  }


// onHandleTable = (pagination, filters, sorter)
onHandleTable = (pagination, filters) => {  
  const pag = this.state.pagination

  if (pagination.current !== pag.current) {
    this.getAuthorList(pagination.current)
  }
  
}

  onInputChange = e => {
    this.setState({ searchText: e.target.value })
  }

  onSearch = () => {

    let self = this
    let url = ""
    let strTitle = this.state.searchText

    this.setState({ loading: true })

    url = "http://" + configServer.ip + ":" + configServer.port + "/api/exemplary/title?currentPage=1&pageSize=" + self.page_limit

    let book = {
      "title": strTitle
    }

    fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(book)
      }).then(function (response) {
        if (response.status >= 400) {
          self.setState({ loading: false })
          message.error('Bad response from server')
          throw new Error("Bad response from server")
        }
        return response.json();
      }).then(function (data_loaded) {
      
        // let pagination = {current: page, next: data_loaded.links.next, previous: data_loaded.links.previous, total: data_loaded.count}
        let pagination = {current: 1, total: data_loaded.count}
        
        self.setState({ data: data_loaded.results, tableData: data_loaded.results, loading: false, pagination })


      }).catch(function (err) {
        self.setState({ loading: false })
        console.log(err)
      });
    



  }

  linkSearchInput = node => {
    this.searchInput = node
  }

  getExpandedContent = (row) => {

      let author = {}
      let str_authors = ""

      for (let i = 0; i < row.authors.length; i += 1) {
        author = JSON.parse(row.authors[i])
        if (author.first_name !== "") {
          str_authors += author.last_name + ', ' + author.first_name + (i < row.authors.length - 1 ? ' ; ' : '')
        }
      }

      return  (
              <div style={{ whiteSpace: "normal", wordWrap: "break-word" }}>
                <Card>
                  <Descriptions bordered column={1} size='middle'>
                    <Descriptions.Item key="subtitle" label={<strong>Subtitle or Plot</strong>}>{row.subtitle}</Descriptions.Item>
                    <Descriptions.Item key="authors" label={<strong>Author(s)</strong>}>{str_authors || '<Not registered>'}</Descriptions.Item>
                  </Descriptions>
                </Card>
              </div>
      )

  }

  editBook = (record) => {
    this.props.history.push({
      pathname: '/book-edit',
      data: record
    })
  }

  addAuthor = (record) => {
    this.props.history.push({
      pathname: '/book-link',
      data: record
    })
  }

  deleteBook = (record) => {
    
    const self = this
    const { form } = self.props

    const data = {"id": record.id}

    const url = "http://" + configServer.ip + ":" + configServer.port + "/api/book/rem"

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
      
      // console.log(dataLoaded)
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

  onExpand = () => {
    this.setState({ rows: 5 })
  }

  render() {
    const { data, searchText, filtered, filterDropdownVisible, pagination, genre_list, loading, is_genre_filtered, genre_filter_list} = this.state

    const columns = [

      {
        title: 'Id',
        dataIndex: 'id',
        key: 'id',
        width: '10%',
        height: "auto",
        render: text => (
          <a className="utils__link--underlined" href="">
            {`#${text}`}
          </a>
        ),
      },
      {
        title: 'Title',
        dataIndex: 'title',
        height: "auto",
        width: '35%',
        align: 'left',
        ellipsis: true,
        sorter: (a, b) => a.title.charCodeAt(0) - b.title.charCodeAt(0),
        filterDropdown: (
          <div className="custom-filter-dropdown">
            <Input
              ref={this.linkSearchInput}
              placeholder="Search by title"
              value={searchText}
              onChange={this.onInputChange}
              onPressEnter={this.onSearch}
            />
            <Button type="primary" onClick={this.onSearch}>
              Search
            </Button>
          </div>
        ),
        filterIcon: <Icon type="search" style={{ color: filtered ? '#108ee9' : '#aaa' }} />,
        filterDropdownVisible,
        onFilterDropdownVisibleChange: visible => {
          this.setState(
            {
              filterDropdownVisible: visible,
            },
            () => this.searchInput && this.searchInput.focus(),
          )
        },
        render: record => { return (record !== null) ? record : "-" }
      },
      {
        title: 'Category',
        dataIndex: 'category',
        // key: 'start_year',
        height: "auto",
        width: '30%',
        align: 'left',
        ellipsis: true,
        sorter: (a, b) => a.category.length - b.category.length,
        render: (record) => { if (record === null) {
          return (
            <Tag color="orange">
              Undefined
            </Tag>
          )
        } else {  
          return record.map((item, index) => {
            return (
              <Tag color="geekblue">
                { record[index] }
              </Tag>
            )
          })
        }
        }  

      },
      {
        title: 'Action',
        height: "auto",
        width: '25%',
        render: (record) => (
          <div>
            <Button icon="edit" className="mr-1" size="small" onClick={() => this.editBook(record)}>
              Edit
            </Button>
            <Button icon="cross" className="mr-1" size="small" onClick={() => this.deleteBook(record)}>
              Delete
            </Button>
            <Button icon="plus" className="mr-1" size="small" onClick={() => this.addAuthor(record)}>
              Add Author
            </Button>
          </div>
        ),
      }
  ]

    return (
      <div>
        <Helmet title="Book List" />
        <div className="card">
          <div className="card-header">
            <div className="utils__title">
              <strong>Books</strong>
            </div>
          </div>
          <div className="card-body">
            <div className="row">    
              <div className="col-lg-10">
                <Table
                  rowKey="id"
                  className="utils__scrollTable"
                  scroll={{ x: '100%' }}
                  columns={columns}
                  dataSource={data}
                  onChange={this.onHandleTable}
                  pagination={{ current: pagination.current, total: pagination.total }}
                  loading={loading}
                  expandedRowRender={(record) => this.getExpandedContent(record)}
                  rowExpandable
                  indentSize={10}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default BookList
