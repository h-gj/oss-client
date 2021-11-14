import React, { Component } from 'react'
import DragAndDrop from '../components/DragAndDrop'
import axios from 'axios'
import baseUrl from '../config'
import bg from '../../src/home_cover.jpg'
import PasteUpload from '../components/PasteUpload'

class Home extends Component {
  constructor(props) {
    super(props);
    this.onUploaded = this.onUploaded.bind(this);
  }

state = {
    files: []
  }

  onUploaded = () => {
    console.log('after uploaded', this.props);
    // this.props.history.push('/filelist')
    this.props.history.push('/filelist')
    // axios.get(baseUrl).then(res => {
    //   console.log('res', res.data.files);
    //   this.setState({files: res.data.files})
    // })
  }
  
 handleDrop = (files) => {
    let fileList = this.state.files
    for (var i = 0; i < files.length; i++) {
      if (!files[i].name) return
    }
    this.setState({files: fileList});
    
  }
render() {
    return (
      <div style={{backgroundImage: `url(${bg})`}}>
      <PasteUpload />
        <DragAndDrop handleDrop={this.handleDrop} handleUploaded={this.onUploaded}>
        <div style={{height: "90vh", width: "100vw"}}>    
          <span style={{right: "50%", bottom: "50%", transform: "translate(50%,50%)", position: "absolute", fontSize: "50px", color: "white", fontFamily: "monospace"}}>
          Drap And Drop
          </span>
        </div>
      </DragAndDrop>
      </div>
    )
  }
}
export default Home
