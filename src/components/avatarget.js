const male = [
  'https://img.freepik.com/premium-photo/3d-render-cute-nathan_899449-107.jpg?size=626&ext=jpg&ga=GA1.1.143797289.1685691440&semt=ais',
]
const female = [
  'https://img.freepik.com/free-photo/cartoon-character-with-fashion-bag_71767-98.jpg?size=626&ext=jpg&ga=GA1.2.143797289.1685691440&semt=ais',
]

function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min) + min) // The maximum is exclusive and the minimum is inclusive
}
export { male, female, getRandomInt }
