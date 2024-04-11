#!/bin/bash

# Tạo chuỗi byte ngẫu nhiên sử dụng Node.js crypto
generate_random_string() {
    node -e "console.log(require('crypto').randomBytes($1).toString('hex'))"
}

# Lấy giá trị hiện tại của các biến từ tệp .env
current_JWT_TOKEN_SECRET=$(grep -E "^JWT_TOKEN_SECRET=" .env | cut -d '=' -f2)

# Cập nhật giá trị của các biến nếu chúng trống
JWT_TOKEN_SECRET=${current_JWT_TOKEN_SECRET:-$(generate_random_string 32)}

# Ghi lại các biến đã được cập nhật vào .env mà không tạo ra tệp .env.bak
sed -i -E "s/^JWT_TOKEN_SECRET=.*/JWT_TOKEN_SECRET=$JWT_TOKEN_SECRET/" .env

echo "Successfully updated JWT access token secret in .env file."
