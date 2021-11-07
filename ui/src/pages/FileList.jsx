import React, {Component} from 'react'
import axios from 'axios'
import FileItem from '../components/FileItem'
import baseUrl from '../config'
import {Pagination, Input} from 'antd'
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'

const {Search} = Input

class FileList extends Component {

  state = {
    files: [],
    defaultPage: 1,
    defaultPageSize: 50,
    pageContent: []
    // pageContent: [...this.state.files].slice(0, this.state.defaultPageSize)
  }
  handleSearch = (value, e) => {
    this.setState({
      pageContent: [...this.state.files].filter(
        item => item.indexOf(value) > -1
      )
    })
    console.log('value', value);
  }

  handlePageChange = (page, pageSize) => {
    console.log('page', pageSize);
    // this.props.history.push('/')
    const files = [...this.state.files]
    const slicedFiles = files.slice((page - 1) * pageSize, page * pageSize)
    console.log(page, pageSize, files, slicedFiles);
    this.setState({pageContent: slicedFiles})
  }

  getFilename = (filename) => {
    const seq = filename.split('/')
    return seq[seq.length - 1]
  }

  fetchFiles = () => {
    axios.get(baseUrl).then(res => {
      console.log('res', res.data.files);
      const files = res.data.files.filter(item => this.getFilename(item) !== '');
      const pageContent = [... files].slice(0, this.state.defaultPageSize);
      this.setState({files, pageContent})
    })
  }

  componentDidMount = () => {
    this.fetchFiles();
  }

  render() {
    return (
      <div>
      <Search
      style={{padding: "1vh 0 1vh 15vw", width: "40vw"}}
      placeholder="input search text"
      allowClear
      enterButton="Search"
      size="large"
      onSearch={this.handleSearch}
    />

        <div style={
          {
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            rowGap: "2vh",
            columnGap: "5vw",
            padding: "4vh 11vw",
            backgroundColor: "#eeeeee",
            // height: "90vh"
          }
        }>
          {/* <i className="icon icon-aex"></i> */}

          {
          this.state.pageContent.map((file) => <FileItem text={file}/>)
        } </div>

        <div className="page-container"
          style={
            {
              display: "flex",
              justifyContent: "center"
            }
        }>
          <Pagination showSizeChanger={false}
          style={{padding: "3vh 20vw"}}
            defaultCurrent={1}
            pageSize={
              this.state.defaultPageSize
            }
            //  style={{margin: "0 auto"}}
            total={
              this.state.files.length
            }
            onChange={
              this.handlePageChange
            }/>
        </div>

      </div>
    )
  }
}
export default FileList
