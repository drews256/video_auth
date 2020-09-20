import React from 'react'
import ReactS3Uploader from 'react-s3-uploader'
import postData from '../utils/postData'

const UploadButton = ({ user, getFiles, socket }) => {
 let channel = null

  const onSignedUrl = (params) => {
    channel = socket.channel(
      `fingerprint:${params.fileName}`
    )

    channel.join()
    .receive("ok", (msg) => console.log("ok", msg))
    .receive("error", ({reason}) => console.log("failed join", reason) )
    .receive("timeout", () => console.log("Networking issue. Still waiting..."))

    channel.on("fingerprint:finished", msg => getFiles() )
  }

  const onUploadProgress = (params) => {
    console.log(params)
  }

  const onUploadError = (params) => {
    console.log('upload error!')
    console.log(params)
  }

  const onUploadFinish = (params) => {
    channel.push("fingerprint",
      {
        fileName: params.fileName,
        displayName: params.displayName,
        user_id: user.id
      },
      600000
    )
  }

  return (
    <ReactS3Uploader
      signingUrl="/s3/sign"
      signingUrlMethod="GET"
      accept="*"
      uploadRequestHeaders={{}}
      onSignedUrl={onSignedUrl}
      scrubFilename={(filename) => filename.replace(/[^\w\d_\-.]+/ig, '')}
      server="http://localhost:4000"
      autoUpload={true}
      onProgress={onUploadProgress}
      onError={onUploadError}
      onFinish={onUploadFinish}
      >
      </ReactS3Uploader>
  )
}

export default UploadButton
