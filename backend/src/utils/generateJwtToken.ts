import jwt from "jsonwebtoken";

function generateJwtToken(user: any) {
  return jwt.sign(
    {
      id: user._id,
    },
    `"sddsdds"`,
    { expiresIn: "1555555555555555555555555555555555555555555555555555h" }
  );
}

export default generateJwtToken;
