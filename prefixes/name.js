module.exports = function(method){
  return [`%c[${this.name}]`, `font-weight: bold; color: ${{error: "red", info: "blue", warn: "#232323"}[method] || this.color}; margin-left:${method === "error" ? 0 : 11}px; margin-right:11px`]
}
