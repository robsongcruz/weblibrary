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
import { Input, Button, Form, Tooltip, Tag, message } from 'antd'
import { Helmet } from 'react-helmet'
import { PlusOutlined } from '@ant-design/icons';

import configServer from "config.json"
import TextArea from 'antd/lib/input/TextArea'

const FormItem = Form.Item



@Form.create()
class BookEdit extends React.Component {
  state={
    add: false,
    save: false,
    record: this.props.location.data,
    insert: true,

    tags: [],
    inputVisible: false,
    inputValue: '',
  }

  componentDidMount() {
    const { record } = this.state
    
    if (record !== undefined) {
      const {form} = this.props

      const fields = this.props.location.data
      
      this.setState({ add: true, save: true, insert: false })

      form.setFieldsValue({ 
        "title": fields.title,
        "subtitle": fields.subtitle
      })
      this.setState({tags: fields.category})

    } else {
      this.setState({ add: false, save: false })
    }

  }


  onClickAdd = () => {
    this.setState({add: true})
  }

  onClickCancel = () => {
    this.setState({add: false, save: false, insert: true, record: undefined, tags: []})

    const { form } = this.props
    form.resetFields()
  }

  onValueChange = () => {
    const { form } = this.props

    const fields = form.getFieldsValue(['title', 'subtitle'])
    const {tags} = this.state

    if ((fields.title !== undefined) && (fields.title.length > 0) &&
          (fields.subtitle !== undefined) && (fields.subtitle.length > 0) &&
          (tags.length > 0)) {
            this.setState({save: true});
    } else {
      this.setState({save: false});
    }
  }

  onClickSave = () => {
    const {insert} = this.state
    if (insert) {
      this.insertNewBook()
    } else {
      this.updateBookData()
    }

  }

  insertNewBook = () => {

    const self = this
    const { form } = self.props

    const fields = form.getFieldsValue(['title', 'subtitle'])
    const {tags} = this.state

    const url = "http://" + configServer.ip + ":" + configServer.port + "/api/book/"

    const book = {"book": {
        "title": fields.title,
        "subtitle": fields.subtitle,
        "category": tags
      }
    }

    console.log(book)

    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(book)
    }).then(function (response) {
      if (response.status >= 400) {
        
        message.error('Bad response from server')
        throw new Error("Bad response from server")
      }
      return response.json();
    }).then(function (dataLoaded) {
      
      console.log(dataLoaded)
      message.success("Saved", self.onClickCancel)

    }).catch(function (err) {
      console.log("ERROR >>>>>")
      console.log(err)
    })


  }

  updateBookData = () => {

    const self = this
    const { form } = self.props
    const { record, tags } = self.state

    const fields = form.getFieldsValue(['title', 'subtitle'])
    
    const url = "http://" + configServer.ip + ":" + configServer.port + "/api/book/edit"

    const book = {"book": {
      "id": record.id,
      "title": fields.title,
      "subtitle": fields.subtitle,
      "category": tags
     }
    } 
    console.log(book)

    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(book)
    }).then(function (response) {
      if (response.status >= 400) {
        
        message.error('Bad response from server')
        throw new Error("Bad response from server")
      }
      return response.json();
    }).then(function (dataLoaded) {
      
      console.log(dataLoaded)
      message.success("Saved", self.onClickCancel)

    }).catch(function (err) {
      console.log("ERROR >>>>>")
      
      console.log(err)
    })


  }

  handleClose = removedTag => {
    const tags = this.state.tags.filter(tag => tag !== removedTag)
    console.log(tags)
    this.setState({ tags })
  }

  showInput = () => {
    const {add} = this.state
    if (add) {
      this.setState({ inputVisible: true }, () => this.input.focus())
    }
    
  }

  handleInputChange = e => {
    this.setState({ inputValue: e.target.value })
  }

  handleInputConfirm = () => {
    const { inputValue } = this.state
    let { tags } = this.state
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue]
    }
    console.log(tags)
    this.setState({
      tags,
      inputVisible: false,
      inputValue: '',
    }, () => this.onValueChange())

  }

  saveInputRef = (input) => {
    (this.input = input)
  }

  render() {
    const { form } = this.props
    const { add, save, tags, inputVisible, inputValue } = this.state

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
                
                <div className="col-lg-8">
                  <div className="row">

                    <div className="col-lg-8">
                      <div className="form-group">
                        <FormItem>
                          <Button type="primary" className="mr-2" disabled={add} onClick={this.onClickAdd}>
                              Add Book
                          </Button>
                        </FormItem>
                      </div>
                    </div>
                    
                    <div className="col-lg-8">
                      <div className="form-group">
                        <FormItem required onChange={this.onValueChange} label="Title">
                          {form.getFieldDecorator('title')(<Input disabled={!add} maxLength={100} placeholder="Book's title" />)}
                        </FormItem>
                      </div>
                    </div>
                    <div className="col-lg-10">
                      <div className="form-group">
                        <FormItem required onChange={this.onValueChange} label="Subtitle or Plot">
                          {form.getFieldDecorator('subtitle')(<TextArea rows={4} maxLength={600} disabled={!add} placeholder="Book's subtitle" />)}
                        </FormItem>
                      </div>
                    </div>
                    <div className="col-lg-8">
                      <div className="form-group">
                        {/* <FormItem required onChange={this.onValueChange} label="Category">
                          {form.getFieldDecorator('category')(<Input disabled={!add} placeholder="Book's categories" />)}
                        </FormItem> */}
                        <FormItem label="Category">
                          {tags.map((tag, index) => {
                            const isLongTag = tag.length > 20;
                            const tagElem = (
                              <Tag key={tag} closable={index >= 0} onClose={() => this.handleClose(tag)}>
                                {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                              </Tag>
                            );
                            return isLongTag ? (
                              <Tooltip title={tag} key={tag}>
                                {tagElem}
                              </Tooltip>
                            ) : (
                              tagElem
                            );
                          })}
                          {inputVisible && (
                            <Input
                              ref={this.saveInputRef}
                              type="text"
                              style={{ width: 78 }}
                              value={inputValue}
                              onChange={this.handleInputChange}
                              onBlur={this.handleInputConfirm}
                              onPressEnter={this.handleInputConfirm}
                              maxLength={20}
                            />
                          )}
                          {!inputVisible && (
                            <Tag className="site-tag-plus" onClick={this.showInput}>
                              + New Category
                            </Tag>
                          )}
                        </FormItem>
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
