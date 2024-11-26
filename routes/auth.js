const express = require("express");
const router = express.Router();
const Login = require("../models/auth");
router.post("/register", async (req, res) => {
  const { fullName, email, password, confirmPassword } = req.body;

  // Kiểm tra dữ liệu đầu vào
  if (!fullName || !email || !password || !confirmPassword) {
    return res.status(400).json({ message: "Thiếu thông tin cần thiết" });
  }

  // Kiểm tra nếu mật khẩu và xác nhận mật khẩu khớp nhau
  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Mật khẩu không khớp" });
  }

  try {
    const existingUser = await Login.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email đã tồn tại" });
    }
    const newUser = new Login({ fullName, email, password });

    // Lưu người dùng vào cơ sở dữ liệu
    await newUser.save();

    return res.status(201).json({ message: "Đăng ký thành công" });
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .json({ message: "Đã xảy ra lỗi khi đăng ký", error });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Tìm người dùng theo email
    const user = await Login.findOne({ email });

    // Kiểm tra nếu người dùng không tồn tại hoặc mật khẩu không đúng
    if (!user || user.password !== password) {
      return res
        .status(400)
        .json({ message: "Email hoặc mật khẩu không đúng." });
    }

    // Nếu đăng nhập thành công, trả về thông tin người dùng
    return res.json({ message: "Đăng nhập thành công", user });
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .json({ message: "Đã xảy ra lỗi khi đăng nhập", error });
  }
});

router.get("/login", async (req, res) => {
  try {
    const users = await Login.find();
    return res.json(users);
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .json({ message: "Đã xảy ra lỗi khi lấy người dùng", error });
  }
});

router.get("/login", async (req, res) => {
  try {
    const user = await Login.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "Không tìm thấy người dùng" });
    }
    return res.json(user);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Đã xảy ra lỗi khi lấy người dùng", error });
  }
});

// Endpoint cập nhật thông tin người dùng theo email
router.put("/updateUser", async (req, res) => {
  const { email, fullName, phoneNumber, password } = req.body; // Lấy dữ liệu từ client
  try {
    // Tìm người dùng qua email và cập nhật thông tin
    const updatedUser = await User.findOneAndUpdate(
      { email: email }, // Điều kiện: tìm user có email khớp
      { fullName, phoneNumber, password }, // Thông tin cần cập nhật
      { new: true } // Trả về dữ liệu sau khi cập nhật
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User updated successfully", updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error });
  }
});

module.exports = router;
