/* eslint-disable radix */
/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-closing-tag-location */
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
import { Input, Button, Form, Tooltip, Tag, message, Table, Card, Descriptions, Typography } from 'antd'
import { Helmet } from 'react-helmet'

import configServer from "config.json"
import TextArea from 'antd/lib/input/TextArea'

const { Title } = Typography;

const { Search } = Input
const FormItem = Form.Item



@Form.create()
class BookEdit extends React.Component {
  state={
    save: false,
    record: this.props.location.data,
    book: {},
    found: [],
    data_to_insert: [],
    data_to_delete: [],
    original: [],
    selected: [],
    selected_tag: [],
    author_list: [],
    search_value: ''
  }

  componentDidMount() {
    const { record } = this.state
    let original = []
    let selected = []
    let selected_tag = []
    
    if (record !== undefined) {

      const book = {
        "id": record.id,
        "title": record.title,
        "subtitle": record.subtitle,
      }

      const authors = record.authors
      let author = {}
      for (let i = 0; i < authors.length; i += 1) {
        author = JSON.parse(authors[i])
        if (author.id !== "") {
          original.push(author)
        }
      }

      this.setState({ book, original }, () => {
        for (let i = 0; i < original.length; i += 1) {
          this.addSelectedAuthor({
            "id": original[i].id,
            "full_name": original[i].first_name + ' ' + original[i].last_name
          })
        }
      })

    }

  }

  onClickCancel = () => {
    this.setState({ 
      found: []
    })
  }

  onClickSave = () => {
    let self = this
    const {data_to_insert, data_to_delete, selected} = this.state

    if (data_to_insert.length > 0) {

      const url = "http://" + configServer.ip + ":" + configServer.port + "/api/exemplary/b/"

      fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({"data": data_to_insert})
      }).then(function (response) {
        if (response.status >= 400) {
          
          message.error('Bad response from server')
          throw new Error("Bad response from server")
        }
        return response.json();
      }).then(function (dataLoaded) {
        
        message.success("Saved data", self.onClickCancel)

      }).catch(function (err) {
        console.log(err)
      })

    }

    if (data_to_delete.length > 0) {

      const url_del = "http://" + configServer.ip + ":" + configServer.port + "/api/exemplary/rem/b"

      fetch(url_del, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({"data": data_to_delete})
      }).then(function (response) {
        if (response.status >= 400) {
          
          message.error('Bad response from server')
          throw new Error("Bad response from server")
        }
        return response.json();
      }).then(function (dataLoaded) {
          
        message.success("Saved data", self.onClickCancel)

      }).catch(function (err) {
        console.log(err)
      })

    }


  }

  addTableList = () => {
    const {found} = this.state
    const found_col = [
      {
        key: 'id',
        dataIndex: 'id',
      },
      {
        dataIndex: 'full_name',
      },
      {
        render: (record) => (
          <span>
            <Button icon='plus' shape="circle" onClick={() => this.addSelectedAuthor(record)} />
          </span>
        ),
      },
    ]

    let new_list = (
      <div className="col-lg-6">
        <div className="form-group">
          <Table rowKey='id' dataSource={found} columns={found_col} pagination={false} showHeader={false} />
        </div>
      </div>
    )
    console.log(new_list)
    this.setState({ author_list: new_list })
  }

  onSearchAuthor = (value) => {

    let self = this;
    let url = ""

    url = "http://" + configServer.ip + ":" + configServer.port + "/api/author/name/" + value

    self.setState({ loading: true });

    fetch(url, {
      method: 'GET',
    }).then(function (response) {
      if (response.status >= 400) {
        console.log(response)
        message.error('Bad response from server')
        throw new Error("Bad response from server")
      }
      return response.json();
    }).then(function (data_loaded) {
      
      self.setState({ found: data_loaded, search_value: '' }, () => {self.addTableList()})

    }).catch(function (err) {
      console.log(err);
    });

  }

  handleInputChange = e => {
    this.setState({ search_value: e.target.value })
  }

  addSelectedAuthor = (row)  => {

    let new_tag = <Tag key={"author" + row.id} closable onClose={() => this.handleCloseTag(row.id)}>
                        {row.full_name}
                     </Tag>
                     
    let { selected, selected_tag, data_to_insert } = this.state
    const {book, original} = this.state

    let repeated = selected.filter(author => author.id === row.id)

    if (repeated.length === 0) {
      selected_tag.push(new_tag)
      selected.push(row)

      if (original.filter(author => author.id === row.id).length === 0) {
        const exemplary = {
          "author": row.id,
          "book": book.id
        }
        data_to_insert.push(exemplary)
        this.setState({ data_to_insert, save: true })
      }

      this.setState({ selected_tag, selected, author_list: [] })
    } else {
      message.warning("Already selected")
    }
    
  }

  handleCloseTag = (id) => {
    
    let {selected, selected_tag, original, data_to_delete, book} = this.state
    
    selected = selected.filter(author => author.id !== id)
    selected_tag = selected_tag.filter(tag => tag.key !== "author" + id)

    if (original.filter(author => author.id === id).length > 0) {
      const exemplary = {
        "author": id,
        "book": book.id
      }
      data_to_delete.push(exemplary)
      this.setState({ data_to_delete, save: true })
    }

    this.setState({ selected, selected_tag })
    
  }

  render() {
    const { form } = this.props
    const { found, selected_tag, book, save, author_list, search_value } = this.state

    return (
      <div>
        <Helmet title="Product Edit" />
        <div className="card">
          <div className="card-header">
            <div className="utils__title">
              <strong>Book Info</strong>
            </div>
          </div>
          <div className="card-body">
            
            <Form layout="vertical">
              <div className="row">
                
                <div className="col-lg-12">
                  <div className="row">
                    
                    <div className="col-lg-6">
                      <div className="form-group">
                        <Descriptions bordered column={1} size='middle'>
                          <Descriptions.Item key="title" label="Title">{book.title}</Descriptions.Item>
                          <Descriptions.Item key="subtitle" label="Subtitle">{book.subtitle}</Descriptions.Item>
                          <Descriptions.Item key="authors" label="Authors">{selected_tag}</Descriptions.Item>
                        </Descriptions>
                      </div>
                    </div>
                      
                    <div className="col-lg-6">
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="form-group">
                            <Search placeholder="Search author to add..." onSearch={this.onSearchAuthor} onChange={this.handleInputChange} value={search_value} allowClear enterButton />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        {author_list}
                        {/* <div className="col-lg-6">
                          <div className="form-group">
                            <Table rowKey='id' dataSource={found} columns={found_col} pagination={false} showHeader={false} />
                          </div>
                        </div> */}
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <div className="row">  
                        <div className="col-lg-12">
                          <div className="form-actions">
                            <Button type="primary" disabled={!save} onClick={this.onClickSave} className="mr-2">
                              Save Info
                            </Button>
                            <Button type="default" onClick={this.onClickCancel}>Cancel</Button>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
                
              </div>
            </Form>
          </div>
        </div>
      </div>
    )
  }
}

export default BookEdit
