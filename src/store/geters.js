const getters = {
  token: state => state.user.token,
  wechat: state => state.user.wechat,
  id: state => state.user.id,
  name: state => state.user.name,
  qq: state => state.user.qq,
  wealth: state => state.user.wealth,
  role: state => state.user.role,
  express: state => state.express.express
  // user: state => state.user
}
export default getters
