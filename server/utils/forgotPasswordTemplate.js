const forgotPasswordTemplate = ({ name, otp }) => {
  return `
    <div>
        <p>Hello ${name}</p>
        <p>You're requested a password reset. Please use following OTP code to reset your password</p>
        <div style="background:darkgreen; padding: 10px; font-size: 20px; text-align: center; border-radius: 10px; font-weight: 800; color: white; ">
            ${otp}
        </div>
        <p>
            This otp is valid for half hour only. Enter this otp in the Monte mebel website to proceed with resetting your password.
        </p>
        <p>Thank you</p>
        <p>Monte mebel</p>
    </div>
    `;
};


export default forgotPasswordTemplate;