module.exports = function(method){
  let index = -1;
  const first = [];
  const second = [`margin-left:${method === "error" ? 0 : 11}px`].concat(this.name.split("").map((letter, realIndex) => {
    if (letter !== " ") {
      index++;
      first[realIndex] = `%c${letter}`
      return `color:hsl(${(index / this.name.length) * 360},50%,50%)`
    }
    return letter
  }), "margin-right:11px")

  return ["%c[" + first.join("") + "%c]", second]
}
