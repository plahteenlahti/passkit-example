import { createPass, Pass } from "passkit-generator"

exports.handler = function (event, context, callback) {
  const response = JSON.parse(event)
  console.log(response)
  // your server-side functionality
}
