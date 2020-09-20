import React, { useState } from 'react'
import Helmet from 'react-helmet'
import siteConfig from '../../data/SiteConfig'
import addToMailchimp from 'gatsby-plugin-mailchimp'

const ContactPage = () => {
  const [email, setEmail] = useState('');
  const [emailValid, setEmailValid] = useState(false)
  const [emailFocused, setEmailFocused] = useState(false)

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  const validateEmail = (email) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setEmailValid(true)
    } else {
      setEmailValid(false)
    }
  }

  const emailOnChange = ({ target: { value }}) => {
    defaultOnChange(value, setEmail)
    validateEmail(value)
  }

  const defaultOnChange = (value, setter) => {
    setter(value)
  }

  const handleSubmit = async (e) => {
    const result = await addToMailchimp(email)
  }

  const config = () => {
    return ({
      validEmail: 'text-xs text-green-500',
      invalidEmail: 'text-xs text-red-500'
    })
  }

  const inputStyle = 'h-8 rounded border p-1 my-1 focus:shadow-none focus:outline-none'

  const textStyle = {
    fontSize: '1rem',
    fontWeight: 200,
    fontFamily: 'Roboto'
  }
  const submitStyle = 'rounded py-2 px-4 bg-black text-white align-start'
  const noSubmitStyle = 'cursor-default rounded py-2 px-4 bg-black text-white align-start'
  return (
    <div className='flex flex-col p-4 rounded border'>
      <form onSubmit={handleSubmit} className='m-0'>

        <div className='flex flex-col'>
          <div className='flex flex-col mb-2'>
            <div className='flex flex-row content-center'>
              <label style={textStyle}> Email </label>
              <div className={'text-xs text-green-500 leading-loose'}> - Required</div>
            </div>
            <input style={textStyle} className={inputStyle} label='email' placeholder='youreawesome@example.com' value={email} onChange={emailOnChange} onBlur={() => setEmailFocused(true)}/>

            { emailFocused && email.length > 0
                ? <body style={{...textStyle, fontSize: '.75rem', lineHeight: '.75rem'}} className={ emailValid ? config().validEmail : config().invalidEmail }> { emailValid ? 'Email is valid!' : 'Email is invalid!' } </body>
                : <body style={{lineHeight: '.75rem'}}>&nbsp;</body>
            }
          </div>

          <div className='flex flex-col mb-5'>
            <label style={textStyle}> First Name </label>
            <input style={textStyle} className={inputStyle} label='firstName' value={firstName} onChange={({ target: { value }}) => defaultOnChange(value, setFirstName)}/>
          </div>

          <div className='flex flex-col mb-5'>
            <label style={{ fontSize: '1rem', fontWeight: 200, fontFamily: 'Roboto'}}> Last Name </label>
            <input style={textStyle} className={inputStyle} label='lastName' value={lastName} onChange={({ target: { value }}) => defaultOnChange(value, setLastName)}/>
          </div>


          <div className='flex flex-col align-center'>
            <button className={ !emailValid ? noSubmitStyle : submitStyle } style={{ fontFamily: 'Roboto', fontWeight: 300 }} type='submit' disabled={!emailValid}>Submit</button>
          </div>

        </div>
      </form>
    </div>
  )
}

export default ContactPage;
