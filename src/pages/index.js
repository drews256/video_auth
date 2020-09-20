import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import AuthButton from "../components/AuthButton"
import UploadButton from "../components/UploadButton"
import ReactPlayer from "react-player"
import Image from "react-simple-image"
import { Socket } from 'phoenix-socket'
import fingerprint from '../../public/logos/Fingerprint.png'
import ContactPage from '../components/contact'

const IndexPage = () => {
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
      <div className={"flex py-10 pr-10 my-10"}>
        <h1 style={{fontWeight: 500, fontFamily: 'Kulim+Park'}}>
          <Link
            to="/"
            style={{
              color: 'black',
              textDecoration: `none`,
              fontFamilly: 'Kulim+Park'
            }}
          >
            quartz
          </Link>
        </h1>
      </div>

      <div className={"flex flex-col py-10 pr-10 my-10 content-between"}>
        <div className={"flex flex-row flex-1 w-full"}>
          <h1 className={"inline-block"} style={{ fontSize: '6rem', fontWeight: 400, fontFamily: 'Kulim+Park', margin: 0 }}>
            Authenticate your life
          </h1>
        </div>

        <div className={"flex flex-row flex-1 w-full"}>
          <h2 style={{ fontWeight: 300, fontFamily: 'Roboto'}}>
            Digital fingerprints for your digital life.
          </h2>
        </div>
        <div className={"flex flex-row flex-1 w-full"}>
          <h2 style={{ fontWeight: 300, fontFamily: 'Roboto'}}>
            Know who uploaded the video, photo, or files you're consuming on the internet.
          </h2>
        </div>
      </div>

      <div className={"flex flex-col mt-40 py-10 pr-10 my-10 content-between"}>
        <div className={"flex flex-row flex-1 w-full"}>
          <div className={"flex justify-center flex-2"}>
            <img width="400px" className={"mb-0 p-2"} src={fingerprint} />
          </div>
          <div className={"flex flex-1"}>
              &nbsp;
          </div>

          <div className={"flex flex-2 flex-row"}>
            <div className={"flex flex-col flex-1 justify-between"}>
              <h1 style={{ fontSize: '3rem', fontWeight: 400, fontFamily: 'Kulim+Park', margin: 0 }}>
                Leverage cryptography for good
              </h1>
              <div className={"self-end"}>
                <h2 className="inline" style={{ fontWeight: 300, fontFamily: 'Roboto'}}>
                  SHA3 is the newest
                </h2>
                <h2 className="inline" style={{ color: "#FFD700", fontWeight: 500, fontFamily: 'Roboto'}}>
                  &nbsp;gold&nbsp;
                </h2>
                <h2 className="inline" style={{ fontWeight: 300, fontFamily: 'Roboto'}}>
                  standard of cryptographic hash algorithms and we make it easy for you to use this standard to fingerprint your digital media.
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={"flex flex-col mt-40 py-10 pr-10 my-10 content-between"}>
        <div className={"flex flex-row flex-1 w-full"}>
          <div className={"flex flex-col flex-2 justify-between"}>

            <h1 style={{ fontSize: '3rem', fontWeight: 400, fontFamily: 'Kulim+Park', margin: 0 }}>
              Unique
            </h1>

            <div className={"self-end"}>
              <h2 className="inline" style={{ fontWeight: 300, fontFamily: 'Roboto'}}>
                This digital fingerprint uniquely identifies this file and we verify the uploading user using a variety of data sources.
              </h2>
            </div>

          </div>

          <div className={"flex flex-1"}>
            &nbsp;
          </div>

          <div className={"flex flex-2"}>
            <div className="rounded border">
              <ReactPlayer
                className={"max-w-xs m-2"}
                controls
                key={"bunny"}
                url={"http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4"}
                playing={false}
              />

              <div style={{ fontFamily: 'Roboto' }} className={"m-2"}>
                <div className="cursor-pointer"> &#x2713; Learn more about the user that uploaded this video. </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={"flex flex-col mt-40 py-10 pr-10 my-10 content-between"}>
        <div className={"flex flex-row flex-1 w-full"}>
          <div className={"flex flex-col flex-2 justify-between"}>
            <ContactPage />
          </div>

          <div className={"flex flex-1"}>
            &nbsp;
          </div>

          <div className={"flex flex-2 flex-col justify-between"}>
            <h1 style={{ fontSize: '3rem', fontWeight: 400, fontFamily: 'Kulim+Park', margin: 0 }}>
              Interested
            </h1>

            <div className={"self-end"}>
              <h2 className="inline" style={{ fontWeight: 300, fontFamily: 'Roboto'}}>
                Find out more about leveraging cryptography to let users know and trust the content they're consuming.
              </h2>
            </div>
          </div>
        </div>
      </div>

      <SEO title="Quartz" description="Authenticate your life" />
      <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}/>
    </Layout>
  )
}

export default IndexPage
