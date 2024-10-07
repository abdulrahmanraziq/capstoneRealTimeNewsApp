import formData from "form-data";
import Mailgun from "mailgun.js";
import subscriptionModal from "../models/subscription.js";
import newsModal from "../models/news.js";
const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_API_KEY,
});

const sendEmail = async (req, res) => {
  const { email, topic, subscribed } = req.body;
  try {
    if (subscribed) {
      await subscriptionModal.create(req.body);
      mg.messages
        .create("sandbox538f1034a5454970aee811ecece1e811.mailgun.org", {
          from: process.env.USER_MAIL,
          to: email,
          subject: "Thank You for Subscribing to News Break!",
          text: "You will now receive the top stories from your local area each morning in your inbox. We select the best stories so you can stay informed on what's happening near you, including events happening in your area, and other local updates to keep you in the know.",
          html: `
        <h1 style="font-family: Arial, sans-serif; color: #333333;">Thank You for Subscribing to News Break!</h1>
        <h5 style="font-family: Arial, sans-serif; color: #333333;">You have Subscribe to the topic ${topic}</h5>
        <p style="font-family: Arial, sans-serif; color: #555555; font-size: 16px; line-height: 1.5;">
          You will now receive the top stories from your local area each morning in your inbox. We select the best stories so you can stay informed on <br>what's happening near you, including events happening in your area, and other local updates to keep you in the know.
        </p>
      `,
        })
        .then((msg) =>
          res.status(200).json({ message: "Email sent!", details: msg })
        )
        .catch((err) =>
          res.status(500).json({ error: "Error sending email", details: err })
        );
    } else {
      await subscriptionModal.updateOne(
        { email, topic },
        { $set: { subscribed } }
      );
      mg.messages
        .create("sandbox538f1034a5454970aee811ecece1e811.mailgun.org", {
          from: process.env.USER_MAIL,
          to: email,
          subject: "Thank You for UnSubscribing to News Break!",
          text: "You will not receive the top stories from News Break!",
          html: `
        <h1 style="font-family: Arial, sans-serif; color: #333333;">Thank You for UnSubscribing to News Break!</h1>
        <h5 style="font-family: Arial, sans-serif; color: #333333;">You have UnSubscribe to the topic ${topic}</h5>
        <p style="font-family: Arial, sans-serif; color: #555555; font-size: 16px; line-height: 1.5;">
          You will not receive the top stories from News Break!
        </p>
      `,
        })
        .then((msg) =>
          res.status(200).json({ message: "Email sent!", details: msg })
        )
        .catch((err) =>
          res.status(500).json({ error: "Error sending email", details: err })
        );
    }
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
      error,
    });
  }
};

const subscriptionMail = async (req, res) => {
  try {
    const { payload } = req.body;

    const subscriptionUsers = await subscriptionModal.find();

    const newsSubscriptions = await newsModal.findOne({ title: payload.title });
    const imageUrl =
      payload.image ||
      "https://via.placeholder.com/600x400.png?text=No+Image+Available";
    
    let emailSent = false;
    for (let subscription of subscriptionUsers) {
      if (
        subscription &&
        payload.topic.toLowerCase() === subscription.topic.toLowerCase() &&
        subscription.subscribed
      ) {
        await mg.messages.create(
          "sandbox538f1034a5454970aee811ecece1e811.mailgun.org",
          {
            from: process.env.USER_MAIL,
            to: subscription.email,
            subject: payload.title,
            text: payload.description,
            html: `
              <h1 style="font-family: Arial, sans-serif; color: #333333;">${
                payload.title
              }</h1>
              <img src="${imageUrl}"  title="${
              payload.title
            }" alt="news image" style="max-width: 100%; height: auto;" />
              <p style="font-family: Arial, sans-serif; color: #555555; font-size: 16px; line-height: 1.5;">
                ${payload.description.split(" ").slice(0, 20).join(" ")}...
              </p>
              <a href="http://localhost:5173/${payload.topic}/${
              newsSubscriptions._id
            }"  style="background-color: #f00; color: #fff; padding: 3px; text-decoration: none; border:1px solid #f00; border-radius: 5px;">
                Click Here to View News
              </a>
            `,
          }
        );

        await subscriptionModal.findByIdAndUpdate(
          subscription._id,
          { $inc: { count: 1 } },
          { new: true }
        );

        emailSent = true;
      }
    }
    if (emailSent) {
      return res.status(200).send({ message: "Email sent successfully!" });
    } else {
      return res
        .status(400)
        .send({ message: "Subscription not found or unsubscribed." });
    }
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
      error,
    });
  }
};


const getMailCount = async(req, res) => {
  let {email} = req.params;
  try {
    const topicCount = await subscriptionModal.find({email:email});
    res.status(200).send({
      message:'Get Mail Count',
      topicCount
    })
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
      error,
    });
  }
}

export default {
  sendEmail,
  subscriptionMail,
  getMailCount
};
