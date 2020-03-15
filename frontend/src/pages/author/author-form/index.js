import React from 'react'
import { Input, Button, Form } from 'antd'
import { Helmet } from 'react-helmet'

const FormItem = Form.Item

@Form.create()
class ProductEdit extends React.Component {

  state={
    add: false
  }

  onClickAdd = () => {
    this.setState({add: true})
  }

  onClickCancel = () => {
    this.setState({add: false})

    const { form } = this.props
    form.resetFields()
  }

  render() {
    const { form } = this.props
    const { add } = this.state

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
                        <FormItem label="First Name">
                          {form.getFieldDecorator('first_name')(<Input disabled={!add} placeholder="Author's first name" />)}
                        </FormItem>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-group">
                        <FormItem label="Last Name">
                          {form.getFieldDecorator('last_name')(<Input disabled={!add} placeholder="Author's last name" />)}
                        </FormItem>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-group">
                        <FormItem label="Birthplace">
                          {form.getFieldDecorator('birthplace')(<Input disabled={!add} placeholder="Author's birthplace" />)}
                        </FormItem>
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <div className="row">  
                        <div className="col-lg-12">
                          <div className="form-actions">
                            <Button type="primary" className="mr-2">
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

export default ProductEdit
