import sendEmail from "../config/sendEmail.js";
import UserModel from "../models/user.model.js";
import forgotPasswordTemplate from "../utils/forgotPasswordTemplate.js";
import generatedAccessToken from "../utils/generateAccessToken.js";
import generatedRefreshToken from "../utils/generateRefreshToken.js";
import generatedOtp from "../utils/generatedOtp.js";
import uploadImageCloudinary from "../utils/uploadImageCloudinary.js";
import verifyEmailTemplate from "../utils/verifyEmailTemplate.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export async function registerUserController(request, response) {
  try {
    const { name, email, password } = request.body;

    if (!name || !email || !password) {
      return response.status(400).json({
        message: "provide email, name, password",
        error: true,
        success: false,
      });
    }

    const user = await UserModel.findOne({ email });

    if (user) {
      return response.status(400).json({
        message: "User already exists",
        error: true,
        success: false,
      });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const payload = {
      name,
      email,
      password: hashedPassword,
    };

    const newUser = await UserModel.create(payload);
    const save = await newUser.save();

    const VerifyEmailUrl = `${process.env.FRONT_END_URL}/verify-email/code=${save?._id}`;

    const verifyEmail = await sendEmail({
      sendTo: email,
      subject: "Verify email from MM",
      html: verifyEmailTemplate({
        name,
        url: VerifyEmailUrl,
      }),
    });
    return response.json({
      message: "User created successfully",
      error: false,
      success: true,
      data: save,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function verifyEmailController(request, response) {
  try {
    const { code } = request.body;

    const user = await UserModel.findById({ _id: code });

    if (!user) {
      return response.status(400).json({
        message: "User not found",
        error: true,
        success: false,
      });
    }
    const updateUser = await UserModel.updateOne(
      {
        _id: code,
      },
      {
        verify_email: true,
      }
    );

    return response.json({
      message: "User verified successfully",
      error: false,
      success: true,
      data: updateUser,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

//login controller
export async function loginController(request, response) {
  try {
    const { email, password } = request.body;

    if (!email || !password) {
      return response.status(400).json({
        message: "provide email, password",
        error: true,
        success: false,
      });
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return response.status(400).json({
        message: "User not found",
        error: true,
        success: false,
      });
    }

    if (user.status !== "Active") {
      return response.status(400).json({
        message: "User is inactive",
        error: true,
        success: false,
      });
    }

    const checkPassword = await bcryptjs.compare(password, user.password);

    if (!checkPassword) {
      return response.status(400).json({
        message: "Invalid password",
        error: true,
        success: false,
      });
    }

    const accessToken = await generatedAccessToken(user._id);
    const refreshToken = await generatedRefreshToken(user._id);

    const updateUser = await UserModel.findByIdAndUpdate(user?._id, {
      last_login_date: new Date(),
      
    });


    const cookiesOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };

    response.cookie("accessToken", accessToken, cookiesOption);
    response.cookie("refreshToken", refreshToken, cookiesOption);

    return response.json({
      message: "User logged in successfully",
      error: false,
      success: true,
      data: {
        accessToken,
        refreshToken,
        user,
      },
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

//logout controller
export async function logoutController(request, response) {
  try {
    const userid = request.userId;

    const cookiesOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };

    response.clearCookie("accessToken", cookiesOption);
    response.clearCookie("refreshToken", cookiesOption);

    const removeRefreshToken = await UserModel.findByIdAndUpdate(userid, {
      refresh_token: "",
    });

    return response.json({
      message: "User logged out successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

//upload user avatar
export async function uploadAvatar(request, response) {
  try {
    const image = request.file;
    const userId = request.userId;

    const upload = await uploadImageCloudinary(image);

    const updateUser = await UserModel.findByIdAndUpdate(userId, {
      avatar: upload.secure_url,
    });

    return response.json({
      message: "User avatar uploaded successfully",
      error: false,
      success: true,
      data: {
        _id: userId,
        avatar: upload.url,
      },
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

//update user details
export async function updateUserDetails(request, response) {
  try {
    const userId = request.userId;
    const { name, email, mobile, password } = request.body;

    let hashedPassword = "";

    if (password) {
      const salt = await bcryptjs.genSalt(10);
      hashedPassword = await bcryptjs.hash(password, salt);
    }

    const updateUser = await UserModel.updateOne(
      { _id: userId },
      {
        ...(name && { name }),
        ...(email && { email }),
        ...(mobile && { mobile }),
        ...(password && { hashedPassword }),
      }
    );

    return response.json({
      message: "Updated successfully",
      error: false,
      success: true,
      data: updateUser,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

//forgot password not login
export async function forgotPasswordController(request, response) {
  try {
    const { email } = request.body;

    const user = await UserModel.findOne({ email });

    if (!user) {
      return response.status(400).json({
        message: "User not found",
        error: true,
        success: false,
      });
    }

    const otp = generatedOtp();

    const expireTime = new Date() + 60 * 60 * 500; //1

    const update = await UserModel.findByIdAndUpdate(user._id, {
      forgot_password_otp: otp,
      forgot_password_otp_expire: new Date(expireTime).toISOString(),
    });

    await sendEmail({
      sendTo: email,
      subject: "Forgot password from Monte mebel",
      html: forgotPasswordTemplate({
        name: user.name,
        otp,
      }),
    });

    return response.json({
      message: "Check your email for otp",
      error: false,
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

//verify forgot password otp
export async function verifyForgotPasswordOtp(request, response) {
  try {
    const { email, otp } = request.body;

    if (!email || !otp) {
      return response.status(400).json({
        message: "provide email and otp",
        error: true,
        success: false,
      });
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return response.status(400).json({
        message: "User not found",
        error: true,
        success: false,
      });
    }

    const currentTime = new Date();

    if (user.forgot_password_expiry < currentTime.toISOString()) {
      return response.status(400).json({
        message: "Otp time expired",
        error: true,
        success: false,
      });
    }

    if (user.forgot_password_otp !== otp) {
      return response.status(400).json({
        message: "Invalid otp",
        error: true,
        success: false,
      });
    }

    //if otp is not expired
    //otp === user.forgot_password_otp

    const updateUser = await UserModel.updateOne(
      user._id ,
      {
        forgot_password_otp: null,
        forgot_password_expiry: null,
      }
    );


    return response.json({
      message: "Otp verified",
      error: false,
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

//reset the password
export async function resetPasswordOtp(request, response) {
  try {
    const { email, newPassword, confirmPassword } = request.body;

    if (!email || !newPassword || !confirmPassword) {
      return response.status(400).json({
        message: "provide email, newPassword and confirmPassword",
        error: true,
        success: false,
      });
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return response.status(400).json({
        message: "User not found",
        error: true,
        success: false,
      });
    }

    if (newPassword !== confirmPassword) {
      return response.status(400).json({
        message: "Password not match",
        error: true,
        success: false,
      });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(newPassword, salt);

    const update = await UserModel.findByIdAndUpdate(user._id, {
      password: hashedPassword,
      forgot_password_otp: null,
      forgot_password_expiry: null,
    });

    return response.json({
      message: "Password reset successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

//refresh token controller
export async function refreshToken(request, response) {
  try {
    const refreshToken =
      request.cookies.refreshToken ||
      request?.headers?.authorization?.split(" ")[1];

    if (!refreshToken) {
      return response.status(400).json({
        message: "Invalid refresh token",
        error: true,
        success: false,
      });
    }

    const verifyToken = await jwt.verify(
      refreshToken,
      process.env.SECRET_KEY_REFRESH_TOKEN
    );

    if (!verifyToken) {
      return response.status(401).json({
        message: "refresh token is expired",
        error: true,
        success: false,
      });
    }

    const userId = verifyToken?._id;

    const newAccessToken = await generatedAccessToken(userId);

    response.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });

    return response.json({
      message: "New Access token generated successfully",
      error: false,
      success: true,
      data: {
        accessToken: newAccessToken,
      },
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}


//get login user details 
export async function userDetails(request, response) {
  try {
    const userId = request.userId;

    const user = await UserModel.findById(userId).select(
      "-password -refresh_token "
    );

    return response.json({
      message: "User details fetched successfully",
      error: false,
      success: true,
      data: user,
    });
    
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}
