import axios from 'axios'
import {useState, useRef} from 'react'
import baseUrl from '../config'
import IconComponent from './IconComponent'

const iconsAvailable = [
  "a-7z",
  "aep",
  "asp",
  "aet",
  "ai",
  "bak",
  "aex",
  "aac",
  "a-3gp",
  "bmp",
  "cpp",
  "avi",
  "aepx",
  "aspx",
  "csv",
  "cmd",
  "c",
  "bat",
  "div",
  "dll",
  "doc",
  "cs",
  "eps",
  "dbf",
  "css",
  "flv",
  "db",
  "dot",
  "h",
  "gif",
  "docx",
  "htm",
  "jpg",
  "exe",
  "jpeg",
  "json",
  "html",
  "jsp",
  "java",
  "m4v",
  "mkv",
  "js",
  "mdf",
  "mp3",
  "mp4",
  "mdb",
  "php",
  "mov",
  "lib",
  "png",
  "pptx",
  "psd",
  "ppt",
  "pdf",
  "rar",
  "mpeg",
  "raw",
  "rm",
  "xml",
  "wav",
  "txt",
  "tiff",
  "rtf",
  "py",
  "xd",
  "svg",
  "zip",
  "rmvb",
  "wdb",
  "xlsx",
  "wps",
  "wma",
  "tmp",
  "wmv",
  "vob",
  "xls"
]

const extensionsAllowedPreviewingFile = [
  'jpg',
  'png',
  'jpeg',
  'gif',
  'txt',
  'pdf',
]

export default function FileItem(props) {
  const [href, setHref] = useState('#');
  const aRef = useRef(null);

  function getFileExtension(filename) {
    const seq = filename.split('.')
    return seq[seq.length - 1]
  }

  function getFilename(filename) {
    const seq = filename.split('/')
    return seq[seq.length - 1]
  }

  function handleClick(filename) {
    console.log(66666);
    // e.preventDefault();
    axios.post(`${baseUrl}/sign`, {'filename': filename}).then(res => {
      if (extensionsAllowedPreviewingFile.indexOf(filename.split('.').pop() > -1)) { // aRef.current.click();
        setHref(res.data);
        window.open(res.data, '_blank')
        return;
      }
      axios({
        url: res.data, // your url
        method: 'GET',
        responseType: 'blob', // important
      }).then((response) => {
        console.log('responseresponseresponse', response);
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
      });
    })
  }
  return <span style={
    {
      width: "50px",
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }
  }>

    {
    iconsAvailable.indexOf(getFileExtension(props.text)) > -1 ? <IconComponent className='icon'
      style={
        {
          width: "4vw",
          height: "9vh"
        }
      }
      icon={
        `#icon-${
          getFileExtension(props.text)
        }`
      }/> : <IconComponent className='icon'
      style={
        {
          width: "4vw",
          height: "9vh"
        }
      }
      icon="#icon-weizhiwenjian"/>
    }

    <div style={
      {
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        width: "100px"
      }
    }>
      <a ref={aRef}
        href={href}
        style={
          {
            width: '10px',
            height: '10px'
          }
        }
        onClick={
          () => handleClick(props.text)
      }>

        {/* <FileIcon style={{width: '10px', height: '10px', maxWidth: '19%'}} extension={getFileExtension(props.text)} {...defaultStyles[getFileExtension(props.text)]} />; */}

        {
        getFilename(props.text)
      }</a>
    </div>
  </span>
}
