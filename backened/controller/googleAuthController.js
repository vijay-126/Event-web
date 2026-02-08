import jwt from "jsonwebtoken";

const clientUrl = process.env.CLIENT_URL;
export const googleCallback = (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.redirect(`${clientUrl}/login?error=auth_failed`);
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // 👇 Send token in URL
    res.redirect(
      `${clientUrl}/google-success?token=${token}`
    );

  } catch (err) {
    console.error("Google callback error:", err);
    res.redirect(`${clientUrl}/login?error=server`);
  }
};


