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
import config_server from "config.json"
// import moment from 'moment'
// import Moment from 'react-moment'

// import table from './data.json'

// import styles from './style.module.scss'

class TitleList extends React.Component {

  page_limit = 10
  
  state = {
    pagination: {}, 
    tableData: [],
    avg: [],
    votes: [],
    data: [],

    filterDropdownVisible: false,
    searchText: '',
    filtered: false,
    
    loading: false,
    previous_page: null,
    next_page: null,

    genre_list: [],
    genre_filter_list: [],
    is_genre_filtered: false,

    expanded_data: [],
  }
  
  componentDidMount() {
    // this.getCategories()
    this.getAuthorList(1)
  }

  getAuthorList = (page) => {

    let self = this;
    let url = ""

    // let search_by_year = this.state.searchText
    let search_by_year = ''
    if (search_by_year !== '') {
      url = "http://" + config_server.ip + ":" + config_server.port + "/api/titles/top/" + search_by_year + "/?page=" + page
    } else {
      // url = "http://" + config_server.ip + ":" + config_server.port + "/api/authors/all/?page=" + page
      url = "http://" + config_server.ip + ":" + config_server.port + "/api/author?currentPage=" + page + "&pageSize=" + self.page_limit
    }
    
    self.setState({ loading: true });

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

      console.log("Sucess GET >>>>>")
      console.log(data_loaded.results)
      
      self.setState({ data: data_loaded.results, tableData: data_loaded.results, loading: false, pagination })

    }).catch(function (err) {
      self.setState({ loading: false });
      console.log(err);
    });

  }


  getAuthorListFiltered = (page, filters) => {

    let self = this
    let genres = {}
    let fg = []
    let url = ""
    let search_by_year = this.state.searchText

    this.setState({ loading: true })

    if (search_by_year !== '') {
      url = "http://" + config_server.ip + ":" + config_server.port + "/api/titles/top/" + search_by_year + "/?page=" + page
      console.log("teste ano - " + url)
    } else {
      url = "http://" + config_server.ip + ":" + config_server.port + "/api/titles/top/?page=" + page
      console.log("teste sem ano - " + url)
    }

    genres = {"genres": { "data": filters  }}
    console.log(genres)

    fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(genres)
      }).then(function (response) {
        if (response.status >= 400) {
          self.setState({ loading: false })
          message.error('Bad response from server')
          throw new Error("Bad response from server")
        }
        return response.json();
      }).then(function (data_loaded) {
      
        // let pagination = {current: page, next: data_loaded.links.next, previous: data_loaded.links.previous, total: data_loaded.count}

        let pagination = self.state.pagination
        
        pagination = {current: page, total: data_loaded.count}

        // for (let i in data) {
        //   if (data[i].genres === null) {
        //     data[i].genres = ["Undefined"]
        //   }
        // }

        console.log("Sucess POST >>>>>")
        console.log(data_loaded.results)
        
        self.setState({ data: data_loaded.results, tableData: data_loaded.results, loading: false, pagination, is_genre_filtered: true })

      }).catch(function (err) {
        console.log("ERROR >>>>>")
        self.setState({ loading: false })
        console.log(err)
      });

  }


  getCategories = () => {

    let self = this
    const url = "http://" + config_server.ip + ":" + config_server.port + "/api/titles/genres/"
    let i
    let genres = []

    fetch(url, {
      method: 'GET',
    }).then(function (response) {
      if (response.status >= 400) {
        console.log(url)
        message.error('Bad response from server')
        throw new Error("Bad response from server")
      }
      return response.json();
    }).then(function (data_loaded) {

      for (i in data_loaded) {
        console.log(data_loaded[i])
        genres.push({ "text": data_loaded[i].genre, "value": data_loaded[i].genre })
      }

      self.setState({ genre_list: genres })

    }).catch(function (err) {
      
      console.log(err);
    });


  }

  // onHandleTable = (pagination, filters, sorter)
  onHandleTable = (pagination, filters) => {
    let filter_last = this.state.genre_filter_list.sort()
    let filter_current = []
    
    if ((filters.genres !== null) && (filters.genres !== undefined)) {
      filter_current = filters.genres.sort()
    }

    if ((filter_current.length === 0) && (filter_last.length > 0)) {
      console.log("Zerou filtro")
      this.setState({ genre_filter_list: [], is_genre_filtered: false })
      this.getAuthorList(1)
    } else if (JSON.stringify(filter_last) !== JSON.stringify(filter_current)) {
      console.log("Mudou o filtro")
      this.setState({ genre_filter_list: filter_current })
      this.getAuthorListFiltered(1, filter_current)
    } else if ((filter_current.length === 0) && (filter_last.length === 0)) {
      console.log("Mudou de Página sem filtro")
      this.getAuthorList(pagination.current)
    } else if (JSON.stringify(filter_last) === JSON.stringify(filter_current)) {
      console.log("Mudou de Página com filtro")
      this.getAuthorListFiltered(pagination.current, filter_current)
    }
    
  }

  onInputChange = e => {
    if ((/^\d+$/.test(e.target.value)) || (e.target.value === ""))
      this.setState({ searchText: e.target.value })
  }

  onSearch = () => {
    const is_genre_filtered = this.state.is_genre_filtered

    if (is_genre_filtered) {
      let filters = this.state.genre_filter_list
      console.log("Filtered")
      this.getAuthorListFiltered(1, filters)
    } else {
      console.log("No Filter")
      this.getAuthorList(1)
    }

  }

  linkSearchInput = node => {
    this.searchInput = node
  }

  get_expanded_content = (record) => {

    const columns = [
      {
        
        dataIndex: 'title',
      },
      {
        
        dataIndex: 'subtitle',
      },
    ]

    const data = []
    for (let i = 0; i < 3; i += 1) {
      data.push({
        key: i,
        title: record.first_name,
        subtitle: 'Subtitle testing ' + i
      })
    }

    return  <Table dataSource={data} columns={columns} pagination={false} showHeader={false} />
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
        sorter: (a, b) => a.title_id - b.title_id,
      },
      {
        title: 'First Name',
        dataIndex: 'first_name',
        // key: 'start_year',
        width: '25%',
        align: 'left',
        ellipsis: true,
        sorter: (a, b) => a.start_year - b.start_year,
        render: record => { return (record !== null) ? record : "-" }
      },
      {
        title: 'Last Name',
        dataIndex: 'last_name',
        // key: 'start_year',
        width: '35%',
        align: 'left',
        ellipsis: true,
        sorter: (a, b) => a.start_year - b.start_year,
        render: record => { return (record !== null) ? record : "-" }
      },
      {
        title: 'Birth Place',
        dataIndex: 'birth_place',
        // key: 'genre',
        width: '30%',
        ellipsis: true,  
      },
    
  ]

    return (
      <div>
        <Helmet title="Authors List" />
        <div className="card">
          <div className="card-header">
            <div className="utils__title">
              <strong>Authors List</strong>
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
              expandedRowRender={(record) => this.get_expanded_content(record)}
              rowExpandable
            />
          </div>
        </div>
      </div>
    )
  }
}

export default TitleList