import React from 'react'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import postData from '../utils/postData'

const AuthButton = ({setUser}) => {
  const responseFacebook = (response) => {
    response = postData('http://localhost:4000/user_data/facebook', response)
    response.then(body => {
      setUser( { name: body.name, id: body.user_id } )
    })
  }

  return (
    <FacebookLogin
      appId="626052264807681"
      callback={responseFacebook}
      render={renderProps => (
        <div onClick={renderProps.onClick} className="w-24 h-8 rounded bg-red-500 cursor-pointer flex items-center justify-center"> Facebook </div>
      )}
    />
  )
}
export default AuthButton
