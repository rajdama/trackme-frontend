const male = ['https://img.freepik.com/premium-photo/3d-render-cute-nathan_899449-107.jpg?size=626&ext=jpg&ga=GA1.1.143797289.1685691440&semt=ais',
              'https://img.freepik.com/free-photo/fashion-boy-with-yellow-jacket-blue-pants_71767-96.jpg?size=626&ext=jpg&ga=GA1.2.143797289.1685691440&semt=ais',
              'https://img.freepik.com/free-photo/fashion-little-boy_71767-95.jpg?size=626&ext=jpg&ga=GA1.2.143797289.1685691440&semt=ais'];
const female = ['https://img.freepik.com/free-photo/cartoon-character-with-fashion-bag_71767-98.jpg?size=626&ext=jpg&ga=GA1.2.143797289.1685691440&semt=ais',
                'https://img.freepik.com/premium-photo/3d-render-cute-bella_899449-12.jpg?size=626&ext=jpg&ga=GA1.2.143797289.1685691440&semt=ais',
                'https://img.freepik.com/premium-photo/adorable-cute-kid-girls-with-school-background-3d-illustration_784625-438.jpg?size=626&ext=jpg&ga=GA1.2.143797289.1685691440&semt=ais'];

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}
export {male,female,getRandomInt};