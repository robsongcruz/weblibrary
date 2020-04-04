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
import { Table, Icon, Input, Button, message, Tag, Badge, Card, Pagination, Tooltip, Modal, Spin, Empty } from 'antd'
import { EditOutlined, DeleteOutlined, SettingOutlined, UsergroupAddOutlined } from '@ant-design/icons'
import { Helmet } from 'react-helmet'
import configServer from "config.json"

import ProductCard from 'components/CleanUIComponents/ProductCard'
import { array } from 'prop-types'

const { Meta } = Card
const { Search } = Input
                                                                                                                                                                                                                                                   
class TitleList extends React.Component {

  page_limit = 10
  
  state = {
    books: [],
    bookcards: [],

    page_limit: 10,
    current_page: 0,
    total_page: 0,

    previewVisible: false,
    previewImage: '',
    loading: false
  }
  
  componentDidMount() {
    this.getBookList(1)
  }

  onClickEdit = (book) => {
    this.props.history.push({
      pathname: '/book-edit',
      data: book
    })
  }

  onClickDelete = (book) => {
    const self = this
    const { form } = self.props

    const data = {"id": book.id}

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
      message.success("Completed Action", self.handleDeleteBook(book.id))

    }).catch(function (err) {
      
      console.log(err)
    })
  }

  handleDeleteBook = id => {
    let { bookcards } = this.state

    bookcards = bookcards.filter(bookcard => bookcard.key !== "" + id)

    this.setState({ bookcards })
      
  }

  onClickAddAuthor = (book) => {
    this.props.history.push({
      pathname: '/book-link',
      data: book
    })
  }

  handleCancel = () => {
    this.setState({ previewVisible: false, previewImage: '' })
  }

  handleClick = (previewImage) => {
    
    this.setState({ previewVisible: true, previewImage })
  }

  emptyBookcard = () => {
    let { bookcards } = this.state
    
    const new_card = (
    <div className='col-2 d-inline-block text-truncate'>
      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Data not found" />
    </div>)
    
    bookcards.push(new_card)
    this.setState({ bookcards })
  }

  addBookcard = (book) => {
    let { bookcards, previewVisible } = this.state
    let author = {}
    let str_authors = ""

    for (let i = 0; i < book.authors.length; i += 1) {
      author = JSON.parse(book.authors[i])
      if (author.first_name !== "") {
        str_authors += author.last_name + ', ' + author.first_name + (i < book.authors.length - 1 ? ' ; ' : '')
      }
    }
  
    let new_card =
      <div key={book.id} className='col-2 d-inline-block text-truncate'>
        <Card
          hoverable
          // style={{ width: 200, height: 300 }}
          onClick={() => this.handleClick("http://" + configServer.ip + ":" + configServer.port + "/static/img/" + book.cover_file)}
          cover={
            <img
              alt={book.title}
              src={"http://" + configServer.ip + ":" + configServer.port + "/static/img/" + book.cover_file}
            />
          }
          actions={[
            <Tooltip placement="bottom" title="Edit Book Info"><EditOutlined key="edit" onClick={() => this.onClickEdit(book)} /></Tooltip>,
            <Tooltip placement="bottom" title="Add Author"><UsergroupAddOutlined key="add" onClick={() => this.onClickAddAuthor(book)} /></Tooltip>,
            <Tooltip placement="bottom" title="Delete Book"><DeleteOutlined key="delete" style={{color: 'red'}} onClick={() => this.onClickDelete(book)} /></Tooltip>,
          ]}
        >
          <Meta title={book.title} description={str_authors === "" ? " - " : str_authors} />
        </Card>
      </div>
    // description={this.addAuthorsTag(book.author)}
    bookcards.push(new_card)
    this.setState({ bookcards })
  }

  getBookList = (page) => {

    let self = this;
    let url = ""

    url = "http://" + configServer.ip + ":" + configServer.port + "/api/exemplary/full?currentPage=" + page + "&pageSize=" + self.page_limit

    self.setState({ loading: true })
    fetch(url, {
      method: 'GET',
    }).then(function (response) {
      if (response.status >= 400) {
        console.log(response)
        message.error('Bad response from server')
        self.setState({ loading: false })
        throw new Error("Bad response from server")
      }
      return response.json();
    }).then(function (data_loaded) {

      const books = data_loaded.results
      
      self.setState({ books, current_page: page, total:  data_loaded.count})

      if (books.length > 0) {
        self.setState({ bookcards: [] }, () => { 
          books.map((book_item) => self.addBookcard(book_item)) 
          self.setState({ loading: false })
        })  
      } else {
        self.setState({ bookcards: [] }, () => { 
          self.emptyBookcard()
          self.setState({ loading: false })
        })
      }
      
    }).catch(function (err) {
      self.setState({ loading: false })
      console.log(err);
    });

  }

  addAuthorsTag = (authors) => {
    let tags  = []

    for (let  i = 0; i < authors.length; i += 1) {
      
      const new_tag = <Tag key={"author" + authors[i].id}>
                        {authors[i].first_name + ' ' + authors[i].last_name}
                      </Tag>
      
      tags.push(new_tag)
    }
    
    return tags
  }

  onChangePage = (page, page_size) => {

    this.getBookList(page)

  }

  onSearchBooks = (info_str) => {

    let self = this
    let url = ""

    url = "http://" + configServer.ip + ":" + configServer.port + "/api/exemplary/title-author?currentPage=1&pageSize=" + self.page_limit

    self.setState({ loading: true })

    let book = {
      "info": info_str,
    }

    fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(book)
      }).then(function (response) {
        if (response.status >= 400) {
          message.error('Bad response from server')
          self.setState({ loading: false })
          throw new Error("Bad response from server")
        }
        return response.json();
      }).then(function (data_loaded) {
      
        const books = data_loaded.results

        const pagination = {current: 1, total: data_loaded.count}
      
        self.setState({ books, pagination})

        if (books.length > 0) {
          self.setState({ bookcards: [] }, () => { 
            books.map((book_item) => self.addBookcard(book_item)) 
            self.setState({ loading: false })
          })  
        } else {
          self.setState({ bookcards: [] }, () => { 
            self.emptyBookcard()
            self.setState({ loading: false })
          })
        }


      }).catch(function (err) {
        self.setState({ loading: false })
        console.log(err)
      });

  }

  render() {
    const { bookcards, current_page, total_page, page_limit, previewVisible, previewImage, loading } = this.state

    return (
      <div>
        <Helmet title="Book Catalog" />
        <div className="card">
          <div className="card-header">
            <div className="utils__title">
              <strong>Books</strong>
            </div>
          </div>

          <div className="card-body">
            <div className="row">
              <div className="col-lg-4">
                <div className="form-group">
                  <Search placeholder="Search by title or author..." onSearch={this.onSearchBooks} enterButton />
                </div>
              </div>
            </div><br />
            <Spin spinning={loading} delay={800}>
              <div className="col-lg-12">
                {bookcards}
              </div>
            </Spin>
            <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
              <img alt="Cover" style={{ width: '100%' }} src={previewImage} />
            </Modal>
          </div>

          <div className="col-lg-12">
            <div className="row">  
              <div className="col-lg-12">
                <div className="form-actions">
                 <Pagination current={current_page} pageSize={page_limit} total={total_page} hideOnSinglePage onChange={this.onChangePage}  />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    )
  }
}

export default TitleList
