import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import AuthButton from "../components/AuthButton"
import UploadButton from "../components/UploadButton"
import ReactPlayer from "react-player"
import FileViewer from "react-file-viewer"
import Image from "react-simple-image"
import { Socket } from 'phoenix-socket'
import fingerprint from '../../public/logos/Fingerprint.png'

const SecondPage = () => {
  let socket = null
  const joinSocketWithId = (user_id) => {
    socket = new Socket("ws://localhost:4000/socket", {params: {userToken: user_id}})
    socket.connect()
  }

  const [user, setUser] = React.useState({
    id: null,
    name: null
  });

  const [files, setFiles] = React.useState({
    files: []
  })
  const [initialLoad, setInitLoad] = React.useState({
    loaded: false
  })

  const getFilesForUser = () => {
    var url = new URL("http://localhost:4000/api/files"),
    params = { user_id: user.id }
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then(({ files }) => {
        setFiles({ files: files })
        setInitLoad({ loaded: true })
      });
  }

  const fileIsNotVideo = (file_name) => {
    const mpeg4extenstions = ['mp4', 'm4a', 'm4p', 'm4b', 'm4r', 'm4v']
    const file_extension = fileType(file_name)
    return mpeg4extenstions.includes(file_extension) ? false : true
  }

  const fileType = (file_name) => {
    const jpeg = ['jpg', 'jpeg']
    const extension = file_name.slice((file_name.lastIndexOf(".") - 1 >>> 0) + 2);
    if (jpeg.includes(extension)) { return "jpeg" }
    return extension
  }


  !initialLoad.loaded && user && user.id && getFilesForUser()
  user && user.id && joinSocketWithId(user.id)


  return (
  <Layout>
    <SEO title="Page two" />
    <h1>Hi from the second page</h1>
    <p>Welcome to page 2</p>
      { user.name && <p style={{fontFamily: 'Montserrat'}}> Welcome, { user.name } </p> }
      <p style={{fontFamily: 'Montserrat'}}>Authenticate video files with digital thumbprints</p>
      <AuthButton setUser={setUser} />
      { user && user.id && socket &&
        <UploadButton key={user.id} user={user} socket={socket} getFiles={getFilesForUser}/>
      }
      <div className="flex flex-wrap">
        { files && files.files && files.files.map((file, index) => (
            <div key={file.file_name} className={index+1 % 4 !== 0 ? "w-1/4 pr-5" : "w-1/4"}>
              <div className="my-5 max-h-500 justify-center items-center flex-shrink-0 relative overflow-hidden bg-gray-500 rounded-lg max-w-xs shadow-lg cursor-pointer">
                { (() => {switch (fileType(file.display_name)) {
                    case 'png':
                    case 'jpg':
                    case 'jpeg':
                      return <Image
                        className={"mb-0"}
                        alt="some image"
                        src={file.playable_url}
                        srcSet={[{key: '1x', value: file.playable_url }]}
                      />
                    case 'mp4':
                    case 'm4a':
                    case 'm4p':
                    case 'm4b':
                    case 'm4r':
                    case 'm4v':
                      return <ReactPlayer
                        className={"max-w-xs"}
                        controls
                        key={file.name}
                        url={file.playable_url}
                        playing={false}
                      />
                    default:
                      return <FileViewer
                        key={file.name}
                        fileType={fileType(file.display_name)}
                        filePath={file.playable_url}
                      />
                  }}
                  )()}
                  <div style={{background: `#51484F`}} className={"whitespace-no-wrap overflow-scroll rounded-t-none p-1 rounded text-white"}>
                    { file.display_name }
                  </div>
              </div>
            </div>
            ))
        }
      </div>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
  )
}

export default SecondPage
