import bcrypt from 'bcryptjs'
const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456'),
    phoneNumber: '049141670',
    isAdmin: true,
  },
  {
    name: 'Rakesh',
    email: 'user1@example.com',
    phoneNumber: '049123123',
    password: bcrypt.hashSync('123456'),
    isAdmin: false,
  },
  {
    name: 'Ramesh',
    email: 'user2@example.com',
    phoneNumber: '044123123',
    password: bcrypt.hashSync('123456'),
    isAdmin: false,
  },
  {
    name: 'uday kumar',
    email: 'udaykumar92937@gmail.com',
    phoneNumber: '6305969946',
    password: bcrypt.hashSync('123456'),
    isAdmin: true,
  },
]

export default users
