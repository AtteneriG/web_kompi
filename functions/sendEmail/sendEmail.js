// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
const handler = async(event) => {
  console.log("no va");

  try {
    const client = require("@sendgrid/mail");

    client.setApiKey(process.env.SENDGRID_API_KEY);

    const message = {
      to: "joseferalvarezromero@gmail.com",
      from: "buscokompi@gmail.com",
      subject: "Hola mamahuevo",
      text: "Hola mamahuevox2",
      // html: "<strong>and easy to do anywhere, even with Node.js</strong>",
    };
    client
      .send(message)
      .then((response) => {
        console.log(response[0].statusCode);
        console.log(response[0].handler);
      })
      .catch(error => {
        console.error(error);
      });
    return {
      statusCode: 200,
    };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};

module.exports = { handler };