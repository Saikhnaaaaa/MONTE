const verifyEmailTemplate = ({ name, url }) => {
  return `
        <p>Hello ${name}</p>
        <p>Thank you for registering Monte Mebel</p>
        <a href=${url} style="color:black, background: orange, margin-top: 10px, padding: 20px, display: inline-block, text-decoration: none;">
            Verify Email
        </a>
    
    `;
};

export default verifyEmailTemplate;
