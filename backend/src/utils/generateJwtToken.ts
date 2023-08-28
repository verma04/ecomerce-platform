import jwt from "jsonwebtoken";

function generateJwtToken(user: any) {
  return jwt.sign(
    {
      id: user.id,
    },
    `${process.env.ADMIN_JWT}`,
    { expiresIn: "1555555555555555555555555555555555555555555555555555h" }
  );
}

export default generateJwtToken;
