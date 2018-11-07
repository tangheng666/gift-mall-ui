const getters = {
  token: state => state.user.token,
  wechat: state => state.user.wechat,
  name: state => state.user.name,
  qq: state => state.user.qq,
  wealth: state => state.user.wealth,
  role: state => state.user.role
}
export default getters
