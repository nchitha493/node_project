const name ='chitha'

const userAge = 27

const user = {
    name,
    age:userAge,
    location:'nagercoil'
}

const product={
    label:'red notebook',
    price:3,
    stock:201,
    salePrice:undefined,
    rating:4.5
}
// const {label:productLabel,stock,rating=5} = product
//console.log(rating);
const transaction = (type, {label,stock}) =>{
    console.log(type,label,stock);
}
transaction('order',product)

//Object destructuring

 