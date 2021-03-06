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
import { Input, Button, Form, Tooltip, Tag, message, Icon, Upload, Modal } from 'antd'
import { Helmet } from 'react-helmet'
import { PlusOutlined, FileUnknownFilled } from '@ant-design/icons';

import configServer from "config.json"
import TextArea from 'antd/lib/input/TextArea'

const { Dragger } = Upload

const FormItem = Form.Item

@Form.create()
class BookEdit extends React.Component {
  maxsize_name = 24
  
  minsize_name = 6
  
  state={
    add: false,
    save: false,
    record: this.props.location.data,
    insert: true,

    tags: [],
    inputVisible: false,
    inputValue: '',

    upfile: [],

    previewVisible: false,
    previewImage: '',
    uploadButton: []
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
      
      const uploadButton = [this.addUploadButton()]
      this.setState({ uploadButton })

      console.log(fields)

      if ((fields.cover_file !== undefined) && (fields.cover_file !== '')) {

        const upfile = [{
           uid: fields.id,
           name: fields.title,
           status: 'done',
           url: "http://" + configServer.ip + ":" + configServer.port + "/static/img/" + fields.cover_file
        }]
        this.setState({ upfile })
        
      }
      // this.loadImage("http://" + configServer.ip + ":" + configServer.port + "/static/img/" + fields.cover_file)

    } else {
      this.setState({ add: false, save: false })
    }

  }

  getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = error => reject(error)
    })
  }


  onClickAdd = () => {
    this.setState({add: true})
  }

  onClickCancel = () => {
    const uploadButton = [this.addUploadButton()]
    this.setState({ uploadButton })

    this.setState({add: false, save: false, insert: true, record: undefined, tags: [], upfile: [], previewImage: ''})

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
    const {tags, upfile} = this.state

    const url = "http://" + configServer.ip + ":" + configServer.port + "/api/book/"

    let data = new FormData()

    if (upfile.length > 0) {
      data.append("cover", upfile[0])

      data.append("book", JSON.stringify({
        "title": fields.title,
        "subtitle": fields.subtitle,
        "category": tags,
        "cover_file": upfile[0].name
      }))
    } else {
        data.append("cover", null)

        data.append("book", JSON.stringify({
          "title": fields.title,
          "subtitle": fields.subtitle,
          "category": tags,
          "cover_file": null
        }))
    }
    
    fetch(url, {
      method: 'POST',
      // mode: "cors",
      // headers: { 'Content-Type': 'multipart/form-data'
      // },
      body: data
    }).then(function (response) {
      if (response.status >= 400) {
        
        message.error('Bad response from server')
        throw new Error("Bad response from server")
      }
      return response.json();
    }).then(function (dataLoaded) {
      
      message.success("Saved", self.onClickCancel)

    }).catch(function (err) {

      console.log(err)
    })


  }

  updateBookData = () => {

    const self = this
    const { form } = self.props
    const { record, tags, upfile } = self.state

    const fields = form.getFieldsValue(['title', 'subtitle'])
    
    const url = "http://" + configServer.ip + ":" + configServer.port + "/api/book/edit"

    let data = new FormData()
    //     data.append("enctype", "multipart/form-data")
        // data.append("cover", upfile)
    if (upfile.length > 0) {
          data.append("cover", upfile[0])
    
          data.append("book", JSON.stringify({
            "id": record.id,
            "title": fields.title,
            "subtitle": fields.subtitle,
            "category": tags,
            "cover_file": upfile[0].name
          }))
    } else {
            data.append("cover", null)
    
            data.append("book", JSON.stringify({
              "title": fields.title,
              "subtitle": fields.subtitle,
              "category": tags,
              "cover_file": null
            }))
    }

    fetch(url, {
      method: 'POST',
      // headers: { 'Content-Type': 'application/json' },
      body: data
    }).then(function (response) {
      if (response.status >= 400) {
        
        message.error('Bad response from server')
        throw new Error("Bad response from server")
      }
      return response.json();
    }).then(function (dataLoaded) {
      
      message.success("Saved", self.onClickCancel)

    }).catch(function (err) {
      
      console.log(err)
    })


  }

  handleClose = removedTag => {
    const tags = this.state.tags.filter(tag => tag !== removedTag)
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
    this.setState({
      tags,
      inputVisible: false,
      inputValue: '',
    }, () => this.onValueChange())

  }

  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await this.getBase64(file.originFileObj) 
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    })

  }

  handleChange = ({ file, fileList }) => {
    const type = file.type
    console.log(fileList)

    if ((type !== 'image/png') && (type !== 'image/jpg') && (type !== 'image/jpeg')) {
      message.error('Allowed only PNG and JPG files')
    } else if (file.name.length < this.minsize_name) {
      message.error('Size of the filename must be greater than ' + (this.minsize_name - 4))
    } else if (file.name.length > this.maxsize_name ) {
      message.error('Size of the filename must be up to ' + (this.maxsize_name - 4))
    } else {
      this.setState({ upfile: fileList })
    } 
    
  }

  saveInputRef = (input) => {
    (this.input = input)
  }

  addUploadButton = () => {
    const {upfile, add} = this.state

    if (upfile.length === 0) {

      return (
        <div>
          <PlusOutlined />
          <div>Upload</div>
        </div>)

    } else {
      return null
    }
    
  }

  render() {
    const { form } = this.props
    const { add, save, tags, inputVisible, inputValue, upfile, previewVisible, previewImage, uploadButton } = this.state
    
    const props = {
      onRemove: file => {
        this.setState(state => {
          const index = state.upfile.indexOf(file);
          const newFileList = state.upfile.slice();
          newFileList.splice(index, 1);
          return {
            upfile: newFileList,
          };
        });
      },
      beforeUpload: file => {
        this.setState(state => ({
          upfile: [...state.upfile, file],
        }));
        return false;
      },
      upfile,
    }

    return (
      <div>
        <Helmet title="Book Register Form" />
        <div className="card">
          <div className="card-header">
            <div className="utils__title">
              <strong>Book Info</strong>
            </div>
          </div>
          <div className="card-body">
            <Form layout="vertical">
              <div className="row">
                <div className="col-lg-6">
                  <div className="row">
                    
                    <div className="col-lg-6">
                      <div className="form-group">
                        <FormItem>
                          <Button type="primary" className="mr-2" disabled={add} onClick={this.onClickAdd}>
                              Add Book
                          </Button>
                        </FormItem>
                      </div>
                    </div>
                    
                    <div className="col-lg-12">
                      <div className="form-group">
                        <FormItem required onChange={this.onValueChange} label="Title">
                          {form.getFieldDecorator('title')(<Input disabled={!add} maxLength={100} placeholder="Book's title" />)}
                        </FormItem>
                      </div>
                    </div>

                    <div className="col-lg-12">
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
                        <FormItem required label="Category">
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
                      <div className="form-group">
                        <FormItem label="Book Cover">
                          <Upload
                            disabled={!add}
                            listType="picture-card"
                            fileList={upfile}
                            onPreview={this.handlePreview}
                            // onChange={this.handleChange}
                            {...props}
                          >
                            {this.addUploadButton()}
                          </Upload>
                          <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                            <img alt="Cover" style={{ width: '100%' }} src={previewImage} />
                          </Modal>
                        </FormItem>
                      </div>
                    </div>

                  </div>
                </div>
                
                <div className="col-lg-12">
                  <div className="row">  
                    <div className="col-12">
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

            </Form>
            

          </div>
        </div>
      </div>
    )
  }
}

export default BookEdit
