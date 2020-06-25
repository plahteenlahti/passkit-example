import { navigateTo } from "gatsby-link"
import React from "react"
import {
  GoogleReCaptcha,
  GoogleReCaptchaProvider,
} from "react-google-recaptcha-v3"
import Layout from "../components/layout"
import SEO from "../components/seo"

const RECAPTCHA_KEY = process.env.SITE_RECAPTCHA_KEY

function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&")
}

export default class Contact extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleRecaptcha = value => {
    this.setState({ "g-recaptcha-response": value })
  }

  handleSubmit = e => {
    e.preventDefault()
    const form = e.target
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": form.getAttribute("name"),
        ...this.state,
      }),
    })
      .then(() => navigateTo(form.getAttribute("action")))
      .catch(error => alert(error))
  }

  render() {
    return (
      <Layout>
        <SEO title="Page two" />
        <h1>Get Passkit Pass!</h1>
        <GoogleReCaptchaProvider
          reCaptchaKey={RECAPTCHA_KEY}
          useRecaptchaNet={true}
        >
          <form
            name="contact-recaptcha"
            method="post"
            action="/thanks/"
            data-netlify="true"
            netlify-honeypot="bot"
            data-netlify-recaptcha="true"
            onSubmit={this.handleSubmit}
          >
            <div hidden aria-hidden="true">
              <label>
                Don’t fill this out if you're human:
                <input name="bot-field" />
              </label>
            </div>
            <noscript>
              <p>This form won’t work with Javascript disabled</p>
            </noscript>
            <p>
              <label>
                Your name:
                <br />
                <input type="text" name="name" onChange={this.handleChange} />
              </label>
            </p>
            <p>
              <label>
                Your email:
                <br />
                <input type="email" name="email" onChange={this.handleChange} />
              </label>
            </p>
            <p>
              <label>
                Message:
                <br />
                <textarea name="message" onChange={this.handleChange} />
              </label>
            </p>
            <GoogleReCaptcha onVerify={this.handleRecaptcha} />

            <p>
              <button type="submit">Send</button>
            </p>
          </form>
        </GoogleReCaptchaProvider>
      </Layout>
    )
  }
}
