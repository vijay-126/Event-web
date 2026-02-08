import jwt from "jsonwebtoken";

export const googleCallback = (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.redirect("http://localhost:3000/login?error=auth_failed");
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // 👇 Send token in URL
    res.redirect(
      `http://localhost:3000/google-success?token=${token}`
    );

  } catch (err) {
    console.error("Google callback error:", err);
    res.redirect("http://localhost:3000/login?error=server");
  }
};


