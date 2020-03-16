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
import { Input, Button, Form, message } from 'antd'
import { Helmet } from 'react-helmet'

import configServer from "config.json"

const FormItem = Form.Item



@Form.create()
class AuthorEdit extends React.Component {

  state={
    add: false,
    save: false,
    record: this.props.location.data,
    insert: true
  }

  componentDidMount() {
    const { record } = this.state
    
    if (record !== undefined) {
      const {form} = this.props
      const fields = this.props.location.data
      
      this.setState({ add: true, save: true, insert: false })

      form.setFieldsValue({ 
        "first_name": fields.first_name,
        "last_name": fields.last_name,
        "birth_place": fields.birth_place
      })

    } else {
      this.setState({ add: false, save: false })
    }

  }


  onClickAdd = () => {
    this.setState({add: true})
  }

  onClickCancel = () => {
    this.setState({add: false, save: false, insert: true, record: undefined})

    const { form } = this.props
    form.resetFields()
  }

  onValueChange = () => {
    const { form } = this.props

    const fields = form.getFieldsValue(['first_name', 'last_name', 'birth_place'])

    if ((fields.first_name !== undefined) && (fields.first_name.length > 0) &&
          (fields.last_name !== undefined) && (fields.last_name.length > 0) &&
          (fields.birth_place !== undefined) && (fields.birth_place.length > 0)) {
            
            this.setState({save: true});
    } else {
      this.setState({save: false});
    }
  }

  onClickSave = () => {
    const {insert} = this.state
    if (insert) {
      this.insertNewAuthor()
    } else {
      this.updateAuthorData()
    }

  }

  insertNewAuthor = () => {

    const self = this
    const { form } = self.props

    const fields = form.getFieldsValue(['first_name', 'last_name', 'birth_place'])

    const url = "http://" + configServer.ip + ":" + configServer.port + "/api/author/"

    const author = {"author": fields}
    console.log(author)

    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(author)
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

  updateAuthorData = () => {

    const self = this
    const { form } = self.props
    const { record } = self.state

    const fields = form.getFieldsValue(['first_name', 'last_name', 'birth_place'])

    const url = "http://" + configServer.ip + ":" + configServer.port + "/api/author/edit"

    const author = {"author": {
        "id": record.id,
        "first_name": fields.first_name,
        "last_name": fields.last_name,
        "birth_place": fields.birth_place
      }
    }
    console.log(author)

    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(author)
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

  render() {
    const { form } = this.props
    const { add, save } = this.state

    return (
      <div>
        <Helmet title="Product Edit" />
        <div className="card">
          <div className="card-header">
            <div className="utils__title">
              <strong>Author Info</strong>
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
                              Add Author
                          </Button>
                        </FormItem>
                      </div>
                    </div>
                    
                    <div className="col-lg-6">
                      <div className="form-group">
                        <FormItem required onChange={this.onValueChange} label="First Name">
                          {form.getFieldDecorator('first_name')(<Input disabled={!add} maxLength={40} placeholder="Author's first name" />)}
                        </FormItem>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-group">
                        <FormItem required onChange={this.onValueChange} label="Last Name">
                          {form.getFieldDecorator('last_name')(<Input disabled={!add} maxLength={60} placeholder="Author's last name" />)}
                        </FormItem>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-group">
                        <FormItem required onChange={this.onValueChange} label="Birthplace">
                          {form.getFieldDecorator('birth_place')(<Input disabled={!add} maxLength={40} placeholder="Author's birthplace" />)}
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

export default AuthorEdit
