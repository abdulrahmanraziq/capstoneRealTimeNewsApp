import userModal from "../models/user.js";
import auth from "../common/auth.js";
import nodemailer from 'nodemailer';


const signup = async (req, res) => {
  try {
    const { firstName, lastName, mail, mobile, password, role } = req.body;
    let user = await userModal.findOne({ mail });
    if (!user) {
      req.body.password = await auth.hashPassword(req.body.password);
      userModal.create(req.body);
      const user = await userModal.findOne(
        { mail: req.body.mail },
        { _id: 0, password: 0 }
      );
      res.status(201).send({
        message: "User created successfully",
        user,
      });
    } else {
      res.status(400).send({
        message: `User with ${mail} already exists`,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Internal Server Error",
      error,
    });
  }
};

const login = async (req, res) => {
  try {
    let user = await userModal.findOne({ mail: req.body.mail });

    if (user) {
      if (await auth.confirmPassword(req.body.password, user.password)) {
        let payload = {
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          mail: user.mail,
          role: user.role,
          createdAt: user.createdAt,
        };
        let token = await auth.createToken(payload);
        res.status(200).send({
          message: "Login Successfully",
          token,
          role: user.role,
          name:`${user.firstName}${user.lastName}`,
          email: user.mail
        });
      }
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Internal Server Error",
      error,
    });
  }
};

const forgotPassword = async (req, res) => {
  try {
    let user = await userModal.findOne({ mail: req.body.mail });

    if (user) {
      const generateOTP = () => {
        const char = "0123456789";
        return Array.from(
          { length: 6 },
          () => char[Math.floor(Math.random() * char.length)]
        ).join("");
      };

      const OTP = generateOTP();
      await userModal.updateOne(
        { mail: req.body.mail },
        {
          $set: {
            resetPasswordOtp: OTP,
            resetPasswordExpires: Date.now() + 3600000,
          },
        }
      );
      const transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        secure: true,
        port: 465,
        auth: {
          user: process.env.USER_MAIL,
          pass: process.env.PASS_MAIL,
        },
      });

      const mailOptions = {
        from: process.env.USER_EMAIL,
        to: user.mail,
        subject: "Password Reset",
        html: `<div>
                <p>Dear ${user.firstName} ${user.lastName}</p>
                <p>We received a request to reset your password. Here is your One Time Password (OTP):<strong>${OTP}</strong></p>
                <p>Thank You</p>
                <p>${user.firstName} ${user.lastName}</p>
              </div>`,
      };

      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: "Password Reset email Sent" });
    } else {
      res.status(400).send({
        message: "User does not exist",
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Internal Server Error",
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { OTP, password } = req.body;
    const user = await userModal.findOne({
      resetPasswordOtp: OTP,
      resetPasswordExpires: { $gt: Date.now() },
    });
    if (!user) {
      const message = user ? "OTP Expired" : "Invalid OTP";
      return res.status(404).send({ message });
    }

    const hashPassword = await auth.hashPassword(password);

    await userModal.updateOne(
      { resetPasswordOtp: OTP },
      {
        $set: {
          password: hashPassword,
          resetPasswordOtp: null,
          resetPasswordExpires: null,
        },
      }
    );
    res.status(200).send({
      message: "Password changed Successfully",
    });
  } catch (error) {
    res.status(500).send({
      message: error.message || "Internal Server Error",
    });
  }
};

export default {
  signup,
  login,
  forgotPassword,
  resetPassword,
};
